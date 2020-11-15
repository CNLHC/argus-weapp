import React, { useEffect } from 'react'
import ArgusButton from '../../components/button'
import MainLayout from '../../components/main-layout'

import IconAdd from '../../../assets/icon_add.svg'
import ArgusVideoList from '../../components/video/list'
// import { redirectTo } from '@tarojs/taro'
import { navigateTo } from '@tarojs/taro'
import { GetNotes } from '../../libs/notes'
import { useTypedSelector } from '../../reducers'
import { useDispatch } from 'react-redux'
import { ActSetState } from '../../reducers/global'

export default function PageMyNotes() {
    const user = useTypedSelector(e => e.GlobalReducers.UserInfo)
    const dispatch = useDispatch()
    const getNotes = () => {
        GetNotes({ userid: user?.id ?? "" }).then(e => dispatch(ActSetState({ notes: e.data })))
    }
    useEffect(() => {
        getNotes()
    }, [])
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
