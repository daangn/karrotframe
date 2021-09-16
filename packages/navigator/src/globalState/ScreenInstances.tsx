import React, { createContext, useCallback, useContext, useState } from 'react'

export interface IScreenInstance {
  id: string
  screenId: string
  nestedRouteCount: number
  present: boolean
  as: string
}
export interface IScreenInstancePromise {
  resolve: (data: any | null) => void
}
export interface IScreenInstancePromiseMap {
  [key: string]: IScreenInstancePromise
}

const ScreenInstancesContext = createContext<{
  screenInstances: IScreenInstance[]
  screenInstancePtr: number
  screenInstancePromiseMap: IScreenInstancePromiseMap
  insertScreenInstance: (args: {
    ptr: number
    screenInstance: {
      id: string
      screenId: string
      present: boolean
      as: string
    }
  }) => void
  mapScreenInstance: (args: {
    ptr: number
    mapper: (screenInstance: IScreenInstance) => IScreenInstance
  }) => void
  incScreenInstancePtr: () => void
  setScreenInstancePtr: (ptr: number) => void
  addScreenInstancePromise: (args: {
    screenInstanceId: string
    screenInstancePromise: IScreenInstancePromise
  }) => void
}>(null as any)

export const ScreenInstancesProvider: React.FC = (props) => {
  const [screenInstances, setScreenInstances] = useState<IScreenInstance[]>([])
  const [screenInstancePtr, setScreenInstancePtr] = useState<number>(-1)
  const [screenInstancePromiseMap, setScreenInstancePromiseMap] =
    useState<IScreenInstancePromiseMap>({})

  const insertScreenInstance = useCallback(
    ({
      ptr,
      screenInstance,
    }: {
      ptr: number
      screenInstance: {
        id: string
        screenId: string
        present: boolean
        as: string
      }
    }) => {
      setScreenInstances((screenInstances) => [
        ...screenInstances.filter((_, i) => i <= ptr),
        {
          ...screenInstance,
          nestedRouteCount: 0,
        },
      ])
    },
    [setScreenInstances]
  )

  const mapScreenInstance = useCallback(
    ({
      ptr,
      mapper,
    }: {
      ptr: number
      mapper: (screenInstance: IScreenInstance) => IScreenInstance
    }) => {
      setScreenInstances((screenInstances) =>
        screenInstances.map((si, i) => (i === ptr ? mapper(si) : si))
      )
    },
    [setScreenInstances]
  )

  const incScreenInstancePtr = useCallback(() => {
    setScreenInstancePtr((ptr) => ptr + 1)
  }, [setScreenInstancePtr])

  const addScreenInstancePromise = useCallback(
    ({
      screenInstanceId,
      screenInstancePromise,
    }: {
      screenInstanceId: string
      screenInstancePromise: IScreenInstancePromise
    }) => {
      setScreenInstancePromiseMap((screenInstancePromiseMap) => ({
        ...screenInstancePromiseMap,
        [screenInstanceId]: screenInstancePromise,
      }))
    },
    [setScreenInstancePromiseMap]
  )

  return (
    <ScreenInstancesContext.Provider
      value={{
        screenInstances,
        screenInstancePromiseMap,
        screenInstancePtr,
        insertScreenInstance,
        mapScreenInstance,
        incScreenInstancePtr,
        setScreenInstancePtr,
        addScreenInstancePromise,
      }}
    >
      {props.children}
    </ScreenInstancesContext.Provider>
  )
}

export function useScreenInstances() {
  return useContext(ScreenInstancesContext)
}
