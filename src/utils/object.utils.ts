const arrToKeyArray = <T extends Record<string, any>, Key extends keyof T>(items: T[], key: Key): Record<T[Key], T[]> => {
  const itemsToMap: Record<T[Key], T[]> = {} as any

  for (const item of items) {
    if (Array.isArray(itemsToMap[item[key]])) {
      itemsToMap[item[key]].push(item)
    } else if (item[key]) {
      itemsToMap[item[key]] = [item]
    }
  }

  return itemsToMap
}


const objectUtils = { arrToKeyArray }
export default objectUtils
