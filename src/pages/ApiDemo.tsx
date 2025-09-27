import { useEffect, useState } from 'react'
import api from '../lib/api'

type PingResponse = {
  message?: string
  [key: string]: unknown
}

export default function ApiDemo() {
  const [data, setData] = useState<PingResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchPing = async () => {
      try {
        const res = await api.get<PingResponse>('/ping')
        if (mounted) setData(res.data)
      } catch (err) {
        if (!mounted) return
        const message = err instanceof Error ? err.message : String(err)
        setError(message)
      }
    }

    fetchPing()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div style={{ padding: 16 }}>
      <h2>API Demo</h2>
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
      <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
    </div>
  )
}
