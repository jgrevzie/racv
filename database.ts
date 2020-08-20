import { Property } from './types'

let properties: Property[] = []

export const setProperties = (properties_: Property[]) => {
  properties = properties_
}

export const getProperties = () => properties

export const addProperty = (p: Property) => {
  properties = [p, ...properties]
}

export const averagePrice = () =>
  Math.round(
    properties.reduce(
      (accum: number, property: Property): number => accum + property.price / properties.length,
      0
    )
  )

export const filterBySuburb = (suburb: string) =>
  properties.filter((property) => property.suburb.toLowerCase() === suburb.toLowerCase())
