import { Editor, Video } from '@tarojs/components'
import { createSelectorQuery, EditorContext, getCurrentInstance, hideLoading, redirectTo, showLoading, showToast } from '@tarojs/taro'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetNoteDetails } from '../../libs/notes/detail'
import { useTypedSelector } from '../../reducers'
import { ActEditorCtxUpdate, ActSetState } from '../../reducers/global'
import sty from './index.module.scss'
import Authed from '../../components/Authed'
import { textEditor } from '../../libs/argus/spliceTxt'
import { save_notes } from '../../libs/notes'

export default function index() {

    const dispatch = useDispatch()
    const loading = useTypedSelector(e => e.GlobalReducers.loading)
    const [dataid, setDataID] = useState<any>(undefined)
    const [, setTs] = useState<string | undefined>(undefined)
    const notedetails = useTypedSelector(e => e.GlobalReducers.noteDetail)
    // const notedetails: INoteDettail = sampleData

    useEffect(() => {
        const id = getCurrentInstance()?.router?.params.id
        if (!id) {
            showToast({
                title: "笔记不存在",
                complete: () => redirectTo({ url: `/pages/mynote/index` })
            })
        }
        console.log("get params id=", id)
        setDataID(id)
        return () => {
            dispatch(ActSetState({ noteDetail: undefined, loading: false }))
        }
    }, [])

    const getNoteDetail = (id: string) => {
        dispatch(ActSetState({ loading: true, noteDetail: undefined }))
        GetNoteDetails(id).then(e => {
            const testString = e?.data.data.imgTxt.reduce((acc, cur) => cur.onebest + acc, "") ?? []
            console.log(testString)
            setTs(testString)
            // e.data.data.imgTxt.forEach(e => reparse(e.onebest))
            if (!e.data.data.imgTxt || e.data.data.imgTxt.length == 0) {
                const processed = textEditor(e.data)
                e.data.data.imgTxt = processed.textArr
            }
            dispatch(ActSetState({ noteDetail: e.data, loading: false }))
        })
    }
    // const [editorCtx, setEditorCtx] = useState<EditorContext[]>([])
    const editorCtx = useTypedSelector(e => e.GlobalReducers.editorCtx)

    useEffect(() => {
        if (loading) {
            showLoading()
        }
        else
            hideLoading()
        return () => hideLoading()
    }, [loading])

    const editorRef = useCallback((e: string, idx: number) => {
        createSelectorQuery()
            .select(`#editor${idx}`)
            .context((res) => {
                const ctx = res.context as EditorContext
                dispatch(ActEditorCtxUpdate(idx, ctx))
                ctx.setContents({ html: e })
            })
            .exec()
    }, [])


    useEffect(() => {
        getNoteDetail(dataid)
    }, [dataid])

    const getAllContents = async () => {
        console.log(1213, Object.entries(editorCtx))
        return Promise.all(
            Object.entries(editorCtx)
                .map(([k]) => new Promise((resolve) => {
                    console.log(82, editorCtx[parseInt(k)])
                    editorCtx[parseInt(k)]?.getContents({
                        success: (res: any) => {
                            console.log(res)
                            resolve(res?.html)
                        }
                    })
                }))
        )
    }

    const onsave = async () => {
        getAllContents().then(e => console.log(e))
        if (!notedetails || !notedetails?.data) return
        const res = await getAllContents()
        const data = {
            ...notedetails.data,
            imgTxt: notedetails.data.imgTxt?.map((e, idx) => ({
                ...e,
                onebest: res[idx]
            }))
        }
        save_notes({ data, fid: notedetails.id })
    }

    useEffect(() => {
        onsave()
        const h = setInterval(() => {
            console.log("save")
            onsave()
        }, 5000)
        return () => {
            clearInterval(h)
        }
    }, [])

    const onEditorReady = (rt: string, idx: number) => {
        editorRef(rt, idx)
    }




    const videoUrl = notedetails?.data.beforvideoUrl

    return (
        <Authed>
            <view className={sty.root}>
                <view className={sty.video}>
                    {videoUrl ? <Video src={videoUrl} style={{ width: "100%" }} ></Video> : null}
                </view>

                <view className={sty.text}>



                    {
                        notedetails?.data.imgTxt.map((e, idx) => (
                            <view className={sty.block}>
                                <Editor

                                    id={`editor${idx}`}
                                    className='editor'
                                    // placeholder={'hi'}
                                    onReady={() => onEditorReady(e.onebest, idx)}
                                ></Editor>
                            </view>
                        )
                        )
                    }
                </view>


            </view>
        </Authed>
    )
}
