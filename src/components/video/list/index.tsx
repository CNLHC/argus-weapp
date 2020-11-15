import { ScrollView } from '@tarojs/components'
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

    return (
        <ScrollView>
            {notes.map((e) => (
                <ArgusVideoCard title={e.filename} key={e.id} status={e.isLoading === 0 ? "processing" : "done"} pic={e.pic} />
            ))}
        </ScrollView>
    )
}
