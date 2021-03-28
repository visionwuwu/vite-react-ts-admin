import {
  createStore,
  applyMiddleware,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  Store,
} from 'redux'
import thunk from 'redux-thunk'
import reducer, {StoreActions, StoreStateProps} from './reducers'

const storeEnhancer: StoreEnhancer = applyMiddleware(thunk)
const storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(
  createStore,
)

const store: Store<StoreStateProps, StoreActions> = storeEnhancerStoreCreator(
  reducer,
)

export default store
