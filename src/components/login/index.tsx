/* eslint-disable react/jsx-no-undef */
import { Input } from '@tarojs/components'
import React, { useState } from 'react'
import ArgusButton from '../button'
import ArgusIcon from '../icon'
import Modal from '../modal'
import sty from './index.module.scss'

interface IProps {
    show: boolean
    onClose?: () => void
}

export default function LoginModal(props: IProps) {
    const { show, onClose } = props
    const [currentStep, setStep] = useState(0)

    const Step0 = (
        <view className={sty.ButtonBox}>
            <ArgusButton
                style={{ marginTop: '40rpx;' }}
                iconSrc={
                    <ArgusIcon
                        icon={'wx'}
                        style={{
                            width: '64rpx',
                            height: '64rpx',
                        }}
                    />
                }
                text={'微信手机登陆'}
                color={'#60BD38'}
            />

            <ArgusButton
                style={{ marginTop: '40rpx;' }}
                text={'其他手机登陆'}
                onClick={() => setStep(1)}
            />
        </view>
    )
    const Step1 = (
        <view className={sty.loginForm}>
            <view>
                <view>手机号</view>
                <view>
                    <Input placeholder={'请输入手机号码'} />
                </view>
            </view>

            <view>
                <view>验证码</view>
                <view>
                    <Input placeholder={'短信验证码'} />
                    <ArgusButton text={'发送验证码'} />
                </view>
            </view>
            <ArgusButton text={'登陆'} />

            <view className={sty.footer}>
                登陆注册即表示同意用户协议和隐私条款
            </view>
        </view>
    )

    const steps = [Step0, Step1]

    return (
        <Modal
            showClose
            visible={show}
            content={steps[currentStep]}
            onClose={onClose}
        />
    )
}