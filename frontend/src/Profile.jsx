import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Profile.css"

function Profile() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  useEffect(() => {

    const token = localStorage.getItem("accessToken")
    const name = localStorage.getItem("userName")
    const email = localStorage.getItem("userEmail")

    if (!token) {
      alert("Please login first.")
      navigate("/login")
      return
    }

    setUser({
      name: name || "SafeRoute User",
      email: email || "Email not available"
    })

  }, [navigate])

  const handleLogout = () => {

    localStorage.removeItem("accessToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")

    navigate("/login")
  }

  if (!user) {
    return (
      <div className="profile-page">

        <div className="profile-box">

          <h1>Loading Profile...</h1>

        </div>

      </div>
    )
  }

  return (
    <div className="profile-page">

      <div className="profile-box">

        <h1>My Profile</h1>

        <div className="profile-info">

          <div className="profile-item">
            <h3>Name</h3>
            <p>{user.name}</p>
          </div>

          <div className="profile-item">
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>

          <div className="profile-item">
            <h3>Account</h3>
            <p>SafeRoute User Account</p>
          </div>

        </div>

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  )
}

export default Profile