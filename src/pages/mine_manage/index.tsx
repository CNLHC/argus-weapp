import React from 'react'
import ArgusBeanIndicator from '../../components/bean-indicator'
import ArgusIcon from '../../components/icon'
import ArgusInput from '../../components/Input'
import MainLayout from '../../components/main-layout'
import ArgusSelector from '../../components/selector'
import sty from './index.module.scss'

export default function index() {
    return (
        <MainLayout title={'账户管理'}>
            <view className={sty.avatar}>
                <view className={sty.Label}></view>
                <view className={sty.Component}></view>
            </view>
            <view className={sty.formField}>
                <view className={sty.Label}>
                    <ArgusIcon icon={'user'} />
                    用户名
                </view>
                <view className={sty.Component}>
                    <ArgusInput />
                </view>
            </view>
            <view className={sty.formField}>
                <view className={sty.Label}>
                    <ArgusIcon icon={'mail'} />
                    电子邮件
                </view>
                <view className={sty.Component}>
                    <ArgusInput />
                </view>
            </view>
            <view className={sty.formField}>
                <view className={sty.Label}>
                    <ArgusIcon icon={'global'} />
                    语言
                </view>
                <view className={sty.Component}>
                    <ArgusSelector items={['中文']} />
                </view>
            </view>
            <view className={sty.formField}>
                <view className={sty.Label}>
                    <ArgusIcon icon={'mobile'} />
                    手机号
                </view>
                <view className={sty.Component}>
                    <ArgusInput />
                </view>
            </view>
            <view className={sty.formField}>
                <view className={sty.Label}>
                    <ArgusIcon icon={'bean-line'} />
                    咖啡豆
                </view>
                <view className={sty.Component}>
                    <ArgusBeanIndicator />
                </view>
            </view>
            <view className={sty.control}></view>
        </MainLayout>
    )
}
