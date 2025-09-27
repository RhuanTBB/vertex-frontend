import api from './api'

// --- Types ---
export type LoginPayload = {
  email: string
  password: string
  'password-confirmation'?: string
}

export type LoginResponse = {
  access_token: string
  token_type?: string
  expires_in?: number
  [k: string]: unknown
}

export type WhoamiResponse = {
  id: number
  name?: string
  email?: string
  [k: string]: unknown
}

export type Company = {
  id: number
  representative_id?: number
  corporate_name?: string
  trade_name?: string
  company_type?: string
  cnpj?: string
  country?: string
  state?: string
  city?: string
  postal_code?: string
  full_address?: string
  address_number?: string
  address_complement?: string
  business_phone?: string
  corporate_email?: string
  website?: string
  company_description?: string
  [k: string]: unknown
}

export type CompanyCreate = Partial<Omit<Company, 'id'>>
export type CompanyUpdate = Partial<Omit<Company, 'id'>>

export type Address = {
  id: number
  company_id?: number
  country?: string
  state?: string
  city?: string
  postal_code?: string
  full_address?: string
  address_number?: string
  address_complement?: string
  [k: string]: unknown
}

// --- Helpers ---
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    // delete the header in a safe way
    ;(api.defaults.headers.common as Record<string, unknown>)[
      'Authorization'
    ] = undefined
  }
}

export function clearAuthToken() {
  setAuthToken(null)
}

// --- Auth endpoints ---
export async function login(payload: LoginPayload) {
  const res = await api.post<LoginResponse>('/v1/login', payload)
  return res.data
}

export async function logout() {
  const res = await api.post('/v1/logout')
  return res.data
}

export async function whoami() {
  const res = await api.get<WhoamiResponse>('/v1/whoiam')
  return res.data
}

// --- Companies ---
export async function listCompanies() {
  const res = await api.get<Company[]>('/v1/companies')
  return res.data
}

export async function showCompany(id: number) {
  const res = await api.get<Company>(`/v1/companies/${id}`)
  return res.data
}

export async function createCompany(payload: CompanyCreate) {
  const res = await api.post<Company>('/v1/companies', payload)
  return res.data
}

export async function updateCompany(id: number, payload: CompanyUpdate) {
  const res = await api.patch<Company>(`/v1/companies/${id}`, payload)
  return res.data
}

// --- Company addresses (postman had /v1/company/addresses/:companyId/:page?) ---
export async function listCompanyAddresses(
  companyId: number,
  page = 1,
  perPage = 10
) {
  const res = await api.get<Address[]>(`/v1/company/addresses/${companyId}/${page}`, {
    params: { per_page: perPage },
  })
  return res.data
}

export default {
  // helpers
  setAuthToken,
  clearAuthToken,
  // auth
  login,
  logout,
  whoami,
  // companies
  listCompanies,
  showCompany,
  createCompany,
  updateCompany,
  // addresses
  listCompanyAddresses,
}
