import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ArgusIcon from '../../components/icon'
import LoginModal from '../../components/login'
import MainLayout from '../../components/main-layout'
import ArgusNavBar from '../../components/navbar'
import { useTypedSelector } from '../../reducers'
import { ActSetState } from '../../reducers/global'
import sty from './index.module.scss'
import IndexBg from '../../../assets/index_bg.svg'
// import { redirectTo } from '@tarojs/taro'
import { navigateTo } from '@tarojs/taro'
import { GetUserInfo } from '../../libs/login'

export default function PageHome() {
    const showLogin = useTypedSelector((e) => e.GlobalReducers.showLoginModal)
    const dispatch = useDispatch()
    const onClickUpload = () => {
        navigateTo({ url: `/pages/upload/index` })
    }
    useEffect(() => {
        GetUserInfo().then(e => {
            dispatch(ActSetState({ UserInfo: e }))
        })
    }, [])
    return (
        <view className={sty.root}>
            <LoginModal
                show={showLogin}
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
                <view className={`${sty.Card} ${sty.Colored}`}>
                    <view className={sty.line1}>
                        <ArgusIcon
                            icon={'notepad'}
                            style={{ width: '48rpx', height: '48rpx' }}
                        />
                        示例笔记
                    </view>
                    <view className={sty.line2}>一分钟，了解十行笔记</view>
                </view>
            </view>
            <ArgusNavBar selected={'home'} />
        </view>
    )
}
