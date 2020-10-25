import React, { ReactChild, ReactChildren } from 'react'
import ArgusNavBar from '../navbar'
import styles from './index.module.scss'

interface IProps {
    title?: string
    children: ReactChild | ReactChild[] | ReactChildren
    selected?: string
}

export default function MainLayout(props: IProps) {
    const { title, children, selected } = props
    return (
        <view className={styles.mainLayout}>
            {title ? <view className={styles.title}>{title}</view> : null}

            <view className={styles.content}>{children}</view>
            <ArgusNavBar selected={selected} />
        </view>
    )
}
