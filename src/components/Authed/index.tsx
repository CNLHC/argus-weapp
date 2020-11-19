import { redirectTo } from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useTypedSelector } from '../../reducers'

export default function Authed({ children }: {
    children: React.ReactNode

}) {
    const user = useTypedSelector(e => e.GlobalReducers.UserInfo)
    useEffect(() => {
        if (!user)
            redirectTo({ url: "/pages/home/index" })
    }, [user])

    return (
        <view>
            {children}
        </view>
    )
}
