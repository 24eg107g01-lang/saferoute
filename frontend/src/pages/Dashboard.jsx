import { useNavigate } from "react-router-dom"
import "../pages/Dashboard.css"

function Dashboard() {
  const navigate = useNavigate()

  // Logout
  const handleLogout = () => {
    navigate("/login")
  }

  // SOS
  const handleSOS = () => {
    const confirmSOS = window.confirm(
      "SOS Emergency\n\nAre you sure you want to activate emergency mode?"
    )

    if (!confirmSOS) {
      return
    }

    if (!navigator.geolocation) {
      alert("Location is not supported by your browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        alert(
          `SOS activated!\n\nYour current location:\nLatitude: ${latitude}\nLongitude: ${longitude}`
        )

        window.location.href =
          `https://www.google.com/maps?q=${latitude},${longitude}`
      },
      (error) => {
        if (error.code === 1) {
          alert(
            "Location permission was denied.\n\nPlease allow location access in your browser and try again."
          )
        } else if (error.code === 2) {
          alert("Your location could not be determined.")
        } else if (error.code === 3) {
          alert("Location request timed out.")
        } else {
          alert("Unable to get your location.")
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  // Find Hospitals
  const handleFindHospitals = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by your browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const hospitalsUrl =
          `https://www.google.com/maps/search/hospitals/` +
          `@${latitude},${longitude},14z`

        window.location.href = hospitalsUrl
      },
      (error) => {
        if (error.code === 1) {
          alert("Location permission was denied.")
        } else if (error.code === 2) {
          alert("Your location could not be determined.")
        } else if (error.code === 3) {
          alert("Location request timed out.")
        } else {
          alert("Unable to get your location.")
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  // Plan Route
  const handlePlanRoute = () => {
    const destination = window.prompt(
      "Enter your destination:"
    )

    if (!destination || destination.trim() === "") {
      return
    }

    if (!navigator.geolocation) {
      alert("Location is not supported by your browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const mapsUrl =
          `https://www.google.com/maps/dir/?api=1` +
          `&origin=${latitude},${longitude}` +
          `&destination=${encodeURIComponent(destination)}`

        window.location.href = mapsUrl
      },
      (error) => {
        if (error.code === 1) {
          alert("Location permission was denied.")
        } else if (error.code === 2) {
          alert("Your location could not be determined.")
        } else if (error.code === 3) {
          alert("Location request timed out.")
        } else {
          alert("Unable to get your location.")
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  // Find Police
  const handleFindPolice = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by your browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const policeUrl =
          `https://www.google.com/maps/search/police+stations/` +
          `@${latitude},${longitude},14z`

        window.location.href = policeUrl
      },
      (error) => {
        if (error.code === 1) {
          alert("Location permission was denied.")
        } else if (error.code === 2) {
          alert("Your location could not be determined.")
        } else if (error.code === 3) {
          alert("Location request timed out.")
        } else {
          alert("Unable to get your location.")
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">

        <h1>SafeRoute</h1>

        <button
          className="logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>

      {/* Welcome */}
      <div className="welcome">

        <h2>Welcome to SafeRoute</h2>

        <p>
          Your smart route and emergency assistance platform
        </p>

      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">

        {/* Plan Route */}
        <div className="dashboard-card">

          <h3>Plan Route</h3>

          <p>
            Enter your destination and get directions
            from your current location.
          </p>

          <button onClick={handlePlanRoute}>
            Plan Route
          </button>

        </div>

        {/* Emergency Contacts */}
        <div className="dashboard-card">

          <h3>Emergency Contacts</h3>

          <p>
            Manage your registered emergency contacts.
          </p>

          <button
            onClick={() => navigate("/emergency-contacts")}
          >
            View Contacts
          </button>

        </div>

        {/* SOS */}
        <div className="dashboard-card sos-card">

          <h3>SOS Emergency</h3>

          <p>
            Send an emergency alert and share your location.
          </p>

          <button onClick={handleSOS}>
            SOS
          </button>

        </div>

        {/* Hospitals */}
        <div className="dashboard-card">

          <h3>Nearby Hospitals</h3>

          <p>
            Find hospitals near your current location.
          </p>

          <button onClick={handleFindHospitals}>
            Find Hospitals
          </button>

        </div>

        {/* Police */}
        <div className="dashboard-card">

          <h3>Nearby Police Stations</h3>

          <p>
            Find nearby police stations.
          </p>

          <button onClick={handleFindPolice}>
            Find Police
          </button>

        </div>

        {/* Profile */}
        <div className="dashboard-card">

          <h3>My Profile</h3>

          <p>
            View and manage your profile information.
          </p>

          <button
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>

        </div>

      </div>

    </div>
  )
}

export default Dashboard