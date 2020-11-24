import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ArgusIcon from '../../components/icon'
import ArgusNavBar from '../../components/navbar'
import { useTypedSelector } from '../../reducers'
import { ActSetState } from '../../reducers/global'
import sty from './index.module.scss'
import IndexBg from '../../../assets/index_bg.svg'
// import { redirectTo } from '@tarojs/taro'
import { navigateTo } from '@tarojs/taro'
import { GetUserInfo } from '../../libs/login'
import { GetNotes } from '../../libs/notes'
import LoginModal from '../../components/login'

export default function PageHome() {
    const user = useTypedSelector((e) => e.GlobalReducers.UserInfo)
    const showLogin = useTypedSelector((e) => e.GlobalReducers.showLoginModal)
    const [sampleID, setSampleID] = useState<undefined | string>(undefined)
    const notes = useTypedSelector(e => e.GlobalReducers.notes)
    const dispatch = useDispatch()
    const onClickUpload = () => {
        navigateTo({ url: `/pages/upload/index` })
    }
    const onClickSample = () => {
        navigateTo({ url: `/pages/editor/index?id=${sampleID}` })
    }
    useEffect(() => {
        if (notes && notes.length > 0) {
            const t = notes.find(e => e.filename === "SAMPLE")
            if (t)
                setSampleID(t.id)
        }
    }, [notes])

    useEffect(() => {
        GetUserInfo()
            .then(e => {
                if (!e?.id) {
                    dispatch(ActSetState({ showLoginModal: true }))
                }
                dispatch(ActSetState({ UserInfo: e }))
                GetNotes({ userid: e?.id ?? "" })
                    .then(e => {
                        dispatch(ActSetState({ notes: e.data, loading: false }))
                    })
            })
    }, [])

    return (
        <view className={sty.root}>
            <LoginModal
                show={showLogin}
                onLoginSuccess={(info) => dispatch(ActSetState({ UserInfo: info, showLoginModal: false }))}
                onClose={() =>
                    dispatch(
                        ActSetState({
                            showLoginModal: false,
                        })
                    )
                }
            />
            <view className={sty.Header}>
                <image src={IndexBg} className={sty.bg} />
                <view className={sty.slogan}>
                    <view>十行笔记的故事</view>
                    <view>从此刻开始述说</view>
                </view>
            </view>
            <view className={sty.Container}>
                <view
                    className={`${sty.Card} ${sty.Shader}`}
                    onClick={onClickUpload}
                >
                    <view className={sty.content}>
                        <ArgusIcon
                            icon={'add'}
                            style={{ width: '98rpx', height: '98rpx' }}
                        />
                        <view className={sty.textarea}>
                            <view className={sty.big}>上传视频</view>
                            <view className={sty.small}>定制你的笔记</view>
                        </view>
                    </view>
                </view>
                {
                    sampleID ?
                        <view className={`${sty.Card} ${sty.Colored}`} onClick={onClickSample}>
                            <view className={sty.line1}>
                                <ArgusIcon
                                    icon={'notepad'}
                                    style={{ width: '48rpx', height: '48rpx' }}

                                />
                        示例笔记
                    </view>
                            <view className={sty.line2}>一分钟，了解十行笔记</view>
                        </view> : null

                }
            </view>
            <ArgusNavBar selected={'home'} />
        </view>
    )
}
