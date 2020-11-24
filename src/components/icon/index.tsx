import React from 'react'
import assetsIconWx from '../../../assets/icon_wx.svg'
import assetsIconAdd from '../../../assets/icon_add.svg'
import assetsIconNotePad from '../../../assets/icon_notepad.svg'
import assetsIconSmilePop from '../../../assets/icon_smilepop.svg'
import assetsIconShare from '../../../assets/icon_share.svg'
import assetsIconAccount from '../../../assets/icon_mine.svg'
import assetsIconUser from '../../../assets/icon_user.svg'
import assetsIconMail from '../../../assets/icon_mail.svg'
import assetsIconGlobal from '../../../assets/icon_global.svg'
import assetsIconMobile from '../../../assets/icon_mobile.svg'
import assetsIconGender from '../../../assets/icon_gender.svg'
import assetsIconBeanLine from '../../../assets/icon_bean_line.svg'
import assetsIconProfile from '../../../assets/icon_profile.svg'
import assetsIconGlobe from '../../../assets/icon_globe.svg'
import assetsIconCameraGroup from '../../../assets/icon_camera_group.svg'

interface IProps {
    icon: 'wx' | string
    className?: string
    style?: React.CSSProperties
}
export default function ArgusIcon(props: IProps) {
    const { icon, className } = props

    let src
    switch (icon) {
        case 'wx':
            src = assetsIconWx
            break
        case 'add':
            src = assetsIconAdd
            break
        case 'notepad':
            src = assetsIconNotePad
            break
        case 'account':
            src = assetsIconAccount
            break
        case 'share':
            src = assetsIconShare
            break
        case 'smilepop':
            src = assetsIconSmilePop
            break
        case 'user':
            src = assetsIconUser
            break
        case 'mail':
            src = assetsIconMail
            break
        case 'global':
            src = assetsIconGlobal
            break
        case 'mobile':
            src = assetsIconMobile
            break
        case 'gender':
            src = assetsIconGender
            break
        case 'bean-line':
            src = assetsIconBeanLine
            break
        case 'pro-file':
          src = assetsIconProfile
          break
        case 'globe':
           src = assetsIconGlobe
           break
        case 'camera-group':
           src = assetsIconCameraGroup
           break
    }
    return <image src={src} className={className} style={props.style} />
}
