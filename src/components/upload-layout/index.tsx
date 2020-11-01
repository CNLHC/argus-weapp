import React, { Children } from 'react'
import Dot from '../../../assets/ellipse_dot.svg'
import IconBean from '../../../assets/bean_icon.svg'
import sty from './index.module.scss'
import ArgusBeanIndicator from '../bean-indicator'

export default function UploadLayout(props: {
    children: React.ReactChild | React.ReactChild[] | React.ReactChildren
}) {
    const { children } = props
    return (
        <view className={sty.uploadLayout}>
            <image src={Dot} className={sty.bg1} />
            <image src={Dot} className={sty.bg2} />
            <view className={sty.content}>
                <view className={sty.top}>
                    <view className={sty.badget}>
                        <ArgusBeanIndicator />
                    </view>
                </view>
                {children}
            </view>
        </view>
    )
}
