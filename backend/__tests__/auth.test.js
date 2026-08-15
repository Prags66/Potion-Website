import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app.js'
import User from '../models/User.js'

const TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/potion_test'

beforeAll(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_for_ci'
  await mongoose.connect(TEST_URI)
})

afterEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})

describe('POST /api/auth/register', () => {
  it('creates a new account and returns a token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'StarDust', email: 'stardust@example.com', password: 'secret123' })

    expect(res.status).toBe(201)
    expect(res.body.token).toBeDefined()
    expect(res.body.username).toBe('StarDust')
  })

  it('rejects a username that is too short', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'ab', email: 'ab@example.com', password: 'secret123' })

    expect(res.status).toBe(400)
  })

  it('rejects an invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'ValidName', email: 'not-an-email', password: 'secret123' })

    expect(res.status).toBe(400)
  })

  it('rejects a password shorter than 6 characters', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'ValidName', email: 'valid@example.com', password: '123' })

    expect(res.status).toBe(400)
  })

  it('rejects a duplicate username', async () => {
    await request(app).post('/api/auth/register').send({ username: 'Taken', email: 'taken1@example.com', password: 'secret123' })
    const res = await request(app).post('/api/auth/register').send({ username: 'Taken', email: 'taken2@example.com', password: 'secret123' })

    expect(res.status).toBe(409)
  })

  it('rejects a duplicate email', async () => {
    await request(app).post('/api/auth/register').send({ username: 'UserOne', email: 'shared@example.com', password: 'secret123' })
    const res = await request(app).post('/api/auth/register').send({ username: 'UserTwo', email: 'shared@example.com', password: 'secret123' })

    expect(res.status).toBe(409)
  })
})

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await request(app).post('/api/auth/register').send({ username: 'LoginUser', email: 'loginuser@example.com', password: 'secret123' })
  })

  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'LoginUser', password: 'secret123' })

    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
  })

  it('rejects an incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'LoginUser', password: 'wrongpassword' })

    expect(res.status).toBe(401)
  })

  it('rejects a username that does not exist', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'NoSuchUser', password: 'secret123' })

    expect(res.status).toBe(401)
  })
})

describe('POST /api/auth/forgot-password', () => {
  beforeEach(async () => {
    await request(app).post('/api/auth/register').send({ username: 'ForgotUser', email: 'forgotuser@example.com', password: 'secret123' })
  })

  it('returns a generic success message for a real email', async () => {
    const res = await request(app).post('/api/auth/forgot-password').send({ email: 'forgotuser@example.com' })
    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(/reset link/i)
  })

  it('returns the same generic message for an unknown email (no info leak)', async () => {
    const res = await request(app).post('/api/auth/forgot-password').send({ email: 'nobody@example.com' })
    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(/reset link/i)
  })
})

describe('POST /api/auth/reset-password', () => {
  it('rejects an invalid or expired token', async () => {
    const res = await request(app).post('/api/auth/reset-password').send({ token: 'not-a-real-token', password: 'newpassword123' })
    expect(res.status).toBe(400)
  })
})
