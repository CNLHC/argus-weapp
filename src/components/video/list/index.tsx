import { ScrollView } from '@tarojs/components'
import React from 'react'
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
    return (
        <ScrollView>
            {mocking.map((e) => (
                <ArgusVideoCard {...e} key={e.title} />
            ))}
        </ScrollView>
    )
}
