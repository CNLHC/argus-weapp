import { navigateTo, redirectTo } from '@tarojs/taro'
import React from 'react'
import { useDispatch } from 'react-redux'
import ArgusIcon from '../../components/icon'
import MainLayout from '../../components/main-layout'
import { useTypedSelector } from '../../reducers'
import { ActSetState } from '../../reducers/global'
import sty from './index.module.scss'

const MenuItem = (props) => (
    <view className={sty.menuItem} onClick={props.onClick}>
        <view className={sty.menuIcon}>{props.icon}</view>
        <view className={sty.menuTitle}>{props.title}</view>
    </view>
)

const IconStyles = { width: '48rpx', height: '48rpx' }
const MenuData = [
    {
        icon: <ArgusIcon icon={'account'} style={IconStyles} />,
        title: '账户管理',
        url: '/pages/mine_manage/index',
    },
    {
        icon: <ArgusIcon icon={'smilepop'} style={IconStyles} />,
        title: '意见反馈',
        url: '/pages/mine_feedback/index',
    },
    {
        icon: <ArgusIcon icon={'share'} style={IconStyles} />,
        title: '分享好友',
        url: '/pages/mine_manage/index',
    },
]

export default function Mine() {
    const Userinfo = useTypedSelector(e => e.GlobalReducers.UserInfo)
    const dispatch = useDispatch()
    return (
        <MainLayout title={'我的账户'} selected={'mine'}>
            <view className={sty.banner}>
                <view
                    className={sty.Avatar}
                    onClick={() =>
                        dispatch(ActSetState({ showLoginModal: true }))
                    }
                ></view>
                <view className={sty.Textarea}>{
                    Userinfo ? Userinfo?.name ?? "陌生人" : "未登录"
                }</view>
            </view>
            <view className={sty.menu}>
                {MenuData.map((e) => (
                    <MenuItem
                        key={e.title}
                        title={e.title}
                        icon={e.icon}
                        onClick={() => navigateTo({ url: e.url })}
                    />
                ))}
            </view>
        </MainLayout>
    )
}
