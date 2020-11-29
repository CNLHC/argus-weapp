import { getStorageSync } from '@tarojs/taro'
import Axios from 'axios'
import Constant from '../constant/constant'
import errorMsg from '../error'
import { AuthedHeader } from '../login'

class ArgusVideoLogic {
    gObjectName: string
    constructor({ gObjectName }: { gObjectName: string }) {
        this.gObjectName = gObjectName
    }

    randomString(len: number) {
        len = len || 32
        const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        const maxPos = chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
    }
    getSuffix(filename: string) {
        const pos = filename.lastIndexOf('.')
        let suffix = ''
        if (pos !== -1) {
            suffix = filename.substring(pos)
        }
        return suffix
    }
    getUploadedObjectName(filename: string) {
        if (this.gObjectName) {
            return this.gObjectName.replace(/\${filename}/, filename)
        } else {
            return filename
        }
    }
}

export async function video_sub(uploadFilename: string) {
    return Axios.post(
        `${Constant.api.host}/edit_video/sub_video`,
        {
            name: decodeURIComponent(uploadFilename),
            isedit: 'false',
        },
        { headers: AuthedHeader() }
    )
}
export async function video_postclip(props: {
    endtime: string
    ossname: string
    filename: string
    user: any
}) {
    const code = await getStorageSync('code')
    return Axios.post(
        `${Constant.api.host}/edit_video/edit_send_video`,
        {
            name: props.ossname,
            realname: props.filename,
            langtype: props.user.language,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_time: '0',
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_time: props.endtime,
            isedit: 'false',
        },
        {
            headers: AuthedHeader({
                userid: props.user.id,
                openid: props.user.id,
                mobile: props.user.id,
                type: 0,
                code,
            }),
        }
    )
}

export async function video_process({
    uploadFilename,
    user,
    filename,
}: {
    uploadFilename: string
    filename: string
    user: any
}) {
    console.log('start video_sub')
    const res1 = await video_sub(uploadFilename)

    if (res1?.data.time) {
        const time = parseInt(res1?.data.time.toString()).toString()
        console.log('start video_postclip')
        const res2 = await video_postclip({
            endtime: time,
            ossname: uploadFilename,
            filename,
            user: user,
        })
        if (res2.data.status === 401) {
            console.error(errorMsg.API_FAILED_401)
        }
    }
}
