import React from 'react'
import { useDispatch } from 'react-redux'
import ArgusIcon from '../../components/icon'
import LoginModal from '../../components/login'
import MainLayout from '../../components/main-layout'
import { useTypedSelector } from '../../reducers'
import { ActSetState } from '../../reducers/global'
import sty from './index.module.scss'

const MenuItem = (props) => (
    <view className={sty.menuItem}>
        <view className={sty.menuIcon}>{props.icon}</view>
        <view className={sty.menuTitle}>{props.title}</view>
    </view>
)

const IconStyles = { width: '48rpx', height: '48rpx' }
const MenuData = [
    {
        icon: <ArgusIcon icon={'account'} style={IconStyles} />,
        title: '账户管理',
    },
    {
        icon: <ArgusIcon icon={'smilepop'} style={IconStyles} />,
        title: '意见反馈',
    },
    {
        icon: <ArgusIcon icon={'share'} style={IconStyles} />,
        title: '分享好友',
    },
]

export default function Mine() {
    const showLoginModal = useTypedSelector(
        (e) => e.GlobalReducers.showLoginModal
    )
    const dispatch = useDispatch()
    return (
        <MainLayout title={'我的账户'}>
            <LoginModal
                show={showLoginModal}
                onClose={() => dispatch(ActSetState({ showLoginModal: false }))}
            />
            <view className={sty.banner}>
                <view
                    className={sty.Avatar}
                    onClick={() =>
                        dispatch(ActSetState({ showLoginModal: true }))
                    }
                ></view>
                <view className={sty.Textarea}>argus</view>
            </view>
            <view className={sty.menu}>
                {MenuData.map((e) => (
                    <MenuItem title={e.title} icon={e.icon} />
                ))}
            </view>
        </MainLayout>
    )
}
