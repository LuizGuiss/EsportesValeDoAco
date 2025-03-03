import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteQuadra, getQuadra } from '../../redux/actions/quadrasActions'
import { stateProps } from '../../redux/store';

import sorryMarker from '../../images/sorry-marker.svg'
import xbutton from '../../images/x-button.svg'
import '../../styles/pages/dashboards/quadraDelete.css'; 

interface paramsProps {
  id: string
}

function DeleteQuadra() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { id } = useParams<paramsProps>();

  const { quadra } = useSelector((state: stateProps) => state.quadras)

  useEffect(() => {
    dispatch(getQuadra(id))
  })

  function handleGoToDashboard() {
    dispatch(deleteQuadra(id, push))
  }

  if (!quadra.id) {
    return <p>loading...</p>
  }

  return (
    <main id="page-landing-delete" >
      <div className="delete-page-wrapper">
        <div className="delete-quadra-info">
          <h2>Excluir!</h2>
          <p>Você deseja excluir {quadra.name}?</p>

          <button onClick={handleGoToDashboard}>
            Deletar
          </button>
        </div>

        <img src={xbutton} alt="delete icon" />

      </div>
    </main>
  )
}

<div>Icons made by <a href="https://www.flaticon.com/authors/alfredo-hernandez" title="Alfredo Hernandez">Alfredo Hernandez</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default DeleteQuadra