import {useSelector, shallowEqual, TypedUseSelectorHook} from 'react-redux'
import {StoreStateProps} from '../store/reducers'

interface ISelector<R> {
  (sRate: StoreStateProps): R
}

const useStoreSelector: TypedUseSelectorHook<StoreStateProps> = useSelector

export default function useShallowEqualSelecto<R = any>(
  selector: ISelector<R>,
) {
  return useStoreSelector(selector, shallowEqual)
}
