import { Input } from '@tarojs/components'
import React from 'react'
import sty from './index.module.scss'

interface IProps {
    value?: string
    onChange?: (e: string) => void
    placeholder?: string
    style?: React.CSSProperties
}

export default function ArgusInput(props: IProps) {
    const { onChange, style, placeholder ,value} = props
    return (
        <Input
            placeholder={placeholder}
            className={sty.input}
            style={style}
            onInput={(e) => {
                onChange && onChange(e.detail.value)
            }}
            value={value||''}
        ></Input>
    )
}
