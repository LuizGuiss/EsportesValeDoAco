import React, { FormEvent, useState, ChangeEvent } from "react";
import { MapContainer, Marker, TileLayer, MapConsumer } from 'react-leaflet';

import '../styles/pages/create-quadra.css';
import Sidebar from "../components/Sidebar";
import { FiPlus } from "react-icons/fi";
import mapIcon from "../utils/mapIcon";
import { LeafletMouseEvent } from 'leaflet';
import api from "../services/api";
import { useHistory } from "react-router-dom";


export default function CreateQuadra() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files){
      return;
    }
    
    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  const [name, setName] = useState('');
  const [informations, setInformations] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [sports, setSports] = useState('');
  const [tel, setTel] = useState('');
  const [value, setValue] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault(); //prevene o funcionamento padrão do usuário

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('informations', informations);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('opening_hours', opening_hours);
    data.append('sports', sports);
    data.append('tel', tel);
    data.append('value', value);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('quadras', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }

  return (
    <div id="page-create-quadra">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-quadra-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-19.465635, -42.5411443]}
              style={{ width: '100%', height: 280 }}
              zoom={15}

            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0
                ? <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
                : null}

              <MapConsumer>
                {(map) => {
                  map.on("click", function (e: LeafletMouseEvent) {
                    const { lat, lng } = e.latlng;
                    setPosition({
                      latitude: lat,
                      longitude: lng
                    });
                  });
                  return null;
                }}
              </MapConsumer>
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="informations">informações <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={informations}
                onChange={event => setInformations(event.target.value)}
              />
            </div>

            <div className="input-block"> 
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return(
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                
              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>

              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Quadra</legend>

            <div className="input-block">
              <label htmlFor="sports">Esportes</label>
              <textarea
                id="'sports'"
                value={sports}
                onChange={event => setSports(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="tel">Telefone para contato</label>
              <textarea
                id="tel"
                value={tel}
                onChange={event => setTel(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="value">Valor</label>
              <textarea 
                id="value"
                value={value}
                onChange={event => setValue(event.target.value)}   
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}   
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>
                  Sim
                </button>
                <button type="button" className={!open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)}>
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
