import { Dayjs } from "dayjs"

import { DateTimeUtils } from "./utils"
import { fetchLastExposureDetectionDate } from "./gaen/nativeModule"

import React, {
  createContext,
  useState,
  useEffect,
  FunctionComponent,
  useCallback,
} from "react"

import {
  blankExposureHistory,
  ExposureHistory,
  ExposureCalendarOptions,
  ExposureInfo,
} from "./exposureHistory"
import { StorageUtils } from "./utils"

interface ExposureHistoryState {
  exposureHistory: ExposureHistory
  hasBeenExposed: boolean
  userHasNewExposure: boolean
  observeExposures: () => void
  getCurrentExposures: () => void
  lastExposureDetectionDate: Dayjs | null
}

const initialState = {
  exposureHistory: [],
  hasBeenExposed: false,
  userHasNewExposure: false,
  observeExposures: (): void => {},
  getCurrentExposures: (): void => {},
  lastExposureDetectionDate: null,
}

const ExposureHistoryContext = createContext<ExposureHistoryState>(initialState)

type ExposureInfoSubscription = (
  cb: (exposureInfo: ExposureInfo) => void,
) => { remove: () => void }

export interface ExposureEventsStrategy {
  exposureInfoSubscription: ExposureInfoSubscription
  toExposureHistory: (
    exposureInfo: ExposureInfo,
    calendarOptions: ExposureCalendarOptions,
  ) => ExposureHistory
  getCurrentExposures: (cb: (exposureInfo: ExposureInfo) => void) => void
}

interface ExposureHistoryProps {
  exposureEventsStrategy: ExposureEventsStrategy
}

const CALENDAR_DAY_COUNT = 21

const blankHistoryConfig: ExposureCalendarOptions = {
  startDate: Date.now(),
  totalDays: CALENDAR_DAY_COUNT,
}

const blankHistory = blankExposureHistory(blankHistoryConfig)

const ExposureHistoryProvider: FunctionComponent<ExposureHistoryProps> = ({
  children,
  exposureEventsStrategy,
}) => {
  const [userHasNewExposure, setUserHasNewExposure] = useState<boolean>(false)
  const { exposureInfoSubscription, toExposureHistory } = exposureEventsStrategy
  const [exposureHistory, setExposureHistory] = useState<ExposureHistory>(
    blankHistory,
  )
  const [
    lastExposureDetectionDate,
    setLastExposureDetectionDate,
  ] = useState<Dayjs | null>(null)

  const getLastExposureDetectionDate = useCallback(() => {
    fetchLastExposureDetectionDate().then((exposureDetectionDate) => {
      exposureDetectionDate &&
        setLastExposureDetectionDate(
          DateTimeUtils.posixToDayjs(exposureDetectionDate),
        )
    })
  }, [])

  const getExposureStatus = useCallback(async () => {
    const exposureStatus = await StorageUtils.getNewExposuresData()
    setUserHasNewExposure(exposureStatus)
  }, [])

  const setExposureStatus = useCallback(async (exposureStatus: boolean) => {
    await StorageUtils.setUserHasNewExposuresData(exposureStatus)
    setUserHasNewExposure(exposureStatus)
  }, [])

  const getCurrentExposures = useCallback(() => {
    const cb = (exposureInfo: ExposureInfo) => {
      const exposureHistory = toExposureHistory(
        exposureInfo,
        blankHistoryConfig,
      )
      setExposureHistory(exposureHistory)
    }
    exposureEventsStrategy.getCurrentExposures(cb)
  }, [toExposureHistory, exposureEventsStrategy])

  useEffect(() => {
    const subscription = exposureInfoSubscription(
      (exposureInfo: ExposureInfo) => {
        const exposureHistory = toExposureHistory(
          exposureInfo,
          blankHistoryConfig,
        )
        getLastExposureDetectionDate()
        setExposureStatus(true)
        setExposureHistory(exposureHistory)
      },
    )
    getLastExposureDetectionDate()
    getExposureStatus()

    return subscription.remove
  }, [
    exposureInfoSubscription,
    toExposureHistory,
    getLastExposureDetectionDate,
    getExposureStatus,
    setExposureStatus,
  ])

  useEffect(() => {
    getCurrentExposures()
  }, [toExposureHistory, getCurrentExposures])

  const observeExposures = () => {
    setExposureStatus(false)
  }

  const hasBeenExposed = false
  return (
    <ExposureHistoryContext.Provider
      value={{
        exposureHistory,
        hasBeenExposed,
        userHasNewExposure,
        observeExposures,
        getCurrentExposures,
        lastExposureDetectionDate,
      }}
    >
      {children}
    </ExposureHistoryContext.Provider>
  )
}

export { ExposureHistoryProvider, initialState }
export default ExposureHistoryContext
