import { ScrollView } from '@tarojs/components'
import { navigateTo, redirectTo } from '@tarojs/taro'
import React from 'react'
import { useTypedSelector } from '../../../reducers'
import ArgusVideoCard from '../card'

const mocking = [
    {
        title: 'python程式语言入门',
        status: 'processing',
    },
    {
        title: 'python程式语言入门',
        status: 'done',
    },
]

export default function ArgusVideoList() {
    const notes = useTypedSelector(e => e.GlobalReducers.notes)
    const loading = useTypedSelector(e => e.GlobalReducers.loading)
    const onClickCard = (id) => {
        console.log("click card id", id)
        navigateTo({ url: `/pages/editor/index?id=${id}` })
    }

    return (
        <ScrollView>
            {notes.map((e) => (
                <ArgusVideoCard title={e.filename} key={e.id} status={e.isLoading === 0 ? "processing" : "done"} pic={e.pic} onClick={() => onClickCard(e.id)} />
            ))}
        </ScrollView>
    )
}
