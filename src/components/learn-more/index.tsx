import React from 'react'
import sty from './index.module.scss'
import ArgusButton from '../button'

interface IProps {
  handleFun:Function
  handleFun2:Function
  show:boolean
}

export default function LearnMore(props: IProps) {
  const { handleFun, handleFun2 ,show} = props
  if (!show) return null
    return (
     <view className={sty.mask} >
       <view className={sty.box}>
         <view className={sty.title}>
           关于Argus咖啡豆
         </view>
         <view className={sty.content}>
           为帮助你更好地生成视频笔记，我们提供您咖啡豆来兑换视频识别时长，1个咖啡豆可兑换1分钟。
         </view>
         <view className={sty.title}>获取咖啡豆的方法</view>
         <view className={sty.content}>
           <view>1）首次登录+20</view>
           <view>2）完善个人信息+20</view>
           <view>3）首次上传视频+20</view>
           <view>4）分享编辑过的笔记+30</view>
           <view>5）提交一次用户反馈+15</view>
           <view>6）邀请朋友成功注册双方均+60</view>
         </view>
         <view className={sty.btns}>
           <ArgusButton   onClick={()=>{
             handleFun()
           }}  text={'关闭'} theme={'light'} style={{ width: '160rpx' ,height:'88rpx',minWidth:'0'}} />
           <ArgusButton theme={'light'} text={'充值记录'} style={{ width: '192rpx' ,height:'88rpx',minWidth:'0'}}/>
           <ArgusButton  onClick={()=>{
             handleFun2()
           }} text={'充值'} style={{ width: '160rpx' ,height:'88rpx',minWidth:'0'}}/>
         </view>
       </view>
     </view>
    )
}
