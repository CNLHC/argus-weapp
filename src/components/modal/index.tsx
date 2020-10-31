import { Button } from '@tarojs/components'
import React, { ReactChild } from 'react'
import IconClose from '../../../assets/icon_close.svg'
import sty from './index.module.scss'

interface IProps {
    visible?: boolean
    title?: string
    content: JSX.Element
    contentStyle?: React.CSSProperties
    button?: Array<JSX.Element>
    showClose?: boolean
    onClose?: () => void
}

export default function Modal(props: IProps) {
    const { title, content, button, visible, showClose, onClose } = props
    if (!visible) return null
    return (
        <view className={sty.compModal}>
            <view className={sty.mask} />
            <view className={sty.content} style={props.contentStyle}>
                {showClose ? (
                    <view className={sty.closeX} onClick={onClose}>
                        <image src={IconClose} />
                    </view>
                ) : null}
                {title ? <view className={sty.title}>{title}</view> : null}
                <view className={sty.body}>{content}</view>
                <view className={sty.control}>{button}</view>
            </view>
        </view>
    )
}
