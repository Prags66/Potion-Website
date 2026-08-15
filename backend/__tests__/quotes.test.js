import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app.js'
import Quote from '../models/Quote.js'

const TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/potion_test'

beforeAll(async () => {
  await mongoose.connect(TEST_URI)
  await Quote.deleteMany({})
  await Quote.insertMany([
    { text: 'Test calm quote', mood: 'calm', lang: 'en' },
    { text: 'Test hopeful quote', mood: 'hopeful', lang: 'en' },
  ])
})

afterAll(async () => {
  await Quote.deleteMany({})
  await mongoose.disconnect()
})

describe('GET /api/quotes/random', () => {
  it('returns a quote matching the requested mood and language', async () => {
    const res = await request(app).get('/api/quotes/random?mood=calm&lang=en')

    expect(res.status).toBe(200)
    expect(res.body.mood).toBe('calm')
    expect(res.body.lang).toBe('en')
  })

  it('returns 404 when no quote matches the mood/language combination', async () => {
    const res = await request(app).get('/api/quotes/random?mood=melancholic&lang=la')

    expect(res.status).toBe(404)
  })
})

describe('GET /api/quotes/random with excludeId', () => {
  it('does not return the excluded quote when an alternative exists', async () => {
    await Quote.insertMany([
      { text: 'Second calm quote', mood: 'calm', lang: 'en' },
    ])
    const first = await request(app).get('/api/quotes/random?mood=calm&lang=en')
    const second = await request(app).get(`/api/quotes/random?mood=calm&lang=en&excludeId=${first.body._id}`)

    expect(second.body._id).not.toBe(first.body._id)
  })
})

describe('GET /api/health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})
