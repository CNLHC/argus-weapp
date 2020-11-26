import { showModal, showToast } from '@tarojs/taro'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {ArgusEditPhone, getCode} from '../../libs/login'
import { useTypedSelector } from '../../reducers'
import { ActUpdateCodeCounter } from '../../reducers/global'
import ArgusButton from '../button'

import ArgusInput from '../Input'
import Modal from '../modal'
import ArgusSelector from '../selector'
import sty from './index.module.scss'

interface IProps {
    show: boolean
    onEditSuccess:Function
    onClose?: () => void
}

export default function EditPhone(props: IProps) {
    const { show, onEditSuccess ,onClose } = props

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
          showModal({ title: "验证信息错误" });
            return
        }
      const flat = ArgusEditPhone(payload);

      if (flat){
          onEditSuccess(payload.mobile);
          if (!!onClose){
            onClose();
          }
        }
    }

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
                        value={payload.mobile}
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
          <ArgusButton text={'取消'} theme={'light'} onClick={onClose} style={{ marginTop: '64rpx' }}  />
            <ArgusButton text={'修改'} style={{ marginTop: '64rpx' }} onClick={onClickLogin} />
        </view>
    )



    return (
        <Modal
            contentStyle={{
                paddingBottom: '36rpx',
            }}
            title={
              '输入新手机号码并验证'
            }
            visible={show}
            content={Step1}
        />
    )
}
