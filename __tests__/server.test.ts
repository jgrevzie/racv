import { setProperties } from '../database'
import { Property } from '../types'
import supertest from 'supertest'
import { app } from '../server'
import { properties } from '../__fixtures__/properties'

let request: supertest.Test
let server

describe('getting properties', () => {
  beforeAll(() => {
    server = app.listen()
  })
  afterAll(() => {
    server.close()
  })

  beforeEach(() => {
    setProperties(properties)
    request = supertest(server)
      .post('/graphql')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('return all the properties', async () => {
    const {
      body: { data },
    } = await request.send({ query: '{properties { price} }' }).expect(200)
    expect(data?.properties.length).toBe(3)
  })

  test('if suburb is specified, return only matching suburbs', async () => {
    const {
      body: { data },
    } = await request.send({ query: '{properties(suburb:"Fawkner") { price} }' })
    expect(data?.properties.length).toBe(1)
  })

  test('no suburbs match, return empty array', async () => {
    const {
      body: { data },
    } = await request.send({ query: '{properties(suburb:"Carnegie") { price} }' })
    expect(data?.properties.length).toBe(0)
  })

  test('get a property with all attributes', async () => {
    const {
      body: { data },
    } = await request.send({
      query: '{properties(suburb:"Fawkner") { streetAddress suburb price description }}',
    })

    const prop: Property = data.properties[0]
    expect(prop.streetAddress).toBe('20 Lovely Street')
    expect(prop.suburb).toBe('Fawkner')
    expect(prop.price).toBe(500e3)
    expect(prop.description).toBe('quiet, solid')
  })

  describe('price averages', () => {
    test(`if property is above average price, show 'ABOVE'`, async () => {
      const {
        body: { data },
      } = await request.send({ query: '{properties(suburb:"Collingwood") { relativeToAverage} }' })
      expect(data.properties[0].relativeToAverage).toBe('ABOVE')
    })

    test(`if property is above average price, show 'BELOW'`, async () => {
      const {
        body: { data },
      } = await request.send({ query: '{properties(suburb:"Fawkner") { relativeToAverage} }' })
      expect(data.properties[0].relativeToAverage).toBe('BELOW')
    })

    test(`if property is exactly average price, show 'EQUAL'`, async () => {
      const {
        body: { data },
      } = await request.send({
        query: '{properties(suburb:"Dandenong") { relativeToAverage price} }',
      })
      expect(data.properties[0].relativeToAverage).toBe('EQUAL')
    })
  })
})
