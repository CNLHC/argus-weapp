import { Button } from '@tarojs/components'
import React, { ReactChild } from 'react'
import './index.scss'

interface IProps {
    visible?: boolean
    title?: string
    content: JSX.Element
    button: Array<JSX.Element>
}

export default function Modal(props: IProps) {
    const { title, content, button, visible } = props
    if (!visible) return null
    return (
        <view className={'comp-modal'}>
            <view className={'mask'} />
            <view className={'content'}>
                {title ? <view className={'title'}>{title}</view> : null}
                <view className={'body'}>{content}</view>
                <view className={'control'}>{button}</view>
            </view>
        </view>
    )
}
