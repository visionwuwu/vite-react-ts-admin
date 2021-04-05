import {
  bindActionCreators,
  ActionCreator,
  ActionCreatorsMapObject,
  AnyAction,
} from 'redux'
import {useDispatch} from 'react-redux'
import {useMemo} from 'react'
import {
  CommonActionCreator,
  CommonAsyncActionCreator,
  RootActionsCreator,
} from '../store/actions'

/** redux中的ActionCreator */
type ReduxActionCreator =
  | ActionCreator<AnyAction>
  | ActionCreator<AnyAction>[]
  | ActionCreatorsMapObject<AnyAction>

/** 当前应用的ActionCreator */
type AppRootActionCreator =
  | RootActionsCreator
  | RootActionsCreator[]
  | {[key: string]: RootActionsCreator}

/** 自定义通用的ActionCreator */
type CombineCommonActionCreator = CommonActionCreator | CommonAsyncActionCreator
type CommonActionCreators =
  | CombineCommonActionCreator
  | CombineCommonActionCreator[]
  | {[key: string]: CombineCommonActionCreator}

/** useActions hooks第一个参数actions的类型 */
type actionsType =
  | AppRootActionCreator
  | ReduxActionCreator
  | CommonActionCreators

export default function useActions(actions: actionsType, deps: any[]): any {
  const dispatch = useDispatch()
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a: any) => bindActionCreators(a, dispatch))
      }
      if (typeof actions === 'object') {
        return bindActionCreators(actions, dispatch)
      }
      return bindActionCreators(actions, dispatch)
    },
    deps ? [dispatch, ...deps] : [dispatch],
  )
}
