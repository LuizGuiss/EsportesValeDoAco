import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { MapConsumer, MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stateProps } from '../../redux/store'
import { getQuadra, updateQuadra } from '../../redux/actions/quadrasActions'

import { FiPlus, FiX } from 'react-icons/fi'
//import AsideAdmin from '../../components/SidebarAdmin'
import mapIcon from '../../utils/mapIcon'

import '../../styles/pages/dashboards/quadraEdit.css';
import SidebarAdmin from '../../components/SidebarAdmin'
//import { LeafletMouseEvent } from 'leaflet'

interface ParamsProps {
  id: string;
}

interface imageProps {
  id: number;
  url: string;
}

function QuadraConfirm() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { id } = useParams<ParamsProps>();

  const { quadra } = useSelector((state: stateProps) => state.quadras);

  const [name, setName] = useState('');
  //const [about, setInformations] = useState('')
  //const [instructions, setSports] = useSsports('')
  const [opening_hours, setOpeningHours] = useState('');
  const [informations, setInformations] = useState('');
  const [sports, setSports] = useState('');
  const [tel, setTel] = useState('');
  const [value, setValue] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  const [latitude, setLatitude] = useState<number | null>();
  const [longitude, setLongitude] = useState<number | null>();

  // const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<imageProps[]>([]);

  useEffect(() => {
    dispatch(getQuadra(id))
  }, [id, dispatch])

  useEffect(() => {
    if (quadra.id) {
      setName(quadra.name)
      setInformations(quadra.informations)
      setSports(quadra.sports)
      setTel(quadra.tel)
      setValue(quadra.value)
      setOpeningHours(quadra.opening_hours)
      setOpenOnWeekends(quadra.open_on_weekends)
      setLatitude(quadra.latitude)
      setLongitude(quadra.longitude)
      setPreviewImages(quadra.images)

    }
  }, [quadra])

  function removeImageFromPreviewImages(id: number) {
    setPreviewImages(
      previewImages.filter(image => image.id !== id)
    )
  }

  function handleEditQuadra(e: FormEvent) {
    e.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('informations', informations);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('sports', sports);
    data.append('tel', tel);
    data.append('value', value);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    dispatch(updateQuadra(id, data, push))
  }

  function toggleOpenOnWeekends() {
    setOpenOnWeekends(!open_on_weekends)
  }

  function MinimapBounds() {
    const onClick = useCallback(
      (e) => {
        setLatitude(e.latlng.lat)
        setLongitude(e.latlng.lng)
      },
      [],
    )
    useMapEvent('click', onClick)

    return null
  }

  if (!quadra.id || !latitude || !longitude) {
    return <p>Loading...</p>
  }

  return (
    <div id="page-create-quadra">
      <SidebarAdmin />

      <main>
        <form onSubmit={handleEditQuadra} className="create-quadra-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-19.465635, -42.5411443]}
              style={{ width: '100%', height: 280 }}
              zoom={15}

            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <MinimapBounds />
              {latitude && longitude && (
                <Marker position={[latitude, longitude]} icon={mapIcon} />
              )}

              {/* <MapConsumer>
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
              </MapConsumer> */}
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

            {/* <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div> */}
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
  )
}

export default QuadraConfirm;