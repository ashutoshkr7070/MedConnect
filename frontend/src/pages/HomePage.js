import React, { useEffect } from 'react'
const axios = require('axios')

export default function HomePage() {

  // Login user data
  const getUserData = async() => {
    try {
      const res = await axios.post('/api/v1/user/getUserData', {}, {
        headers: {
          Authorization : "Bearer " + localStorage.getItem('token'),
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <h1>home page</h1>
    </div>
  )
}
