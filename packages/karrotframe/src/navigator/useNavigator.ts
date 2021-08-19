import { useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useScreenInstanceInfo } from './contexts'
import { getNavigatorParams, NavigatorParamKeys } from './helpers'
import { useUniqueId } from './hooks/useUniqueId'
import { useStore, useStoreActions } from './store'

export function useNavigator() {
  const history = useHistory()
  const location = useLocation()
  const screenInfo = useScreenInstanceInfo()
  const { uid } = useUniqueId()

  const store = useStore()
  const { addScreenInstancePromise } = useStoreActions()

  const searchParams = new URLSearchParams(location.search)
  const { present, screenInstanceId } = getNavigatorParams(searchParams)

  const push = useCallback(
    <T = object>(
      to: string,
      options?: {
        /**
         * Bottom to top animation (iOS only)
         */
        present?: boolean
      }
    ): Promise<T | null> =>
      new Promise((resolve) => {
        const { pathname, searchParams } = new URL(to, /* dummy */ 'file://')

        searchParams.set(NavigatorParamKeys.screenInstanceId, uid())

        if (options?.present) {
          searchParams.set(NavigatorParamKeys.present, 'true')
        }

        addScreenInstancePromise({
          screenInstanceId: screenInfo.screenInstanceId,
          screenInstancePromise: {
            resolve,
            popped: false,
          },
        })

        history.push(`${pathname}?${searchParams.toString()}`)
      }),
    [screenInfo, history]
  )

  const replace = useCallback(
    (
      to: string,
      options?: {
        /**
         * Animate when replaced
         */
        animate?: boolean
      }
    ) => {
      const { pathname, searchParams } = new URL(to, /* dummy */ 'file://')

      if (options?.animate) {
        searchParams.set(NavigatorParamKeys.screenInstanceId, uid())
      } else {
        if (screenInstanceId) {
          searchParams.set(
            NavigatorParamKeys.screenInstanceId,
            screenInstanceId
          )
        }
        if (present) {
          searchParams.set(NavigatorParamKeys.present, 'true')
        }
      }

      history.replace(`${pathname}?${searchParams.toString()}`)
    },
    [history, screenInstanceId, present]
  )

  const pop = useCallback(
    (depth = 1) => {
      const { screenInstances, screenInstancePtr, screenInstancePromises } =
        store.getState()

      const targetScreenInstance = screenInstances[screenInstancePtr - depth]

      const backwardCount = screenInstances
        .filter(
          (_, idx) =>
            idx > screenInstancePtr - depth && idx <= screenInstancePtr
        )
        .map((screenInstance) => screenInstance.nestedRouteCount)
        .reduce((acc, current) => acc + current + 1, 0)

      const targetPromise =
        targetScreenInstance && screenInstancePromises[targetScreenInstance.id]
      let _data: any = null

      const dispose = history.listen(() => {
        dispose()

        if (targetScreenInstance) {
          targetPromise?.resolve(_data ?? null)
        }
      })

      /**
       * Send data to `await push()`
       */
      function send<T = object>(
        /**
         * Payload
         */
        data: T
      ) {
        _data = data

        if (targetPromise) {
          targetPromise.popped = true
        }
      }

      Promise.resolve().then(() => {
        history.go(-backwardCount)
      })

      return {
        send,
      }
    },
    [history]
  )

  return useMemo(
    () => ({
      push,
      replace,
      pop,
    }),
    [push, replace, pop]
  )
}
