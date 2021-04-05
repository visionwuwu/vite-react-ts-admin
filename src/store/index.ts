import {useSelector, TypedUseSelectorHook, useDispatch} from 'react-redux'
import {
  createStore,
  applyMiddleware,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  Store,
} from 'redux'
import thunk from 'redux-thunk'
import reducer, {StoreActions, StoreStateProps} from './reducers'

/** App应用的Dispatch类型 */
export type AppDispatch = typeof store.dispatch

/** App应用的useSelector */
export const useAppSelector: TypedUseSelectorHook<StoreStateProps> = useSelector

/** App应用的useDispatch */
export const useAppDispatch = () => useDispatch<AppDispatch>()

const storeEnhancer: StoreEnhancer = applyMiddleware(thunk)
const storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(
  createStore,
)

const store: Store<StoreStateProps, StoreActions> = storeEnhancerStoreCreator(
  reducer,
)

export default store
