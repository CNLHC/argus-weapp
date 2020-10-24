import React, { Children } from 'react'
import Dot from '../../../assets/ellipse_dot.svg'
import IconBean from '../../../assets/bean_icon.svg'
import './index.scss'

export default function UploadLayout(props: {
    children: React.ReactChild | React.ReactChild[] | React.ReactChildren
}) {
    const { children } = props
    return (
        <view className="upload-layout">
            <image src={Dot} className={'bg1'} />
            <image src={Dot} className={'bg2'} />
            <view className="content">
                <view className="top">
                    <view className="badget">
                        <image src={IconBean} />
                        x150
                    </view>
                </view>
                {children}
            </view>
        </view>
    )
}
