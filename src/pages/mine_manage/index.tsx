import React, { useState } from 'react'

import { Input, Label, Radio, RadioGroup } from '@tarojs/components'
import { useTypedSelector } from '../../reducers'
import { navigateBack } from '@tarojs/taro'
import { ActSetState } from '../../reducers/global'
import { useDispatch } from 'react-redux'

import ArgusBeanIndicator from '../../components/bean-indicator'
import ArgusIcon from '../../components/icon'
import ArgusInput from '../../components/Input'
import MainLayout from '../../components/main-layout'
import ArgusSelector from '../../components/selector'
import ArgusButton from '../../components/button'
import LearnMore from '../../components/learn-more'



import sty from './index.module.scss'

import { isChecked, isLanuageSelect } from '../../libs/argus/isChecked'
import { saveManage } from '../../libs/manage'
import { IArgusUserInfoNoReTime } from '../../libs/login'
import Recharge from '../../components/recharge'
import EditPhone from "../../components/edit-phone";



export default function index() {
  const user = useTypedSelector(e => e.GlobalReducers.UserInfo)
  const [show, setShow] = useState(false);
  const [showRecharge, setshowRecharge] = useState(false);
  const [showEditPhone, setShowEditPhone] = useState(false);

  const dispatch = useDispatch()
  const { email, phone, sex, headimg, id, language, name } = { ...user };
  const newUser: IArgusUserInfoNoReTime = {
    email, phone, sex, headimg, id, language, name
  }

  const radioArrary = [{
    value: '0',
    checked: false,
    text: '男',
  }, {
    value: '1',
    checked: false,
    text: '女',
  }, {
    value: '2',
    checked: false,
    text: '保密',
  }]



  const items = ['简体', '繁体', 'English'];

  const btnStyle = { width: '240rpx', height: '88rpx', minWidth: '0' }

  const checkedIndex: number = isChecked(user.sex);
  radioArrary[checkedIndex].checked = true;

  async function save() {
    const flat = await saveManage(newUser);
    if (!!flat) {
      const newUserInfo: any = newUser;
      newUserInfo.retime = user.retime;
      dispatch(ActSetState({ UserInfo: newUserInfo }))
    }
  }

  function changeName(e) {
    newUser.name = e;
  }

  function changeEmail(e) {
    newUser.email = e;
  }

  function radioChange(e) {
    newUser.sex = radioArrary[Number(e.detail.value)].text
  }

  function languagechange(e) {
    const languageIndex = isLanuageSelect(e)
    newUser.language = languageIndex;
  }

  function handleFun(val: Boolean) {
    setShow(val)
  }

  function toggleShowRecharge(val: Boolean) {
    setshowRecharge(val)
  }

  function EditSuccess(val: string) {
    const newUserInfo: any = newUser;
    newUserInfo.phone = val;
    dispatch(ActSetState({ UserInfo: newUserInfo }))
  }

  const hideInput = show || showRecharge || showEditPhone

  return (
    <MainLayout title={'账户管理'}>
      <view className={sty.avatar}>
        <view className={sty.Component} >
          {
            user.headimg ? <image src={user.headimg} /> : ''
          }
        </view>
      </view>
      <view className={sty.form}>
        <view className={sty.formField}>
          <view className={sty.Label}>
            <ArgusIcon
              className={sty.iconImage} icon={'user'} />
                        用户名
                    </view>
          <view className={sty.Component}>
            <ArgusInput

              hide={hideInput}
              onChange={
                changeName
              } value={user.name || ''} placeholder={'请输入用户名'} />
          </view>
        </view>
        <view className={sty.formField}>
          <view className={sty.Label}>
            <ArgusIcon className={sty.iconImage} icon={'mail'} />
                        电子邮件
                    </view>
          <view className={sty.Component}>
            <ArgusInput
              hide={hideInput}
              onChange={changeEmail}
              value={user.email || ''} placeholder={'请输入电子邮箱'} />
          </view>
        </view>
        <view className={sty.formField}>
          <view className={sty.Label}>
            <ArgusIcon className={sty.iconImage} icon={'globe'} />
                        语言
                    </view>
          <view className={sty.Component}>
            <ArgusSelector onChange={languagechange} placeHolder={items[user.language || 0]} items={items} />
          </view>
        </view>
        <view className={sty.formField}>
          <view className={sty.Label}>
            <ArgusIcon
              className={sty.iconImage} icon={'mobile'} />
                        手机号
                    </view>
          <view className={sty.editPhone}>
            <view className={sty.phone}>
              <ArgusInput
                hide={hideInput}
                disabled={true}
                value={user.phone || ''}
              />
            </view>
            <ArgusButton className={sty.phoneBtn} text={'修改'}
              theme={'light'}
              style={{ width: '150rpx', height: '88rpx', minWidth: '0' }}
              onClick={() => {
                setShowEditPhone(true);
              }}
            />
          </view>
        </view>
        <view className={sty.formField}>
          <view className={sty.Label}>
            <ArgusIcon className={sty.iconImage} icon={'gender'} />
                  性别
                </view>
          <RadioGroup onChange={
            radioChange
          } className={sty.radioGroup}>
            {radioArrary.map((item, i) => {
              return (
                <Label className='radio-list__label' for={i.toString()} key={i}>
                  <Radio color={'#B0865B'} className={sty.radio} value={item.value} checked={item.checked}>{item.text}</Radio>
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
              onClick={() => {
                toggleShowRecharge(true);
              }}
              text={'充值'}
              theme={'light'}
              style={{ width: '150rpx', height: '88rpx', minWidth: '0' }}
            />
            <ArgusButton
              onClick={
                () => {
                  handleFun(true)
                }
              }
              text={'了解更多'}
              theme={'light'}
              style={{ width: '196rpx', height: '88rpx', minWidth: '0' }}
            /></view>
        </view>
      </view>
      <view className={sty.control}>
        <ArgusButton
          text={'放弃修改'}
          theme={'light'}
          onClick={() => {
            navigateBack();
          }}
          style={btnStyle}
        />
        <ArgusButton
          onClick={save}
          text={'保存修改'}
          style={btnStyle}
        />
      </view>
      <LearnMore show={show} handleFun={() => {
        handleFun(false);
      }} handleFun2={() => {
        handleFun(false);
        toggleShowRecharge(true);
      }} />
      <Recharge handleFun={() => {
        toggleShowRecharge(false);
      }} show={showRecharge} />
      <EditPhone onEditSuccess={(e) => {
        console.log(e);
        EditSuccess(e)
      }} onClose={() => {
        setShowEditPhone(false);
      }} show={showEditPhone} />
    </MainLayout>
  )
}
