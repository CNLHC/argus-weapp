import b64 from 'base64-js'

export default function getOSSUploadToken() {
    const policyText = {
        expiration: '2022-01-01T12:00:00.000Z', // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        conditions: [
            ['content-length-range', 0, 2147483648], // 设置上传文件的大小限制
        ],
    }

    const policyBase64 = b64.fromByteArray(
        Buffer.from(JSON.stringify(policyText))
    )
    const signature = 'LggfXZl+Vh2A1zXCfS4CpG8BOoY='
    return {
        policy: policyBase64,
        signature,
    }
}
