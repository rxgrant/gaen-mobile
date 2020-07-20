import AsyncStorage from "@react-native-community/async-storage"

export async function getStoreData(
  key: string,
  isString = true,
): Promise<Record<string, string> | string | null> {
  try {
    const data = await AsyncStorage.getItem(key)

    if (isString) {
      return data
    }

    if (data) {
      return JSON.parse(data)
    }
    return null
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export async function setStoreData(
  key: string,
  item: Record<string, string> | string | boolean,
): Promise<void> {
  try {
    if (typeof item !== "string") {
      item = JSON.stringify(item)
    }

    return await AsyncStorage.setItem(key, item)
  } catch (error) {
    console.log(error.message)
  }
}

const NEW_EXPOSURES = "NEW_EXPOSURES"
export async function getNewExposuresData(): Promise<boolean> {
  try {
    const data = await AsyncStorage.getItem(NEW_EXPOSURES)
    if (data === null) {
      return false
    }

    return JSON.parse(data)
  } catch (e) {
    console.error(e.message)
    return false
  }
}

export async function setUserHasNewExposuresData(
  exposureStatus: boolean,
): Promise<void> {
  try {
    setStoreData(NEW_EXPOSURES, exposureStatus)
  } catch (e) {
    console.error(e.message)
  }
}
