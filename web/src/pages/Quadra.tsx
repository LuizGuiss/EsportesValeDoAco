import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiArrowLeft, FiPower, FiDollarSign } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useHistory } from 'react-router-dom';
import L from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/quadra.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function Orphanage() {
  const { goBack } = useHistory();

  return (
    <div id="page-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

      <main>
        <div className="orphanage-details">
          <img src="https://lh3.googleusercontent.com/proxy/Se9Giu1wjROAH41AnwBXSvBf0AtZIu-nHaL9-KBQ4Exa-M1sH9_sare2vX7hz9U6tnr9JssL69bACn-B5A-WWmlPupyh-YaQJyKmW6vyW004c5I5o74D0WSzzHhOvgoHFgHRveDcJheYbIsJmg3oxv4Iz0zSiIPP-afgv6UoCwcQpuYVhzUHXMFjJkXYzg" alt="Lar das meninas" />

          <div className="images">
            <button className="active" type="button">
              <img src="https://lh3.googleusercontent.com/proxy/Se9Giu1wjROAH41AnwBXSvBf0AtZIu-nHaL9-KBQ4Exa-M1sH9_sare2vX7hz9U6tnr9JssL69bACn-B5A-WWmlPupyh-YaQJyKmW6vyW004c5I5o74D0WSzzHhOvgoHFgHRveDcJheYbIsJmg3oxv4Iz0zSiIPP-afgv6UoCwcQpuYVhzUHXMFjJkXYzg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://lh3.googleusercontent.com/proxy/Se9Giu1wjROAH41AnwBXSvBf0AtZIu-nHaL9-KBQ4Exa-M1sH9_sare2vX7hz9U6tnr9JssL69bACn-B5A-WWmlPupyh-YaQJyKmW6vyW004c5I5o74D0WSzzHhOvgoHFgHRveDcJheYbIsJmg3oxv4Iz0zSiIPP-afgv6UoCwcQpuYVhzUHXMFjJkXYzg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://lh3.googleusercontent.com/proxy/Se9Giu1wjROAH41AnwBXSvBf0AtZIu-nHaL9-KBQ4Exa-M1sH9_sare2vX7hz9U6tnr9JssL69bACn-B5A-WWmlPupyh-YaQJyKmW6vyW004c5I5o74D0WSzzHhOvgoHFgHRveDcJheYbIsJmg3oxv4Iz0zSiIPP-afgv6UoCwcQpuYVhzUHXMFjJkXYzg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://lh3.googleusercontent.com/proxy/Se9Giu1wjROAH41AnwBXSvBf0AtZIu-nHaL9-KBQ4Exa-M1sH9_sare2vX7hz9U6tnr9JssL69bACn-B5A-WWmlPupyh-YaQJyKmW6vyW004c5I5o74D0WSzzHhOvgoHFgHRveDcJheYbIsJmg3oxv4Iz0zSiIPP-afgv6UoCwcQpuYVhzUHXMFjJkXYzg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://lh3.googleusercontent.com/proxy/Se9Giu1wjROAH41AnwBXSvBf0AtZIu-nHaL9-KBQ4Exa-M1sH9_sare2vX7hz9U6tnr9JssL69bACn-B5A-WWmlPupyh-YaQJyKmW6vyW004c5I5o74D0WSzzHhOvgoHFgHRveDcJheYbIsJmg3oxv4Iz0zSiIPP-afgv6UoCwcQpuYVhzUHXMFjJkXYzg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://lh3.googleusercontent.com/proxy/Se9Giu1wjROAH41AnwBXSvBf0AtZIu-nHaL9-KBQ4Exa-M1sH9_sare2vX7hz9U6tnr9JssL69bACn-B5A-WWmlPupyh-YaQJyKmW6vyW004c5I5o74D0WSzzHhOvgoHFgHRveDcJheYbIsJmg3oxv4Iz0zSiIPP-afgv6UoCwcQpuYVhzUHXMFjJkXYzg" alt="Lar das meninas" />
            </button>
          </div>

          <div className="orphanage-details-content">
            <h1>Medalha de ouro</h1>
            <p>Funciona todos os dias da semana.</p>

            <div className="map-container">
              <MapContainer
                center={[-19.4635001, -42.5440843]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[-19.4635001, -42.5440843]} />
              </MapContainer>

              <footer>
                <a href="">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para jogar</h2>
            <p>Venha como seu material esportivo.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Todos os dias <br />
                6h às 10h <br />
                18h às 23h
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Futstal <br />
                Vôlei <br />
                Handbal <br />
                Basquete
              </div>
              <div className="open-on-weekends">
                <FiDollarSign size={32} color="#39CC83" />
                R$60,00/hora
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}