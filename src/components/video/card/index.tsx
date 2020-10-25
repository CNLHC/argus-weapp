import { Progress } from '@tarojs/components'
import React from 'react'
import styles from './index.module.scss'
import ImgCoffe from '../../../../assets/coffe_machine.svg'

interface IProps {
    status: 'processing' | 'done' | string
    title: string
}

export default function ArgusVideoCard(props: IProps) {
    if (props.status == 'processing') return <ArgusProcessingCard {...props} />
    else return <view className={styles.cardRoot}></view>
}

function ArgusProcessingCard(props: IProps) {
    return (
        <view className={`${styles.cardRoot} ${styles.process}`}>
            <view className={styles.Tags}>解析中</view>
            <view className={styles.Header}>{props.title}</view>
            <view className={styles.Img}>
                <image src={ImgCoffe} />
            </view>
            <view className={styles.Progress}>
                <view className={styles.text}>剩馀31% • 预计12分钟 Copy</view>
                <Progress color={'#B0865B'} percent={31} />
            </view>
        </view>
    )
}
