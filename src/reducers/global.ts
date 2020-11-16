import { Reducer } from 'redux'
import { produce } from 'immer'
import { IArgusUserInfo } from '../libs/login'
import { INotes } from '../libs/notes'
import { INoteDettail } from '../libs/notes/detail'

const ActionEnum = {
    SetState: '[global]SetState',
}

export const ActSetState = (state: Partial<IGlobalState>) => ({
    type: ActionEnum.SetState,
    state,
})

interface IGlobalState {
    showLoginModal: boolean
    uploadProgress?: number
    notes: INotes[]
    loading?: boolean
    noteDetail?: INoteDettail
    UserInfo?: IArgusUserInfo
}

const init: IGlobalState = {
    notes: [],
    showLoginModal: false,
    UserInfo: undefined,
    loading: false,
}
export type TAction = ReturnType<typeof ActSetState>

export const GlobalReducers: Reducer<IGlobalState, TAction> = (
    state = init,
    action
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case ActionEnum.SetState:
                Object.assign(draft, action.state)
        }
    })
