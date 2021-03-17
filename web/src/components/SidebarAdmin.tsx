import { useEffect, useState } from 'react'
import { FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/actions/usersActions'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import mapMarkerImg from '../images/map-marker.svg'

import '../styles/components/sidebarAdmin.css';

function SidebarAdmin() {
  const { push } = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const [registeredQuadrasPage, setRegisteredQuadrasPage] = useState(false)
  const [pendingQuadrasPage, setPendingQuadrasPage] = useState(false)

  useEffect(() => {
    if (path.split('/')[2] === "quadras-registered") {
      setRegisteredQuadrasPage(true)
      setPendingQuadrasPage(false)
    }

    if (path.split('/')[2] === "quadras-pending") {
      setPendingQuadrasPage(true)
      setRegisteredQuadrasPage(false)
    }
  }, [path])

  function handleGoToAppPage() {
    push('/app')
  }

  function handleLogoutUser() {
    dispatch(logoutUser())
  }

  return (
    <aside className="aside-container">
      <img src={mapMarkerImg} alt="Happy" title="Ir para mapa" onClick={handleGoToAppPage} style={{ cursor: 'pointer' }} />

      <div className="aside-admin-main-content">
        <Link to="/dashboard/quadras-registered" title="Quadras já registradas" className={registeredQuadrasPage ? "active-icon" : ""}>
          <FiMapPin size={24} color={registeredQuadrasPage ? "#0089A5" : "#fff"} />
        </Link>

        <Link to="/dashboard/quadras-pending" title="Quadras pendentes" className={pendingQuadrasPage ? "active-icon" : ""}>
          <FiAlertCircle size={24} color={pendingQuadrasPage ? "#0089A5" : "#fff"} />
        </Link>
      </div>

      <footer>
        <button type="button" title="Deslogar" onClick={handleLogoutUser}>
          <FiPower size={24} color="#aaa" />
        </button>
      </footer>
    </aside>
  )
}

export default SidebarAdmin;