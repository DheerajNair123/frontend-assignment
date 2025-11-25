import React, { useState } from 'react'
import API from '../utils/api'
import { saveToken } from '../utils/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({email: '', password: ''})
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = e => setForm({...form, [e.target.name]: e.target.value})

  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await API.post('/api/v1/auth/login', form)
      saveToken(res.data.token)
      navigate('/dashboard')
    } catch(err){
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="card">
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} type="email" required />
        <input name="password" placeholder="Password" value={form.password} onChange={onChange} type="password" required />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  )
}
