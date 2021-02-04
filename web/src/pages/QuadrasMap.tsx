import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/quadras-map.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

function QuadrasMap() {
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

        <Marker
          icon={mapIcon}
          position={[-19.4635001, -42.5440843]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Medalha de ouro
            <Link to="/quadras/1">
              <FiArrowRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      </MapContainer>


      <Link to="/quadras/create" className="create-quadra">
        <FiPlus size={32} color="#FFF" />
      </Link>

    </div>
  );
}

export default QuadrasMap;