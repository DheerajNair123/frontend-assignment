import React, { useState, useEffect } from 'react'
import API from '../utils/api'
import { clearToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({title: '', description: ''})
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchTasks = async () => {
    try{
      const res = await API.get('/api/v1/tasks')
      setTasks(res.data)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{ fetchTasks() }, [])

  const onChange = e => setForm({...form, [e.target.name]: e.target.value})

  const createTask = async (e) => {
    e.preventDefault()
    try{
      await API.post('/api/v1/tasks', form)
      setForm({title: '', description: ''})
      fetchTasks()
    }catch(err){ setError('Could not create task') }
  }

  const updateTask = async (id) => {
    const title = prompt('New title')
    if (!title) return
    try{
      await API.put(`/api/v1/tasks/${id}`, { title })
      fetchTasks()
    }catch(err){ setError('Could not update task') }
  }

  const deleteTask = async (id) => {
    if (!confirm('Delete this task?')) return
    try{
      await API.delete(`/api/v1/tasks/${id}`)
      fetchTasks()
    }catch(err){ setError('Could not delete task') }
  }

  const logout = () => { clearToken(); navigate('/login') }

  return (
    <div className="container">
      <header className="row">
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <section className="card">
        <h3>Create Task</h3>
        <form onSubmit={createTask}>
          <input name="title" placeholder="Title" value={form.title} onChange={onChange} required />
          <input name="description" placeholder="Description" value={form.description} onChange={onChange} />
          <button type="submit">Create</button>
          {error && <p className="error">{error}</p>}
        </form>
      </section>

      <section className="card">
        <h3>Your Tasks</h3>
        {tasks.length === 0 ? <p>No tasks</p> : (
          <ul>
            {tasks.map(t => (
              <li key={t._id} className="task">
                <strong>{t.title}</strong>
                <p>{t.description}</p>
                <small>{t.status}</small>
                <div className="actions">
                  <button onClick={()=>updateTask(t._id)}>Edit</button>
                  <button onClick={()=>deleteTask(t._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
