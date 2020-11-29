import React, { Children } from 'react'
import Dot from '../../../assets/ellipse_dot.svg'
import IconBean from '../../../assets/bean_icon.svg'
import sty from './index.module.scss'
import ArgusBeanIndicator from '../bean-indicator'
import { useTypedSelector } from '../../reducers'

export default function UploadLayout(props: {
    children: React.ReactNode
}) {
    const { children } = props
    const user = useTypedSelector(e => e.GlobalReducers.UserInfo)
    const cost = useTypedSelector(e => e.GlobalReducers.decreasingCost)

    return (
        <view className={sty.uploadLayout}>
            <image src={Dot} className={sty.bg1} />
            <image src={Dot} className={sty.bg2} />
            <view className={sty.content}>
                <view className={sty.top}>
                    <view className={sty.badget}>
                        <ArgusBeanIndicator count={user?.retime} />
                        {cost ? null : null}
                    </view>
                </view>
                {children}
            </view>
        </view>
    )
}
