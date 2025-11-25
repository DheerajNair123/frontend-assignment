import React, { useState } from 'react'
import API from '../utils/api'
import { saveToken } from '../utils/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Register(){
  const [form, setForm] = useState({name: '', email: '', password: ''})
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = e => setForm({...form, [e.target.name]: e.target.value})

  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await API.post('/api/v1/auth/register', form)
      saveToken(res.data.token)
      navigate('/dashboard')
    } catch(err){
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={onSubmit} className="card">
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} type="email" required />
        <input name="password" placeholder="Password" value={form.password} onChange={onChange} type="password" required />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}
