import { Picker } from '@tarojs/components'
import React, { useState } from 'react'
import arrow from './arrow.svg'
import './index.scss'

interface IProps {
    items: string[]
    placeHolder?: string
    style?: React.CSSProperties
    value?: string
    onChange?: (value: string) => void
}

export default function ArgusSelector(props: IProps) {
    const { style, value, items, onChange } = props
    const [selectedItem, setSelectedItem] = useState<string | undefined>(
        value ?? undefined
    )
    const placeHolder = props.placeHolder ?? '+86'
    return (
        <view style={style} className={'selector'}>
            <Picker
                mode="selector"
                range={items}
                onChange={(e) => {
                    const itemName = items[e.detail.value]
                    setSelectedItem(itemName)
                    onChange && onChange(itemName)
                }}
            >
                <view
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <view>
                        {value
                            ? value
                            : selectedItem
                                ? selectedItem
                                : placeHolder}
                    </view>
                    <view>
                        <image src={arrow} />
                    </view>
                </view>
            </Picker>
        </view>
    )
}
