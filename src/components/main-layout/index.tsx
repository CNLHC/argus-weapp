import React, { ReactChild, ReactChildren } from 'react'
import ArgusNavBar from '../navbar'
import styles from './index.module.scss'

interface IProps {
    title?: string
    children: ReactChild | ReactChild[] | ReactChildren
    selected?: string
    no_bg?: boolean
}

export default function MainLayout(props: IProps) {
    const { title, children, selected } = props
    return (
        <view
            className={`${styles.mainLayout} ${props.no_bg ? '' : styles.texture
                }`}
        >
            {title ? <view className={styles.title}>{title}</view> : null}
            <view className={styles.content}>{children}</view>
            <view className={styles.navBar}>
                <ArgusNavBar selected={selected} />
            </view>
        </view>
    )
}
