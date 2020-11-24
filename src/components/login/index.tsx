/* eslint-disable react/jsx-no-undef */
import { Input } from '@tarojs/components'
import { login, showModal, showToast } from '@tarojs/taro'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ArgusLogin, getCode, IArgusUserInfo } from '../../libs/login'
import { useTypedSelector } from '../../reducers'
import { ActSetState, ActUpdateCodeCounter } from '../../reducers/global'
import ArgusButton from '../button'
import ArgusIcon from '../icon'
import ArgusInput from '../Input'
import Modal from '../modal'
import ArgusSelector from '../selector'
import sty from './index.module.scss'

interface IProps {
    show: boolean
    onLoginSuccess?: (user: IArgusUserInfo) => void
    onClose?: () => void
}

export default function LoginModal(props: IProps) {
    const { show, onClose } = props
    const [currentStep, setStep] = useState(0)
    const [payload, setPayload] = useState<any>({})
    // const [sendCounter, setSendCounter] = useState<{ value: number, handle?: NodeJS.Timeout }>({ value: 0 })
    const counter = useTypedSelector(e => e.GlobalReducers.codeCounter)
    const dispatch = useDispatch()

    const updateCounter = () => {
        if (counter.value > 0)
            dispatch(ActUpdateCodeCounter())
        else {
            if (counter.handle)
                clearInterval(counter.handle)
            dispatch(ActUpdateCodeCounter())
        }
    }

    const onClickSendCode = () => {
        console.log(payload)
        if (!payload.mobile) {
            showModal({ title: "输入手机号" })

            return
        }
        showToast({ title: "发送成功" })
        const handle = setInterval(() => updateCounter(), 1000)
        dispatch(ActUpdateCodeCounter(handle))
        getCode({ mobile: payload.mobile })

    }
    const onChangePhoneInput = mobile => setPayload(v => ({ ...v, mobile }))
    const onChangeCodeInput = code => setPayload(v => ({ ...v, code }))
    const onClickLogin = () => {
        if (!payload.code || !payload.mobile) {
            showToast({ title: "登陆信息错误" })
            return
        }
        ArgusLogin({ ...payload }, props.onLoginSuccess)
    }
    const Step0 = (
        <view className={sty.ButtonBox}>
            {/* <ArgusButton
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
            /> */}

            <ArgusButton
                style={{ marginTop: '40rpx;' }}
                text={'其他手机登陆'}
                onClick={() => setStep(1)}
            />
        </view>
    )
    const Step1 = (
        <view className={sty.loginForm}>
            <view className={sty.FormItem}>
                <view className={sty.Label}>手机号</view>
                <view className={sty.Component}>
                    <ArgusSelector
                        items={['+86', "+852"]}
                        style={{
                            flexBasis: '25%',
                            flexGrow: 1,
                            height: '88rpx',
                            marginRight: '12rpx',
                        }}
                    />
                    <ArgusInput
                        value={payload.phone}
                        onChange={onChangePhoneInput}
                        style={{ height: '88rpx' }}
                        placeholder={'请输入手机号码'}
                    />
                </view>
            </view>

            <view className={sty.FormItem}>
                <view className={sty.Label}>验证码</view>
                <view className={sty.Component}>
                    <ArgusInput
                        value={payload.code}
                        onChange={onChangeCodeInput}
                        style={{ height: '88rpx', marginRight: '12rpx' }}
                        placeholder={'短信验证码'}
                    />
                    <ArgusButton disabled={counter.value > 0} text={counter.value === 0 ? `发送验证码` : `已发送(${counter.value})`} onClick={onClickSendCode} />
                </view>
            </view>

            <ArgusButton text={'登陆'} style={{ marginTop: '64rpx' }} onClick={onClickLogin} />

            <view className={sty.footer}>
                登陆注册即表示同意用户协议和隐私条款
            </view>
        </view>
    )

    const steps = [Step0, Step1]

    return (
        <Modal
            contentStyle={{
                paddingBottom: '36rpx',
            }}
            showClose
            title={
                currentStep == 0
                    ? '欢迎登陆十行笔记'
                    : currentStep == 1
                        ? '登陆'
                        : undefined
            }
            visible={show}
            content={steps[currentStep]}
            onClose={onClose}
        />
    )
}
