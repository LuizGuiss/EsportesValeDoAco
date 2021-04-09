import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';


import mapIcon from '../utils/mapIcon';
//import api from '../services/api';

import '../styles/pages/quadras-map.css';
import { stateProps } from '../redux/store';
import { getQuadras } from '../redux/actions/quadrasActions';

// interface Quadra {
//   id: number;
//   latitude: number;
//   longitude: number;
//   name: string;
// };

function QuadrasMap() {
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState<number | null>()
  const [longitude, setLongitude] = useState<number | null>()

  const { authenticated } = useSelector((state: stateProps) => state.user)
  const { quadras } = useSelector((state: stateProps) => state.quadras)

  useEffect(() => {
    dispatch(getQuadras(true))
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setLatitude(pos.coords.latitude)
      setLongitude(pos.coords.longitude)
    })
  }, [])

  if (!latitude || !longitude) {
    return <p>loading...</p>
  }

  return (
    <div id="page-map">
      <aside>
        <header>
          {/* <img src={mapMarkerImg} alt="Happy" /> */}

          <h2>Escolha uma quadra no mapa</h2>
          <p>Praticar esportes é saudável!</p>
        </header>

        <footer>
          <strong>Ipatinga</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {quadras.map((quadra) => (
          <Marker
            key={quadra.id}
            position={[quadra.latitude, quadra.longitude]}
            icon={mapIcon}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {quadra.name}
              <Link to={`/quadras/${quadra.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>

          </Marker>
        ))}

      </MapContainer>

      {/* <div id="label">
        <p className="label">
          <strong>Sugerir Quadra</strong>
        </p>
      </div> */}
      <Link to="/quadras/create" title="Sugerir quadra" className="create-quadra">
        <FiPlus size={32} color="#fff" />
      </Link>


      {authenticated &&
        <Link to="/dashboard/quadras-registered" className="dashboard">
          Dashboard
        </Link>
      }
    </div>


  )
}

export default QuadrasMap;