import Constant from '../constant/constant'
import Crypto from 'crypto-js'
import Base64 from 'Base64'

export default function getOSSUploadToken() {
    const policyText = {
        expiration: '2022-01-01T12:00:00.000Z', // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        conditions: [
            ['content-length-range', 0, 2147483648], // 设置上传文件的大小限制
        ],
    }

    const policyBase64 = Base64.encode(JSON.stringify(policyText))
    const bytes = Crypto.HmacSHA1(policyBase64, Constant.ali.accesskey, {
        asBytes: true,
    })
    const signature = Crypto.enc.Base64.stringify(bytes)
    return {
        policy: policyBase64,
        signature,
    }
}
