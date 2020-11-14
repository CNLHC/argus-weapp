import { Reducer } from 'redux'
import { produce } from 'immer'
import { IArgusUserInfo } from '../libs/login'

const ActionEnum = {
    SetState: '[global]SetState',
}

export const ActSetState = (state: Partial<IGlobalState>) => ({
    type: ActionEnum.SetState,
    state,
})

interface IGlobalState {
    showLoginModal: boolean
    UserInfo?: IArgusUserInfo
}

const init: IGlobalState = {
    showLoginModal: false,
    UserInfo: undefined,
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
