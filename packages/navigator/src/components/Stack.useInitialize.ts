import { useEffect } from 'react'
import { matchPath, useHistory, useLocation } from 'react-router-dom'

import { NavigatorParamKeys } from '../helpers'
import { useUniqueId } from '../hooks'
import { useStore } from '../store'
import { usePush } from './Stack.usePush'

function useInitialize() {
  const { uid } = useUniqueId()
  const location = useLocation()
  const history = useHistory()

  const store = useStore()

  const push = usePush()

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (window.__KARROTFRAME__) {
      throw new Error('Only one Navigator is allowed in an app')
    }

    window.__KARROTFRAME__ = true

    const searchParams = new URLSearchParams(location.search)
    const screenInstanceId = uid()
    searchParams.set(NavigatorParamKeys.SCREEN_INSTANCE_ID, screenInstanceId)

    const { screens, screenInstances } = store.getState()

    if (screenInstances.length === 0) {
      const matchScreen = Object.values(screens).find(
        (screen) =>
          screen &&
          matchPath(location.pathname, { exact: true, path: screen.path })
      )

      if (matchScreen) {
        push({
          screenId: matchScreen.id,
          screenInstanceId,
          present: false,
          as: location.pathname,
        })
      }
    }

    history.replace(`${location.pathname}?${searchParams.toString()}`)

    return () => {
      window.__KARROTFRAME__ = false
    }
  }, [])
}

export default useInitialize
