import React from 'react'

import ArgusBeanIndicator from '../../components/bean-indicator'
import ArgusIcon from '../../components/icon'
import ArgusInput from '../../components/Input'
import MainLayout from '../../components/main-layout'
import ArgusSelector from '../../components/selector'
import sty from './index.module.scss'
import { Label, Radio, RadioGroup } from '@tarojs/components'
import ArgusButton from '../../components/button'



export default function index() {

  const radioArrary = [{
    value:'0',
    checked:true,
    text:'男',
  },{
    value:'1',
    checked:false,
    text:'女',
  },{
    value:'2',
    checked:false,
    text:'保密',
  }]

    return (
        <MainLayout title={'账户管理'}>
            <view className={sty.avatar}>
                <view className={sty.Label}>
                  <ArgusIcon className={sty.iconImage} icon={'pro-file'} />
                  头像</view>
                <view className={sty.Component}>
                  <ArgusIcon icon={'camera-group'} />
                </view>
            </view>
            <view className={sty.form}>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon className={sty.iconImage}  icon={'user'} />
                        用户名
                    </view>
                    <view className={sty.Component}>
                        <ArgusInput />
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon className={sty.iconImage} icon={'mail'} />
                        电子邮件
                    </view>
                    <view className={sty.Component}>
                        <ArgusInput />
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon className={sty.iconImage} icon={'globe'} />
                        语言
                    </view>
                    <view className={sty.Component}>
                        <ArgusSelector placeHolder={'简体'}  items={['简体','繁体','英文']} />
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon className={sty.iconImage} icon={'mobile'} />
                        手机号
                    </view>
                    <view className={sty.Component}>
                        <ArgusInput />
                    </view>
                </view>
              <view className={sty.formField}>
                <view className={sty.Label}>
                  <ArgusIcon className={sty.iconImage} icon={'gender'} />
                  性别
                </view>
                <RadioGroup className={sty.radioGroup}>
                  {radioArrary.map((item, i) => {
                    return (
                      <Label className='radio-list__label' for={i.toString()} key={i}>
                        <Radio color={'#B0865B'} className={sty.radio}  value={item.value} checked={item.checked}>{item.text}</Radio>
                      </Label>
                    )
                  })}
                </RadioGroup>
              </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon className={sty.iconImage} icon={'bean-line'} />
                        咖啡豆
                    </view>

                    <view className={sty.btns}>
                      <view className={sty.Component}>
                        <ArgusBeanIndicator />
                      </view>
                      <ArgusButton
                      text={'充值'}
                      theme={'light'}
                      style={{ width: '150rpx' ,height:'88rpx',minWidth:'0'}}
                    />
                      <ArgusButton
                        text={'了解更多'}
                        theme={'light'}
                        style={{ width: '196rpx' ,height:'88rpx',minWidth:'0'}}
                      /></view>
                </view>
            </view>
            <view className={sty.control}></view>
        </MainLayout>
    )
}
