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

export default function PageMyNotes() {
    const user = useTypedSelector(e => e.GlobalReducers.UserInfo)
    const loading = useTypedSelector(e => e.GlobalReducers.loading)
    const notes = useTypedSelector(e => e.GlobalReducers.notes)
    const dispatch = useDispatch()

    const getNotes = () => {
        if (!notes || notes.length == 0)
            dispatch(ActSetState({ loading: true }))
        GetNotes({ userid: user?.id ?? "" }).then(e => {
            return dispatch(ActSetState({ notes: e.data, loading: false }))
        })
    }

    useEffect(() => {
        if (loading)
            showLoading()
        else
            hideLoading()
    }, [loading])


    useEffect(() => {
        if (user)
            getNotes()
    }, [user])
    return (
        <MainLayout title={'我的笔记'} selected="mynotes">
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
