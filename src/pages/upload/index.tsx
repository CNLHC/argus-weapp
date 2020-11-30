import React, { useEffect, useState } from 'react'
import { Progress } from '@tarojs/components'
import Modal from '../../components/modal'
import ArgusSelector from '../../components/selector'
import ArgusButton from '../../components/button'
import sty from './index.module.scss'
import { chooseVideo, getStorageSync, redirectTo, setStorageSync, uploadFile } from '@tarojs/taro'
import * as Sentry from "sentry-miniapp";

import IconBrownBean from '../../../assets/brown_bean_icon.svg'
import IconBean from '../../../assets/bean_icon.svg'
import Moment from 'moment'
import 'moment/locale/zh-cn'

import ImgCoffeMachine from '../../../assets/coffe_machine.svg'
import ImgCoffeGif from '../../../assets/coffee-machine_processing_en.gif'
import bg from '../../../assets/welcome_bg.svg'
import UploadLayout from '../../components/upload-layout'
import ArgusBeanIndicator from '../../components/bean-indicator'
import getOSSUploadToken from '../../libs/crypto/getWXToken'
import Constant from '../../libs/constant/constant'
import { useTypedSelector } from '../../reducers'
import { useDispatch } from 'react-redux'
import { ActSetState } from '../../reducers/global'
import { video_process } from '../../libs/video'
import Authed from '../../components/Authed'

Moment.locale('zh-cn')


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
function mUploadFile({ fp, onSuc, onFail, onProg, preStart, uploadFilename }: {
    fp: string
    uploadFilename: string
    preStart?: () => void
    onSuc?: (res: any) => void
    onFail?: (err: any) => void
    onProg?: (res: ProgressRes) => void
}) {
    preStart && preStart()
    const ctx = getOSSUploadToken()
    const fn = fp

    try {
        const task = uploadFile({
            url: Constant.ali.host,
            filePath: fp,
            fileName: uploadFilename,
            name: 'file',
            formData: {
                key: uploadFilename,
                policy: ctx.policy,
                OSSAccessKeyId: Constant.ali.accessid,
                success_action_status: '200', // 让服务端返回200,不然，默认会返回204
                signature: ctx.signature,
            },
            success: res => {
                console.log("upload success", res)
                onSuc && onSuc(res)
            },
            fail: err => {
                console.log("upload err", err)
                onFail && onFail(err)
            }
        }).progress(
            (res) => {
                console.log("prog", res)
                onProg && onProg(res)
            }
        )
    } catch (e) {
        onFail && onFail(e)
    }
}
function fileType(filename: string) {
    if (filename.lastIndexOf('.') !== -1) {
        const index = filename.lastIndexOf('.');
        const fileNameLength = filename.length; // 取到文件名长度
        const fileFormat = filename.substring(index + 1, fileNameLength); // 截
        return fileFormat;
    } else {
        return 'avi';
    }
}

export default function PageUpload() {
    const [welcomeModal, setWelcomeModalVisible] = useState(false)
    const progress = useTypedSelector(e => e.GlobalReducers.uploadProgress)
    const user = useTypedSelector(e => e.GlobalReducers.UserInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        if (getStorageSync("isNew") !== "false") {
            setWelcomeModalVisible(true)
            setStorageSync("isNew", "false")
        } else {
            setWelcomeModalVisible(false)
        }
    }, [])

    const onSelectFile = () => {
        const timestamp = new Date().getTime()
        const getUploadName = ((fname: string) => (`${timestamp}${Math.floor(timestamp * Math.random())}.${fileType(fname)}`))
        chooseVideo({
            compressed: false,
            success(files) {
                const uploadFilename = getUploadName(files.tempFilePath)
                const filename = `wx视频笔记_${Moment().toISOString()}.${fileType(getUploadName(files.tempFilePath))}`
                mUploadFile({
                    uploadFilename,
                    fp: files.tempFilePath,
                    preStart: () => {
                        const cost = files.duration / 60;
                        dispatch(ActSetState({ uploadProgress: 0, decreasingCost: cost }))
                        if (user)
                            dispatch(ActSetState({ UserInfo: { ...user, retime: user?.retime ?? 150 - cost } }))
                    },
                    onProg: (prog) => dispatch(ActSetState({ uploadProgress: prog.progress - 1 })),
                    onFail: (e) => {
                        console.error(e)
                        Sentry.configureScope(s => {
                            s.setExtras({
                                errMsg: e.errMsg
                            })
                            Sentry.captureMessage('upload')
                        })
                        dispatch(ActSetState({ uploadProgress: undefined }))
                    },
                    onSuc: () => {
                        video_process({
                            filename,
                            uploadFilename,
                            user,
                        }).then(() => {
                            redirectTo({ url: '/pages/mynotes/index' })
                        })
                    }
                })
            },
            fail() {
                Sentry.configureScope(s => {
                    const msg = 'can not choose video'
                    console.error(msg)
                    Sentry.captureMessage(msg)

                })
            }

        })
    }
    const ModalContent = () => (
        <view className={sty.welcomModal}>
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
        <Authed>
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
                            placeHolder={"选择语言"}
                            items={['中文', 'English']}
                            onChange={(e) => {
                                console.log(e)
                            }}
                        />
                    </view>
                    <view className={sty.formItem}>
                        <ArgusButton
                            onClick={onSelectFile}
                            text={'选择文件'}
                            theme={'light'}
                            style={{ width: '332rpx', marginRight: '20rpx' }}
                        />
                    </view>
                </view>
                <view className={sty.img}>
                    <image src={progress ? ImgCoffeGif : ImgCoffeMachine} />
                </view>
                {progress ?
                    <view className={sty.progress}>
                        <Progress percent={progress} strokeWidth={2} showInfo activeColor='#B0865B' />
                    </view> : null
                }
            </UploadLayout>
        </Authed>
    )
}
