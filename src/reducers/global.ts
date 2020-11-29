import { Reducer } from 'redux'
import { produce } from 'immer'
import { IArgusUserInfo } from '../libs/login'
import { INotes } from '../libs/notes'
import { INoteDettail } from '../libs/notes/detail'
import { EditorContext } from '@tarojs/taro'
import { Editor } from '@tarojs/components'

const ActionEnum = {
    SetState: '[global]SetState',
    UpdateCodeCounter: 'globalUpdateCodeCounter',
    EditorUpdate: `EditorUpdate`,
    EditorClear: `EditorClear`
}

export const ActEditorCtxUpdate = (idx: number, ctx: EditorContext) => ({
    type: ActionEnum.EditorUpdate,
    idx,
    ctx
})
export const ActEditorClear = () => ({
    type: ActionEnum.EditorClear,
})

export const ActSetState = (state: Partial<IGlobalState>) => ({
    type: ActionEnum.SetState,
    state,
})

export const ActUpdateCodeCounter = (handle?: NodeJS.Timeout) => ({
    type: ActionEnum.UpdateCodeCounter,
    handle,
})

interface IGlobalState {
    showLoginModal: boolean
    uploadProgress?: number
    notes: INotes[]
    loading?: boolean
    noteDetail?: INoteDettail
    editorCtx: EditorContext[]
    UserInfo?: IArgusUserInfo
    decreasingCost?: number
    codeCounter: {
        value: number
        handle?: NodeJS.Timeout
    }
}

const init: IGlobalState = {
    editorCtx: [],
    notes: [],
    showLoginModal: false,
    UserInfo: undefined,
    loading: false,
    codeCounter: {
        value: 0,
    },
}

export type TAction = ReturnType<typeof ActSetState> &
    ReturnType<typeof ActUpdateCodeCounter> &
    ReturnType<typeof ActEditorClear> &
    ReturnType<typeof ActEditorCtxUpdate>

export const GlobalReducers: Reducer<IGlobalState, TAction> = (
    state = init,
    action
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case ActionEnum.SetState:
                Object.assign(draft, action.state)
                return
            case ActionEnum.UpdateCodeCounter:
                if (action.handle) {
                    draft.codeCounter.handle = action.handle
                    draft.codeCounter.value = 60
                    return
                }
                if (draft.codeCounter.value > 0) draft.codeCounter.value -= 1
                else draft.codeCounter.value = 0
                return
            case ActionEnum.EditorClear:
                draft.editorCtx = []
                return
            case ActionEnum.EditorUpdate:
                draft[action.idx] = action.ctx
                return
        }
    })
