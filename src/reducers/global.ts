import { Reducer } from 'redux'
import { produce } from 'immer'
import { IArgusUserInfo } from '../libs/login'
import { INotes } from '../libs/notes'
import { INoteDettail } from '../libs/notes/detail'

const ActionEnum = {
    SetState: '[global]SetState',
    UpdateCodeCounter: 'globalUpdateCodeCounter',
}

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
    UserInfo?: IArgusUserInfo
    codeCounter: {
        value: number
        handle?: NodeJS.Timeout
    }
}

const init: IGlobalState = {
    notes: [],
    showLoginModal: false,
    UserInfo: undefined,
    loading: false,
    codeCounter: {
        value: 0,
    },
}
export type TAction = ReturnType<typeof ActSetState> &
    ReturnType<typeof ActUpdateCodeCounter>

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
        }
    })
