import { RichText, Video } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetNoteDetails } from '../../libs/notes/detail'
import { useTypedSelector } from '../../reducers'
import { ActSetState } from '../../reducers/global'
import sty from './index.module.scss'

const reparse = (text) => {
    // const ast = unified()
    //     .use(parse, { emitParseErrors: true })
    //     .process(text)
    // console.log(ast)

}
export default function index() {

    const dispatch = useDispatch()
    const [dataid, setDataID] = useState<any>(undefined)
    const [ts, setTs] = useState<string | undefined>(undefined)
    const notedetails = useTypedSelector(e => e.GlobalReducers.noteDetail)
    const getNoteDetail = (id) => {
        id && GetNoteDetails(id).then(e => {

            const testString = e?.data.data.imgTxt.reduce((acc, cur) => cur.onebest + acc, "") ?? []
            console.log(testString)
            setTs(testString)
            e.data.data.imgTxt.forEach(e => reparse(e.onebest))
            dispatch(ActSetState({ noteDetail: e.data }))
        })
    }

    useEffect(() => {
        const id = getCurrentInstance()?.router?.params.id
        console.log("get params id=", id)
        setDataID(id)
    }, [])

    useEffect(() => {
        getNoteDetail(dataid)
    }, [dataid])



    const videoUrl = notedetails?.data.beforvideoUrl

    return (
        <view className={sty.root}>
            <view className={sty.video}>
                {videoUrl ? <Video src={videoUrl} style={{ width: "100%" }} ></Video> : null}
            </view>

            <view className={sty.text}>
                {
                    notedetails?.data.imgTxt.map(e => (
                        <view className={sty.block}>
                            <RichText nodes={e.onebest} />
                        </view>)
                    )

                }
            </view>


        </view>
    )
}
