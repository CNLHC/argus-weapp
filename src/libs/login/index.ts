import { getStorageSync, setStorage, showToast } from '@tarojs/taro'
import axios from 'axios'
import Constant from '../constant/constant'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

interface IGetCodePayload {
    mobile: string
}
export async function getCode({ mobile }: IGetCodePayload) {
    await axios.post(`${Constant.api.host}/admin_login/get_code`, {
        type: 0,
        mobile,
    })
}

interface ILoginPayload {
    code: string
    mobile: string
}
export async function ArgusLogin(
    payload: ILoginPayload,
    onSuc?: (user: IArgusUserInfo) => void
) {
    try {
        const res = await axios.post(
            `${Constant.api.host}/admin_login/login_phone`,
            payload
        )

        await setStorage({ key: 'code', data: payload.code })
        await setStorage({ key: 'token', data: res.data.token })
        await setStorage({ key: 'userid', data: payload.mobile })
        const userinfo = await GetUserInfo()
        if (!userinfo) throw Error('no userinfo')
        onSuc && onSuc(userinfo)

/*        console.log(
            'login success',
            `token: ${res.data.token}`,
            `user:${userinfo}`
        )
     */   showToast({ title: '登陆成功' })
    } catch (e) {
        console.log(e)
        showToast({ title: '登陆失败' })
    }
}

export async function ArgusEditPhone(
  payload: ILoginPayload
) {
  let flat = false;
  try {
    const res = await axios.post(
      `${Constant.api.host}/admin_login/login_phone`,
      payload
    )
    await setStorage({ key: 'code', data: payload.code })
    await setStorage({ key: 'token', data: res.data.token })
    await setStorage({ key: 'userid', data: payload.mobile })
    const userinfo = await GetUserInfo()
    if (!userinfo) throw Error('no userinfo')
    flat = true;
    showToast({ title: '修改手机号成功' ,icon:'none'})
  } catch (e) {
    console.log(e)
    showToast({ title: '修改手机号失败' ,icon:'none'})
  }
  return flat;
}

export interface IArgusUserInfo {
  email: null | string
  headimg: null | string
  id: string | string
  language: number
  name: null | string
  phone: null | string
  retime: number
  sex: null | string
}

export interface IArgusUserInfoNoReTime {
  email: null | string
  headimg: null | string
  id: string | string
  language: number
  name: null | string
  phone: null | string
  sex: null | string
}

// Generated by https://quicktype.io
export async function GetUserInfo(): Promise<IArgusUserInfo | undefined> {
    if (getToken().length == 0) return
    const res = await axios.get(
        `${Constant.api.host
        }/fix_user/query_login_user_info?userid=${getUserId()}`,
        { headers: AuthedHeader() }
    )
    return res.data
}

export function getToken(): string {
    return getStorageSync('token') as string
}

export function AuthedHeader(header?: any): any {
    return {
        ...header,
        token: getToken(),
    }
}

export function getUserId(): string {
    return getStorageSync('userid') as string
}
