import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiDollarSign } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/quadra.css';
import api from "../services/api";

interface Quadra {
  latitude: number;
  longitude: number;
  name: string;
  informations: string;
  opening_hours: string;
  sports: string;
  tel: string;
  value: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
};

interface QuadraParams {
  id: string;
}


export default function Orphanage() {
  const params = useParams<QuadraParams>();
  const [quadra, setQuadra] = useState<Quadra>();
  // para selecionar a imagem que está ativa
  const [activeImageIndex, setActiveImageIndex] = useState(0);


  // executa a função ({}) quando alguma das variáveis
  // que estiver no [] ser alterada
  useEffect(() => {
    api.get(`quadras/${params.id}`).then(response => {
      setQuadra(response.data);
    });
  }, [params.id]);
  //params.id é importante estar no array
  //pq ele permique que busquem uma chamada no api para buscar novos dados

  if (!quadra) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={quadra.images[activeImageIndex].url} alt={quadra.name} />

          <div className="images">
            {quadra.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  // seleciona a imagem que está ativada, selecionada
                  onClick={() => {
                    setActiveImageIndex(index)
                  }}
                  >
                  <img src={image.url} alt={quadra.name} />
                </button>
              )
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{quadra.name}</h1>
            <p>{quadra.informations}</p>

            <div className="map-container">
              <MapContainer
                center={[quadra.latitude, quadra.longitude]}
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
                <Marker interactive={false} icon={mapIcon} position={[quadra.latitude, quadra.longitude]} />
              </MapContainer>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${quadra.latitude},${quadra.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para jogar</h2>
            <p>{quadra.informations}.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Todos os dias <br />
                {quadra.opening_hours}
              </div>
              {quadra.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                  </div>
                )}
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                {quadra.sports}
              </div>
              <div className="open-on-weekends">
                <FiDollarSign size={32} color="#39CC83" />
                {quadra.value}
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