import { Button } from '@tarojs/components'
import { ButtonProps } from '@tarojs/components/types/Button'
import React, { ComponentType } from 'react'
import styles from './index.module.scss'

interface IProps {
    text?: string
    iconSrc?: string | JSX.Element
    theme?: 'default' | 'light'
    style?: React.CSSProperties
    color?: string
    disabled?: boolean
    onClick?: () => void
}

export default function ArgusButton(props: Partial<ButtonProps> & IProps) {
    const { iconSrc, text, style, color } = props
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
    if (color) {
        calStyle['backgroundColor'] = color
    }
    return (
        <Button
            disabled={props.disabled}
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
                {iconSrc ? (
                    typeof iconSrc == 'string' ? (
                        <image src={iconSrc} />
                    ) : (
                            iconSrc
                        )
                ) : null}
            </view>
            <view className={styles.textArea}>{text ?? null}</view>
        </Button>
    )
}
