import React, { useEffect } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getQuadras } from '../../redux/actions/quadrasActions'
import { stateProps } from '../../redux/store'
import { CLEAR_QUADRA } from '../../redux/types'

import SidebarAdmin from '../../components/SidebarAdmin'
import mapIcon from '../../utils/mapIcon'

function QuadrasPending() {

  const { push } = useHistory();
  const dispatch = useDispatch();

  const { quadras } = useSelector((state: stateProps) => state.quadras)

  useEffect(() => {
    dispatch(getQuadras(false))
    dispatch({ type: CLEAR_QUADRA })
  }, [dispatch])

  function handleGoToAcceptOrDeclineQuadraPage(id: number) {
    push(`/dashboard/quadras-pending/${id}`)
  }

  return (
    <div id="dashboard-container">
      <SidebarAdmin />

      <main>
        <div className="dashboard-main-container">
          <header>
            <h1>Cadastrados Pendentes</h1>

            <span>{quadras.length} Quadras</span>
          </header>

          <hr />

          <div className="quadras-wrapper">
            {quadras.map(quadra => (
              <div key={quadra.id} className="quadra-container">
                <MapContainer
                  center={[quadra.latitude, quadra.longitude]}
                  zoom={16}
                  style={{ width: '100%', height: 200 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                  <Marker interactive={false} icon={mapIcon} position={[quadra.latitude, quadra.longitude]} />
                </MapContainer>

                <div className="quadra-footer">
                  <h2>{quadra.name}</h2>

                  <button onClick={() => handleGoToAcceptOrDeclineQuadraPage(quadra.id)}>
                    <FiArrowRight size={16} color="#15C3D6" />
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default QuadrasPending;