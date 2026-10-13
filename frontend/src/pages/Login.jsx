import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/users/login`,
  {
    email: email,
    password: password
  }
);

      console.log("LOGIN RESPONSE:", response.data)

      const token = response.data.token

      if (!token) {
        alert("Login succeeded, but no login token was received.")
        return
      }

      // Save login information
      localStorage.setItem(
        "accessToken",
        token
      )

      localStorage.setItem(
        "userName",
        response.data.name || ""
      )

      localStorage.setItem(
        "userEmail",
        response.data.email || email
      )

      // Verify that the token was actually saved
      const savedToken =
        localStorage.getItem("accessToken")

      if (!savedToken) {
        alert("Could not save your login session.")
        return
      }

      alert("Login successful!")

      navigate("/dashboard")

    } catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      )

      if (error.response?.status === 401) {

        alert("Invalid email or password.")

      } else {

        alert(
          "Login failed. Please make sure the backend is running."
        )
      }
    }
  }

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>SafeRoute Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}

          <a href="/register">
            Register
          </a>

        </p>

      </div>

    </div>
  )
}

export default Login