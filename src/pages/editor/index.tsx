import { Editor, RichText, Video } from '@tarojs/components'
import { createSelectorQuery, EditorContext, getCurrentInstance, hideLoading, showLoading } from '@tarojs/taro'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetNoteDetails, INoteDettail } from '../../libs/notes/detail'
import { useTypedSelector } from '../../reducers'
import { ActSetState } from '../../reducers/global'
import sty from './index.module.scss'
import sampleData from '../../../assets/sample_sam.json'

const reparse = (text) => {
    // const ast = unified()
    //     .use(parse, { emitParseErrors: true })
    //     .process(text)
    // console.log(ast)

}
export default function index() {

    const dispatch = useDispatch()
    const loading = useTypedSelector(e => e.GlobalReducers.loading)
    const [dataid, setDataID] = useState<any>(undefined)
    const [ts, setTs] = useState<string | undefined>(undefined)
    // const notedetails = useTypedSelector(e => e.GlobalReducers.noteDetail)
    const notedetails: INoteDettail = sampleData
    const getNoteDetail = (id) => {

        dispatch(ActSetState({ loading: true, noteDetail: undefined }))
        id && GetNoteDetails(id).then(e => {
            const testString = e?.data.data.imgTxt.reduce((acc, cur) => cur.onebest + acc, "") ?? []
            console.log(testString)
            setTs(testString)
            e.data.data.imgTxt.forEach(e => reparse(e.onebest))
            dispatch(ActSetState({ noteDetail: e.data, loading: false }))
        })
    }
    const [editorCtx, setEditorCtx] = useState<EditorContext | undefined>(undefined)

    useEffect(() => {
        if (loading)
            showLoading()
        else
            hideLoading()
    }, [loading])

    const editorRef = useCallback(() => {
        createSelectorQuery().select("#editor").context((res) => {
            console.log(1234, res.context)
            setEditorCtx(res.context as EditorContext)
        }).exec()
    }, [])

    useEffect(() => {
        const id = getCurrentInstance()?.router?.params.id
        console.log("get params id=", id)
        setDataID(id)
    }, [])

    useEffect(() => {
        getNoteDetail(dataid)
    }, [dataid])
    useEffect(() => {
        editorCtx?.setContents({
            html: notedetails?.data.imgTxt.reduce((acc, cur) => cur.onebest + acc, "") ?? []
        })
    }, [editorCtx])

    const onEditorReady = () => { editorRef() }




    const videoUrl = notedetails?.data.beforvideoUrl

    return (
        <view className={sty.root}>
            <view className={sty.video}>
                {videoUrl ? <Video src={videoUrl} style={{ width: "100%" }} ></Video> : null}
            </view>

            <view className={sty.text}>

                <Editor
                    id='editor'
                    className='editor'
                    placeholder={'hi'}
                    onReady={onEditorReady}
                ></Editor>


                {/* {
                    notedetails?.data.imgTxt.map(e => (
                        <view className={sty.block}>
                            <Editor nodes={e.onebest} />
                        </view>
                    )
                    )

                } */}
            </view>


        </view>
    )
}
