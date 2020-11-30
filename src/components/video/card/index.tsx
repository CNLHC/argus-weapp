import { Progress } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import ImgCoffe from '../../../../assets/coffee-machine_processing_en.gif'
import IndexBG from '../../../../assets/index_bg.svg'

interface IProps {
    status: 'processing' | 'done' | string
    pic?: string
    title: string
    onClick: () => void
}

export default function ArgusVideoCard(props: IProps) {
    if (props.status == 'processing') return <ArgusProcessingCard {...props} />
    else return <ArgusDoneCard {...props} />
}

function ArgusDoneCard(props: IProps) {
    const OnClick = () => {
        props.onClick && props.onClick()
    }
    return (
        <view className={`${styles.cardRoot} ${styles.doneCard}`} onClick={OnClick}>
            <view className={styles.bg} ><image src={props.pic}></image></view>
            <view className={styles.infoBar}>
                <view className={styles.textBox}>{props.title}</view>
            </view>
        </view>
    )
}

function ArgusProcessingCard(props: IProps) {
    const [fakeProg, setProg] = useState(50);

    useEffect(() => {
        const h = setInterval(() => setProg(e => {
            if (e < 97)
                return e + 1
            return e
        }
        ), 1000)

        return () => {
            clearInterval(h)
        }
    }, [])
    return (
        <view className={`${styles.cardRoot} ${styles.process}`}>
            <view className={styles.Tags}>解析中</view>
            <view className={styles.Header}>{props.title}</view>
            <view className={styles.Img}>
                <image src={ImgCoffe} />
            </view>
            <view className={styles.Progress}>
                <view className={styles.text}>剩馀{fakeProg}% • 预计{((100 - fakeProg) / 60).toFixed(1)}分钟 Copy</view>
                <Progress color={'#B0865B'} percent={fakeProg} />
            </view>
        </view>
    )
}
