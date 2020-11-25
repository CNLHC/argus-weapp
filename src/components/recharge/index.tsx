import React, { useState } from 'react'
import sty from './index.module.scss'
import ArgusButton from '../button'


interface IProps {
  handleFun:Function
  show:boolean
}

interface Item {
  money:number
  beans:number
  checked:boolean
}

export default function Recharge(props: IProps) {
  const { handleFun ,show} = props
  let newItemArrary:Item[] = [{money:6,beans:10,checked:true},
    {money:18,beans:45,checked:false},
    {money:30,beans:100,checked:false},
    {money:50,beans:200,checked:false},
    {money:100,beans:400,checked:false},
    {money:200,beans:800,checked:false},]
  const [itemArrary,setItemArrary] = useState(newItemArrary);
  const [currentIndex,setCurrentIndex] = useState(0);


 function setCurrentItem(i:number) {
   // 区域内的newItemArrary在事件结束后会变回初始值，所以需要每次取得最新的值
   newItemArrary = itemArrary;
   newItemArrary[currentIndex].checked = false;
   newItemArrary[i].checked = true;
   setCurrentIndex(i);
   setItemArrary(newItemArrary);
 }

  if (!show) return null
    return (
     <view className={sty.mask} >
       <view className={sty.box}>
         <view className={sty.title}>咖啡豆充值</view>
         <view className={sty.itemBox}>
           {itemArrary.map((item, i) => {
             return (
               <view onClick={
                 ()=>{
                  setCurrentItem(i);
                 }
               } className={item.checked?sty.activeItem:''} >{i}:{item.money}</view>
             )
           })}
         </view>
         <view className={sty.title}>
           使用说明：
         </view>
         <view className={sty.content}>
           <view>- 充值金额可用于兑换视频识别时长，1个咖啡豆可以兑换1分钟。 </view>
           <view>- 充值成功后不支持退款。</view>
           <view>- 充值金额没有使用期限，会一直保存在你的账户内随时使用。</view>
           <view>- 充值到账时间可能有延迟。如果扣款后一个小时未到账，请点击『充值遇到问题』告诉我们，我们会儘快为您处理。</view>
         </view>
         <view className={sty.btns}>
           <ArgusButton onClick={()=>{
             handleFun()
           }} style={{width:'180rpx',height:'88rpx'}} theme={'light'} text={'取消'}/>
           <ArgusButton style={{width:'180rpx',height:'88rpx'}} text={'下一步'}/>
         </view>
       </view>
     </view>
    )
}
