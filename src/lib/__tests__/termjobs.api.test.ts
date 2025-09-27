import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import api from '../api'
import * as tj from '../termjobs.api'

let mock: MockAdapter

beforeEach(() => {
  mock = new MockAdapter(api)
})

afterEach(() => {
  mock.restore()
})

describe('termjobs api', () => {
  it('login should return token and setAuthToken should set header', async () => {
    const payload = { email: 'test@example.com', password: 'password' }
    const response = { access_token: 'abc123' }
    mock.onPost('/v1/login').reply(200, response)

    const res = await tj.login(payload)
    expect(res).toEqual(response)

    tj.setAuthToken(res.access_token)
    expect(api.defaults.headers.common.Authorization).toBe(`Bearer ${res.access_token}`)
  })

  it('whoami should fetch current user', async () => {
    const who = { id: 1, name: 'Alice', email: 'a@x.com' }
    mock.onGet('/v1/whoiam').reply(200, who)
    const res = await tj.whoami()
    expect(res).toEqual(who)
  })

  it('listCompanies returns array', async () => {
    const list = [{ id: 1, corporate_name: 'X' }]
    mock.onGet('/v1/companies').reply(200, list)
    const res = await tj.listCompanies()
    expect(res).toEqual(list)
  })
})
