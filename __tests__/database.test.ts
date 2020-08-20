import { averagePrice, filterBySuburb, setProperties } from '../database'
import { properties } from '../__fixtures__/properties'

describe('database', () => {
  beforeEach(() => {
    setProperties(properties)
  })

  describe('average price', () => {
    test('finds the correct average', () => {
      expect(averagePrice()).toBe(1e6)
    })

    test('no properties, average will be 0', () => {
      setProperties([])
      expect(averagePrice()).toBe(0)
    })
  })

  describe('filterBySuburb', () => {
    test('filter to those that match suburb', () => {
      expect(filterBySuburb('Fawkner').length).toBe(1)
    })

    test('ignore case', () => {
      expect(filterBySuburb('fawkner').length).toBe(1)
    })

    test('nothing matches', () => {
      expect(filterBySuburb('Carnegie').length).toBe(0)
    })
  })
})
