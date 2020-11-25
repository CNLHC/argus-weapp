import axios from 'axios'
import Constant from '../constant/constant'
import { AuthedHeader, IArgusUserInfoNoReTime } from '../login'
import {  showToast } from '@tarojs/taro'


function forMatCheck(data:IArgusUserInfoNoReTime) {
  if (!!data.email){
    const  emailReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if(emailReg.test(data.email)){
      return true;
    }else{

      showToast({
        title: "请输入正确的邮箱地址(邮箱号)",
        icon:'none',
      })
      return false;
    }
  }
}

export async function saveManage(data:IArgusUserInfoNoReTime|undefined) {
if (!!data){
  if (!forMatCheck(data)){
    return
  }
  let flat = false;
  // phone有值是会保存错误，暂时不进行保存
   await axios.post(
    `${Constant.api.host}/fix_user/update_user_q`,
    {email:data.email||'',headimg:data.headimg||'',id:data.id,language:data.language||0,name:data.name||'',phone:'',sex:data.sex||'保密'}, { headers: AuthedHeader() }
  ).then(()=>{
    flat = true;
    showToast({
      title: "保存成功"
    })
  }).catch((err)=>{
    showToast({
      title: "保存失败",
      icon:'none',
    })
    console.log(err)
  })

  return flat;
}else {
  return false;
}
}
