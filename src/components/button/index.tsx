import { Button } from '@tarojs/components'
import { ButtonProps } from '@tarojs/components/types/Button'
import React, { ComponentType } from 'react'
import styles from './index.module.scss'

interface IProps {
    text?: string
    iconSrc?: string
    theme?: 'default' | 'light'
    style?: React.CSSProperties
    onClick: () => void
}

export default function ArgusButton(props: Partial<ButtonProps> & IProps) {
    const { iconSrc, text, style } = props
    const theme = props.theme
    const calStyle = style ?? {}
    const iconButton = !!iconSrc && !text
    let iconAreaStyle: React.CSSProperties | undefined

    calStyle['border'] = '0'
    if (iconButton) {
        if (calStyle) calStyle['minWidth'] = '0'
        iconAreaStyle = {
            width: '100%',
            height: '100%',
        }
    }
    return (
        <Button
            onClick={props.onClick}
            style={calStyle}
            className={
                (theme === 'light'
                    ? styles['argus-button-light']
                    : styles['argus-button']) +
                ' ' +
                styles.ButtonBase
            }
        >
            <view className={styles.iconArea} style={iconAreaStyle}>
                {iconSrc ? <image src={iconSrc} /> : null}
            </view>
            <view className={styles.textArea}>{text ?? null}</view>
        </Button>
    )
}
