import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stateProps } from '../../redux/store'
import { getQuadras } from '../../redux/actions/quadrasActions'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { CLEAR_QUADRA } from '../../redux/types'

import SidebarAdmin from '../../components/SidebarAdmin'
import Sidebar from '../../components/Sidebar'
import mapIcon from '../../utils/mapIcon'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

import '../../styles/pages/dashboards/quadrasRegistered.css';

function QuadrasRegistered() {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const { quadras } = useSelector((state: stateProps) => state.quadras)

  useEffect(() => {
    dispatch(getQuadras(true))
    dispatch({ type: CLEAR_QUADRA })
  }, [dispatch])

  function handleEditQuadra(id: number) {
    push(`/dashboard/quadras-registered/edit/${id}`)
  }

  function handleDeleteQuadra(id: number) {
    push(`/dashboard/quadras-registered/delete/${id}`)
  }

  return (
    <div id="dashboard-container">
      <SidebarAdmin />

      <main>
        <div className="dashboard-main-container">
          <header>
            <h1>Quadras Cadastradas</h1>

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

                  <div className="quadra-options">
                    <button onClick={() => handleEditQuadra(quadra.id)}>
                      <FiEdit size={16} color="#15C3D6" />
                    </button>
                    <button onClick={() => handleDeleteQuadra(quadra.id)}>
                      <FiTrash2 size={16} color="#15C3D6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default QuadrasRegistered