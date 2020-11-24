import React from 'react'
import IconBean from '../../../assets/bean_icon.svg'
import sty from './index.module.scss'
interface IProps {
    count?: number
}

export default function ArgusBeanIndicator(props: IProps) {
    const { count } = props
    return (
        <view className={sty.coins}>
            <image src={IconBean} />
            <view>x{count ?? 150}</view>
        </view>
    )
}
