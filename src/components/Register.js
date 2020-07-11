import React from 'react'

const Register = () => {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow hover:shadow-xl flex flex-col container mx-auto py-3 mt-4 mb-5 bg-indigo-100">
        <form class="rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="font-bold py-4 text-xl">Register</h1>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    )
}


export default Register