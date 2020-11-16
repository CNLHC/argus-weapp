import React, { useEffect } from 'react'
import ArgusButton from '../../components/button'
import MainLayout from '../../components/main-layout'

import IconAdd from '../../../assets/icon_add.svg'
import ArgusVideoList from '../../components/video/list'
// import { redirectTo } from '@tarojs/taro'
import { hideLoading, navigateTo, showLoading } from '@tarojs/taro'
import { GetNotes } from '../../libs/notes'
import { useTypedSelector } from '../../reducers'
import { useDispatch } from 'react-redux'
import { ActSetState } from '../../reducers/global'
import LoginModal from '../../components/login'

export default function PageMyNotes() {
    const user = useTypedSelector(e => e.GlobalReducers.UserInfo)
    const loading = useTypedSelector(e => e.GlobalReducers.loading)
    const notes = useTypedSelector(e => e.GlobalReducers.notes)
    const dispatch = useDispatch()
    const getNotes = () => {
        dispatch(ActSetState({ loading: true }))
        if (!notes || notes.length == 0) showLoading()
        GetNotes({ userid: user?.id ?? "" }).then(e => {
            hideLoading()
            return dispatch(ActSetState({ notes: e.data, loading: false }))
        })
    }
    useEffect(() => {
        if (!user)
            dispatch(ActSetState({ showLoginModal: true }))
    }, [])
    useEffect(() => {
        if (user)
            getNotes()
    }, [user])
    const showLogin = useTypedSelector((e) => e.GlobalReducers.showLoginModal)
    return (
        <MainLayout title={'我的笔记'} selected="mynotes">
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
            <ArgusButton
                theme="light"
                text={'上传视频'}
                iconSrc={IconAdd}
                style={{ width: '332rpx' }}
                onClick={() => navigateTo({ url: '/pages/upload/index' })}
            />
            <ArgusVideoList />
        </MainLayout>
    )
}
