import React, { useEffect, useState } from "react";
//import {  } from "react-icons/fa";
import { FiClock, FiInfo, FiDollarSign, FiXCircle, FiCheck } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useHistory, useParams } from 'react-router-dom';

import SidebarAdmin from "../../components/SidebarAdmin";
import mapIcon from "../../utils/mapIcon";

import '../../styles/pages/dashboards/quadraPending.css';
import { useDispatch, useSelector } from "react-redux";
import { stateProps } from "../../redux/store";
import { getQuadra, quadraPendingResponse } from "../../redux/actions/quadrasActions";

interface QuadraParams {
  id: string;
}

interface ParamsProps {
  id: string;
}

function QuadraConfirm() {
  const params = useParams<QuadraParams>();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { id } = useParams<ParamsProps>();

  const { quadra } = useSelector((state: stateProps) => state.quadras)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    dispatch(getQuadra(params.id))
  }, [params.id, dispatch])

  function handleAdminResponseToQuadraPending(adminResponse: boolean) {
    dispatch(quadraPendingResponse(id, adminResponse, push))
  }


  if (!quadra.id || (!quadra.latitude && !quadra.longitude)) {
    return <p>Loading...</p>
  }


  return (
    <div id="page-quadra">
      <SidebarAdmin />

      <main>
        <div className="quadra-details">
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

          <div className="quadra-details-content">
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
            <p>Telefone para contato: {quadra.tel}</p>

            <div className="open-details">
              {/* <div className="open-on-weekeds">
                  <FiInfo size={32} color="#39CC83" />
                  {quadra.informations}
                </div> */}
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
              {/* <div className="open-on-weekends">
                  <FiPhone size={32} color="#39CC83" />
                  {quadra.tel}
                </div> */}
            </div>

            <div className="quadra-pending-buttons">
              <button className="button-decline-quadra" onClick={() => handleAdminResponseToQuadraPending(false)}>
                <FiXCircle size={20} color="#fff" style={{ marginRight: "10px" }} />
                  Recusar
              </button>
              <button className="button-accept-quadra" onClick={() => handleAdminResponseToQuadraPending(true)}>
                <FiCheck size={20} color="#fff" style={{ marginRight: "10px" }} />
                  Aceitar
             </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuadraConfirm;