import { combineReducers } from 'redux'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import counter from './counter'
import { ReducerState } from 'react'

const RootReducers = combineReducers({
    counter,
})

export const useTypedSelector: TypedUseSelectorHook<ReducerState<
    typeof RootReducers
>> = useSelector
export default RootReducers
