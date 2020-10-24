import { Button } from '@tarojs/components'
import { ButtonProps } from '@tarojs/components/types/Button'
import React, { ComponentType } from 'react'
import './index.scss'

interface IProps {
    text?: string
    iconSrc?: string
    theme?: 'default' | 'light'
    style?: React.CSSProperties
    onClick: () => void
}

export default function ArgusButton(props: Partial<ButtonProps> & IProps) {
    const { iconSrc, text } = props
    const theme = props.theme

    return (
        <Button
            onClick={props.onClick}
            style={props.style}
            className={
                theme === 'light' ? 'argus-button-light' : 'argus-button'
            }
        >
            {iconSrc ? <image src={iconSrc} /> : null}
            <view>{props.text ?? null}</view>
        </Button>
    )
}
