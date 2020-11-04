import React  from 'react'

import MainLayout from '../../components/main-layout'

import sty from './index.module.scss'
import { Radio,RadioGroup ,Label,Textarea} from '@tarojs/components'



export default function index() {
<<<<<<< Updated upstream
    return (
        <MainLayout title={'账户管理'}>
            <view className={sty.avatar}>
                <view className={sty.Label}></view>
                <view className={sty.Component}></view>
            </view>
            <view className={sty.form}>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon icon={'user'} />
                        用户名
                    </view>
                    <view className={sty.Component}>
                        <ArgusInput />
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon icon={'mail'} />
                        电子邮件
                    </view>
                    <view className={sty.Component}>
                        <ArgusInput />
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon icon={'global'} />
                        语言
                    </view>
                    <view className={sty.Component}>
                        <ArgusSelector items={['中文']} />
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon icon={'mobile'} />
                        手机号
                    </view>
                    <view className={sty.Component}>
                        <ArgusInput />
                    </view>
                </view>
                <view className={sty.formField}>
                    <view className={sty.Label}>
                        <ArgusIcon icon={'bean-line'} />
                        咖啡豆
                    </view>
                    <view className={sty.Component}>
                        <ArgusBeanIndicator />
                    </view>
                </view>
            </view>
            <view className={sty.control}></view>
        </MainLayout>
    )
=======
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



  let textLength:number = 0;

  function test(event) {
    const val = event.detail.valueOf().value;
    textLength = val.length;
    // console.log(textLength)
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
          <Textarea onInput={test}   maxlength={200} placeholder="请在这里留下您宝贵的意见帮助我们成长" autoFocus />
        </view>
        <view className={sty.count}>
          {textLength}/200
        </view>
      </view>
    </MainLayout>
  )
>>>>>>> Stashed changes
}
