import React, { useState } from 'react'
import { Button, Picker } from '@tarojs/components'
import Modal from '../../components/modal'
import ArgusSelector from '../../components/selector'
import ArgusButton from '../../components/button'
import './index.scss'

import IconBrownBean from '../../../assets/brown_bean_icon.svg'
import IconBean from '../../../assets/bean_icon.svg'
import IconLink from '../../../assets/link.svg'
import ImgCoffeMachine from '../../../assets/coffe_machine.svg'

import bg from '../../../assets/welcome_bg.svg'
import UploadLayout from '../../components/upload-layout'

export default function PageUpload() {
    const [welcomeModal, setWelcomeModalVisible] = useState(true)
    const ModalContent = () => (
        <view className={'welcom-modal'}>
            <view className={'image-area'}>
                <image src={bg} />
                <image
                    src={IconBean}
                    style={{
                        position: 'relative',
                        bottom: '200rpx',
                    }}
                />
            </view>
            <view className={'text-area'}>
                为帮助你更好地生成视频笔记，我们提供您Argus咖啡豆来兑换视频识别时长，1个咖啡豆可兑换1分钟。
            </view>
            <view className={'add-coins'}>
                <image src={IconBean} />
                <view> +150</view>
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
                <view className="title">
                    <view>上传视频生成AI笔记</view>
                </view>
                <view className="form">
                    <view className="form-item">
                        <view className="label">
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
                    <view className="form-item">
                        <ArgusButton
                            text={'选择文件'}
                            theme={'light'}
                            style={{ width: '332rpx', marginRight: '20rpx' }}
                        />
                        <ArgusButton
                            iconSrc={IconLink}
                            theme={'light'}
                            style={{ width: '72rpx', padding: '10rpx'}}
                        />
                    </view>
                </view>
                <view className="img">
                    <image src={ImgCoffeMachine} />
                </view>
            </UploadLayout>
        </view>
    )
}
