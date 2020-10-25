import React from 'react'
import styles from './index.module.scss'
import IconHome from '../../../assets/icon_home.svg'
import IconMine from '../../../assets/icon_mine.svg'
import IconNotes from '../../../assets/icon_notes.svg'
import IconHomeH from '../../../assets/icon_home_h.svg'
import IconMineH from '../../../assets/icon_mine_h.svg'
import IconNotesH from '../../../assets/icon_notes_h.svg'
import { navigateBackMiniProgram, navigateTo, redirectTo } from '@tarojs/taro'

const menu = [
    {
        key: 'home',
        title: '首页',
        icon: IconHome,
        iconH: IconHomeH,
    },
    {
        key: 'mynotes',
        title: '笔记',
        icon: IconNotes,
        iconH: IconNotesH,
    },
    {
        key: 'mine',
        title: '我的',
        icon: IconMine,
        iconH: IconMineH,
    },
]
interface IProps {
    selected?: string
}
export default function ArgusNavBar(props: IProps) {
    return (
        <view className={styles.argusNavbar}>
            {menu.map((e) => (
                <view
                    key={e.title}
                    className={styles.navItem}
                    onClick={() => {
                        redirectTo({ url: `/pages/${e.key}/index` })
                    }}
                >
                    {e.key !== props.selected ? (
                        <image src={e.icon} />
                    ) : (
                        <image src={e.iconH} />
                    )}
                    <view
                        className={
                            e.key !== props.selected ? '' : styles.selected
                        }
                    >
                        {e.title}
                    </view>
                </view>
            ))}
        </view>
    )
}
