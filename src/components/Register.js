import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import registerService from '../services/register'
import Notification from './Notification'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [failNotification, setFail] = useState(null)
  const [toHome, setToHome] = useState(false)
  const [user, setUser] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const newUser = await registerService.register({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(newUser))

      setUser(newUser)
      setUsername('')
      setPassword('')
      setToHome(true)
      window.location.reload()
    } catch (error) {
      setFail("Username and password should be at least 4 characters long!")
      setTimeout(() => {
        setFail(null)
      }, 3000);
    }
  }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow hover:shadow-xl flex flex-col container mx-auto py-3 mt-4 mb-5 bg-indigo-100">
        <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleRegister}>
            <h1 className="font-bold py-4 text-xl">Register</h1>
            {toHome ? <Redirect to="/"/> : null}
            <Notification message={failNotification} className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded relative"}></Notification>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username  
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    )
}


export default Register