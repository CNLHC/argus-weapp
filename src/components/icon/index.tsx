import React from 'react'
import assetsIconWx from '../../../assets/icon_wx.svg'
import assetsIconAdd from '../../../assets/icon_add.svg'
import assetsIconNotePad from '../../../assets/icon_notepad.svg'
import assetsIconSmilePop from '../../../assets/icon_smilepop.svg'
import assetsIconShare from '../../../assets/icon_share.svg'
import assetsIconAccount from '../../../assets/icon_mine.svg'

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
    }
    return <image src={src} className={className} style={props.style} />
}
