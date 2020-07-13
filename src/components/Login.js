import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import loginService from '../services/login'
import Notification from './Notification'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [failNotification, setFail] = useState(null)
  const [toHome, setToHome] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setToHome(true)
      window.location.reload()
    }
    catch(error){
      setFail('Wrong user or password')
      setTimeout(() => {
        setFail(null)
    }, 3000);
    }
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow hover:shadow-xl flex flex-col container mx-auto py-3 mt-4 mb-5 bg-indigo-100">
      <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
      <h1 className="font-bold py-4 text-xl p2">Login</h1>
      {toHome ? <Redirect to="/"/> : null}
      <Notification message={failNotification} className={"bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2"}></Notification>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 pt-2"
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
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
