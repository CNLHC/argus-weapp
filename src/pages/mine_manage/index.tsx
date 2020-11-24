import React from 'react'

import ArgusBeanIndicator from '../../components/bean-indicator'
import ArgusIcon from '../../components/icon'
import ArgusInput from '../../components/Input'
import MainLayout from '../../components/main-layout'
import ArgusSelector from '../../components/selector'
import sty from './index.module.scss'
import { Label, Radio, RadioGroup } from '@tarojs/components'
import ArgusButton from '../../components/button'
import { useTypedSelector } from '../../reducers'

import {isChecked} from '../../libs/argus/isChecked'


export default function index() {
  const user = useTypedSelector(e => e.GlobalReducers.UserInfo)

  const radioArrary = [{
    value:'0',
    checked:false,
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

  const checkedIndex:number = isChecked(user.sex);
  radioArrary[checkedIndex].checked = true;

  const items = ['简体','繁体','English'];

    return (
        <MainLayout  title={'账户管理'}>
            <view className={sty.avatar}>
                <view className={sty.Label}>
                  <ArgusIcon className={sty.iconImage} icon={'pro-file'} />
                  头像</view>
                <view className={sty.Component} >{
                  user.headimg?<image src={user.headimg} />:''
                }
                </view>
            </view>
            <view className={sty.form}>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon className={sty.iconImage}  icon={'user'} />
                        用户名
                    </view>
                    <view className={sty.Component}>
                        <ArgusInput value={user.name||''} placeholder={'请输入用户名'}/>
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon  className={sty.iconImage} icon={'mail'} />
                        电子邮件
                    </view>
                    <view className={sty.Component}>
                        <ArgusInput value={user.email||''} placeholder={'请输入电子邮箱'} />
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon className={sty.iconImage} icon={'globe'} />
                        语言
                    </view>
                    <view className={sty.Component}>
                        <ArgusSelector value={items[user.language||0]} placeHolder={'简体'}  items={items} />
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon className={sty.iconImage} icon={'mobile'} />
                        手机号
                    </view>
                    <view className={sty.Component}>
                        <ArgusInput  value={user.phone||''} placeholder={'请输入手机号'}/>
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
                        <ArgusBeanIndicator count={user.retime} />
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
            <view className={sty.control}>
              <ArgusButton
                text={'放弃修改'}
                theme={'light'}
                style={{ width: '240rpx' ,height:'88rpx',minWidth:'0'}}
              />
              <ArgusButton
                text={'保存修改'}
                style={{ width: '240rpx' ,height:'88rpx',minWidth:'0'}}
              />
            </view>
        </MainLayout>
    )
}
