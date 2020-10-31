import { Reducer } from 'redux'
import { produce } from 'immer'

const ActionEnum = {
    SetState: '[global]SetState',
}

export const ActSetState = (state: Partial<IGlobalState>) => ({
    type: ActionEnum.SetState,
    state,
})

interface IGlobalState {
    showLoginModal: boolean
}

const init: IGlobalState = {
    showLoginModal: false,
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
