import React from 'react'
import ArgusButton from '../../components/button'
import MainLayout from '../../components/main-layout'

import IconAdd from '../../../assets/icon_add.svg'
import ArgusVideoList from '../../components/video/list'
import { redirectTo } from '@tarojs/taro'

export default function PageMyNotes() {
    return (
        <MainLayout title={'我的笔记'} selected="mynotes">
            <ArgusButton
                theme="light"
                text={'上传视频'}
                iconSrc={IconAdd}
                style={{ width: '332rpx' }}
                onClick={() => redirectTo({ url: '/pages/upload/index' })}
            />
            <ArgusVideoList />
        </MainLayout>
    )
}
