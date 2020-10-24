import { Picker } from '@tarojs/components'
import React, { useState } from 'react'
import arrow from './arrow.svg'
import './index.scss'

interface IProps {
    items: string[]
    placeHolder?: string
    style?: React.CSSProperties
    value?: string
    onChange: (value: string) => void
}

export default function ArgusSelector(props: IProps) {
    const { style, value, items, onChange } = props
    const [selectedItem, setSelectedItem] = useState<string | undefined>(
        value ?? undefined
    )
    const placeHolder = props.placeHolder ?? '请选择'
    return (
        <Picker
            mode="selector"
            range={items}
            onChange={(e) => {
                const itemName = items[e.detail.value]
                setSelectedItem(itemName)
                onChange(itemName)
            }}
        >
            <view style={style} className={'selector'}>
                {value ? value : selectedItem ? selectedItem : placeHolder}
                <image src={arrow}></image>
            </view>
        </Picker>
    )
}
