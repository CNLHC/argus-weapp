
import React, { useState } from 'react'
import MainLayout from '../../components/main-layout'

import sty from './index.module.scss'

import { Radio,RadioGroup ,Label,Textarea,Image,Input} from '@tarojs/components'
import { navigateBack } from '@tarojs/taro'
import ArgusButton from '../../components/button'

import inputImage from '../../../assets/feedback_input_file.svg'




export default function index() {
  const [textLength,setTextLength] = useState(0);
  const radioArrary = [{
    value:'0',
    checked:true,
    text:'产品建议',
  },{
    value:'1',
    checked:false,
    text:'程序报错',
  },{
    value:'2',
    checked:false,
    text:'投诉反馈',
  }]

  const feedbackImages = [{src:'',key:'0'},{src:'',key:'1'},{src:'',key:'2'},]





  function changeCount(event) {
    const val = event.detail.valueOf().value;
    setTextLength(val.length)
  }

  function test() {

    console.log('添加图片')
  }

  function inputBlur() {
    console.log('失去焦点，开始验证')
  }

  function cancel() {
    navigateBack()
  }

  function submit() {
    console.log('提交')
  }


  return (
    <MainLayout title={'意见反馈'}>
      <view className={sty.select}>

        <view className={sty.title}>选择反馈类型</view>
             <view className={sty.items}>
            <RadioGroup>
              {radioArrary.map((item, i) => {
                            return (
                                  <Label className='radio-list__label' for={i.toString()} key={i}>
                                            <Radio color={'#B0865B'} className={sty.radio}  value={item.value} checked={item.checked}>{item.text}</Radio>
                                        </Label>
                                 )
                        })}
            </RadioGroup>
             </view>
      </view>

      <view className={sty.feedback}>
        <view className={sty.text}>
          <Textarea onInput={changeCount}   maxlength={200} placeholder="请在这里留下您宝贵的意见帮助我们成长"  />
        </view>
        <view className={sty.count}>
          {textLength}/200
        </view>
      </view>

      <view className={sty.thumbnail}>
        <view className={sty.itmes}>
          <view className={sty.imgItems}>
            {feedbackImages.map((item) => {
              return (
                <Image key={item.key}  className={sty.inputImage} src={item.src} />
              )
            })}
          </view>
          <view className={sty.input}>
            <Image onClick={test} className={sty.inputImage} src={inputImage} />
          </view>
        </view>
        <view className={sty.text}>
         <view>*</view>
          最多可上传3张图片，图片格式为 jpg或png，大小不得超过1M; (上传图片能帮您更好地反馈问题)
        </view>
      </view>

      <view className={sty.phone}>
        <Input onBlur={inputBlur} className={sty.input} type='text' placeholder={'手机号/邮箱 (选填)'}/>
      </view>

      <view className={sty.btns}>
        <ArgusButton
          text={'取消'}
          theme={'light'}
          style={{ width: '240rpx' ,height:'88rpx',minWidth:'0'}}
          onClick={cancel}
        ></ArgusButton>
        <ArgusButton
          text={'提交意见'}
          style={{ width: '240rpx' ,height:'88rpx',minWidth:'0'}}
          onClick={submit}
        ></ArgusButton>
      </view>
    </MainLayout>
  )
}
