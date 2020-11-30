import { Editor, ScrollView, Video } from '@tarojs/components'
import { createSelectorQuery, EditorContext, getCurrentInstance, hideLoading, redirectTo, showLoading, showToast } from '@tarojs/taro'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetNoteDetails, INoteDettail } from '../../libs/notes/detail'
import { useTypedSelector } from '../../reducers'
import { ActEditorCtxUpdate, ActSetState } from '../../reducers/global'
import sty from './index.module.scss'
import Authed from '../../components/Authed'
import { textEditor, textEditorAddTagP } from '../../libs/argus/spliceTxt'
import { save_notes } from '../../libs/notes'
import ArgusButton from '../../components/button'
import * as RxJS from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import errorMsg from '../../libs/error'

import * as Sentry from 'sentry-miniapp'
import Axios from 'axios'
import ArgusTag from '../../components/Tag'
export default function index() {

    const dispatch = useDispatch()
    const loading = useTypedSelector(e => e.GlobalReducers.loading)
    const [dataid, setDataID] = useState<any>(undefined)
    const notedetails = useTypedSelector(e => e.GlobalReducers.noteDetail)
    const editorCtx = useTypedSelector(e => e.GlobalReducers.editorCtx)
    const thisCancel = useTypedSelector(e => e.GlobalReducers.cancelToken)
    const [$subject, _] = useState(new RxJS.Subject<string>())

    const getNoteDetail = (id: string) => {
        if (!id) return
        dispatch(ActSetState({ loading: true, noteDetail: undefined }))
        GetNoteDetails({ notesid: id, cToken: thisCancel?.token })
            .then(e => {
                let imgTxt = e?.data?.data?.imgTxt;
                if (!imgTxt) {
                    const newData = textEditorAddTagP(e?.data.data)
                    imgTxt = newData.textArr.map(e => ({ onebest: e }))
                }
                dispatch(ActSetState({
                    noteDetail: {
                        ...e.data,
                        data: {
                            ...e.data.data,
                            imgTxt: imgTxt
                        }
                    }, loading: false
                }))
            })
            .catch((e: Error) => {
                if (e.stack) {
                    hideLoading()
                    showToast({
                        title: "网络错误",
                        icon: "loading",
                        complete() {
                            setTimeout(() => { redirectTo({ url: '/pages/mynotes/index' }) }, 2500)
                        }
                    })
                    console.error(errorMsg.UNABLE_RETRIEVE_DETAIL, e)
                }
            })
    }

    const editorRef = useCallback((e: string, idx: number) => {
        createSelectorQuery()
            .select(`#editor${idx}`)
            .context((res) => {
                const ctx = res.context as EditorContext
                dispatch(ActEditorCtxUpdate(idx, ctx))
                if (e)
                    ctx.setContents({ html: e })
            })
            .exec()
    }, [])

    const getAllContents = async () => {
        let res: string[] = []
        const getCtxString = async (c: EditorContext) => {
            return new Promise<string>((resolve) => {
                return c.getContents({
                    success: (res: any) => {
                        resolve(res?.html)
                    }
                })
            })
        }
        for (const ctx of editorCtx) {
            const st = await getCtxString(ctx)
            res.push(st)
        }

        return res
    }

    const onsave = async (nd?: INoteDettail) => {
        const res = await getAllContents()
        console.log(123, res)
        const data = {
            ...nd?.data,
            imgTxt: nd?.data.imgTxt?.map((e, idx) => ({
                onebest: res[idx]
            }))
        }
        try {
            if (!nd) throw Error('no nodedetail')
            save_notes({ data, fid: nd.id })
        } catch (e) {
            console.error(errorMsg.UNABLE_SAVE_NOTES)
            Sentry.configureScope(s => {
                s.setExtra("noteid", notedetails?.id)
                s.setExtra("error", e)
                Sentry.captureMessage(errorMsg.UNABLE_SAVE_NOTES)
            })
            showToast({ title: errorMsg.UNABLE_SAVE_NOTES, icon: 'none' })
        }
    }

    const onEditorReady = (rt: string, idx: number) => editorRef(rt, idx)
    const onInput = (e) => $subject.next(e)

    useEffect(() => {
        const id = getCurrentInstance()?.router?.params.id
        if (!id) {
            showToast({
                title: "笔记不存在",
                complete: () => redirectTo({ url: `/pages/mynote/index` })
            })
            return
        }
        const cToken = Axios.CancelToken.source()
        dispatch(ActSetState({ cancelToken: cToken }))
        setDataID(id)
        return () => {
            cToken?.cancel()
            dispatch(ActSetState({ noteDetail: undefined, loading: false }))
        }
    }, [])

    useEffect(() => {
        if (notedetails) {
            const rxjsHandle = $subject.pipe(debounceTime(3000)).subscribe(() => onsave(notedetails))
            return () => {
                console.log('uns')
                rxjsHandle.unsubscribe()
            }
        }
    }, [notedetails, editorCtx])

    useEffect(() => {
        if (loading) {
            showLoading()
        }
        else
            hideLoading()
        return () => hideLoading()
    }, [loading])

    useEffect(() => {
        getNoteDetail(dataid)
    }, [dataid])






    const videoUrl = notedetails?.data.beforvideoUrl

    return (
        <Authed>
            <view className={sty.root}>
                <view className={sty.video}>
                    {videoUrl ? <Video src={videoUrl} style={{ height: "100%", width: "100%" }} ></Video> : null}
                </view>

                <ScrollView
                    scrollY
                    scrollTop={100}
                    className={sty.text}>
                    {
                        notedetails?.data?.imgTxt?.map((e, idx) => (
                            <view className={sty.block}>
                                <ArgusTag txt={`第${idx}帧`} />
                                <Editor
                                    onInput={onInput}
                                    id={`editor${idx}`}
                                    className={sty.editor}
                                    onReady={() => onEditorReady(e?.onebest, idx)}
                                ></Editor>
                            </view>
                        )
                        )
                    }
                </ScrollView>
            </view>
        </Authed>
    )
}
