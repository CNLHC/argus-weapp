import { Input } from '@tarojs/components'
import React from 'react'
import sty from './index.module.scss'

interface IProps {
    value?: string
    onChange?: (e: string) => void
    placeholder?: string
    style?: React.CSSProperties
    hide?: boolean
    disabled?: boolean
}

export default function ArgusInput(props: IProps) {
    const { onChange, style, placeholder, value, hide } = props
    let calStyle
    if (hide)
        calStyle = { ...style, display: 'none' }
    else
        calStyle = style
    return (

        <Input
            placeholder={placeholder}
            className={sty.input}
            style={calStyle}
            disabled={props.disabled}
            onInput={(e) => {
                onChange && onChange(e.detail.value)
            }}
            value={value || ''}
        ></Input>
    )
}
