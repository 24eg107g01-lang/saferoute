import { useState } from "react"
import axios from "axios"
import "./Register.css"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/users/register`,
  {
    name: name,
    email: email,
    password: password
  }
);
      alert("Registration successful!")

      console.log(response.data)

      setName("")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error(error)
      alert("Registration failed!")
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Create Account</h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register
