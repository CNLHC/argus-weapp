import { combineReducers } from 'redux'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { GlobalReducers } from './global'
import { ReducerState } from 'react'

const RootReducers = combineReducers({
    GlobalReducers,
})

export const useTypedSelector: TypedUseSelectorHook<ReducerState<
    typeof RootReducers
>> = useSelector
export default RootReducers
