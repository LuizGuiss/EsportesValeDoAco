import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';


import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/quadras-map.css';

interface Quadra {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
};

function QuadrasMap() {
  const [quadras, setQuadras] = useState<Quadra[]>([]);

  // executa a função ({}) quando alguma das variáveis
  // que estiver no [] ser alterada
  useEffect(() => {
    api.get('quadras').then(response => {
      setQuadras(response.data);
    });
  }, []);



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
        center={[-19.465635, -42.5411443]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {quadras.map(quadra => {
          return (
            <Marker
              icon={mapIcon}
              key={quadra.id}
              position={[quadra.latitude, quadra.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {quadra.name}
                <Link to={`/quadras/${quadra.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>


      <Link to="/quadras/create" className="create-quadra">
        <FiPlus size={32} color="#FFF" />
      </Link>

    </div>
  );
}

export default QuadrasMap;