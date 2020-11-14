import React, { useState } from 'react'
import { Button, Picker } from '@tarojs/components'
import Modal from '../../components/modal'
import ArgusSelector from '../../components/selector'
import ArgusButton from '../../components/button'
import sty from './index.module.scss'

import IconBrownBean from '../../../assets/brown_bean_icon.svg'
import IconBean from '../../../assets/bean_icon.svg'
import IconLink from '../../../assets/link.svg'
import ImgCoffeMachine from '../../../assets/coffe_machine.svg'

import bg from '../../../assets/welcome_bg.svg'
import UploadLayout from '../../components/upload-layout'
import ArgusBeanIndicator from '../../components/bean-indicator'
import { uploadFile } from '@tarojs/taro'
import getOSSUploadToken from '../../libs/crypto/getWXToken'
import Constant from '../../libs/constant/constant'



function calculateObjectName(filename: string) {
    return new Date().getTime() + '&&${filename}';
}
interface ProgressRes {
    /** 上传进度百分比 */
    progress: number
    /** 预期需要上传的数据总长度，单位 Bytes */
    totalBytesExpectedToSend: number
    /** 已经上传的数据长度，单位 Bytes */
    totalBytesSent: number
}
function mUploadFile({ fp, onSuc, onFail, onProg }: {
    fp: string
    onSuc?: (res: any) => void
    onFail?: (err: any) => void
    onProg?: (res: ProgressRes) => void
}) {
    const ctx = getOSSUploadToken()
    const fn = fp
    const task = uploadFile({
        url: Constant.ali.host,
        filePath: fp,
        name: 'file',
        formData: {
            key: calculateObjectName(fn),
            policy: ctx.policy,
            OSSAccessKeyId: Constant.ali.accessid,
            success_action_status: '200', // 让服务端返回200,不然，默认会返回204
            signature: ctx.signature,
        },
        success: res => {
            console.log(res)
            onSuc && onSuc(res)
        },
        fail: err => {
            console.log("errl", err)
            onFail && onFail(err)
        }
    })
    task.onProgressUpdate((res) => {
        console.log("prog", res)
        onProg && onProg(res)
    })
}
export default function PageUpload() {
    const [welcomeModal, setWelcomeModalVisible] = useState(true)
    const ModalContent = () => (
        <view className={sty.welcomeModal}>
            <view className={sty.imageArea}>
                <image src={bg} />
                <image
                    src={IconBean}
                    style={{
                        position: 'relative',
                        bottom: '200rpx',
                    }}
                />
            </view>
            <view className={sty.textArea}>
                为帮助你更好地生成视频笔记，我们提供您Argus咖啡豆来兑换视频识别时长，1个咖啡豆可兑换1分钟。
            </view>
            <view className={sty.hbox}>
                <ArgusBeanIndicator />
            </view>
        </view>
    )

    return (
        <view>
            <Modal
                visible={welcomeModal}
                title={'欢迎来到十行笔记'}
                content={<ModalContent />}
                button={[
                    <ArgusButton
                        onClick={() => setWelcomeModalVisible(false)}
                        text={'开始使用'}
                        style={{ width: '240rpx' }}
                    />,
                ]}
            />
            <UploadLayout>
                <view className={sty.title}>
                    <view>上传视频生成AI笔记</view>
                </view>
                <view className={sty.form}>
                    <view className={sty.formItem}>
                        <view className={sty.label}>
                            <image src={IconBrownBean} />
                            语言:
                        </view>
                        <ArgusSelector
                            items={['中文', 'English']}
                            onChange={(e) => {
                                console.log(e)
                            }}
                        />
                    </view>
                    <view className={sty.formItem}>
                        <ArgusButton
                            text={'选择文件'}
                            theme={'light'}
                            style={{ width: '332rpx', marginRight: '20rpx' }}
                        />
                        <ArgusButton
                            iconSrc={IconLink}
                            theme={'light'}
                            style={{ width: '72rpx', padding: '10rpx' }}
                        />
                    </view>
                </view>
                <view className={sty.img}>
                    <image src={ImgCoffeMachine} />
                </view>
            </UploadLayout>
        </view>
    )
}
