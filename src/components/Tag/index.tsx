import { getOwnPropertyDescriptors } from 'immer/dist/internal'
import React from 'react'
import sty from './index.module.scss'

export interface IProps {
    txt: string

}

export default function ArgusTag(props: IProps) {
    return (
        <view className={sty.Tags}>{props.txt}</view>
    )
}
