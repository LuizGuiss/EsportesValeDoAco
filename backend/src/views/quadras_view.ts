import Quadra from '../models/Quadra';
import imagesView from './images_view';

//não retorno as imagens porque não faz sentido retornar as imagens
export default {
  render(quadra: Quadra) {
    return {
      id: quadra.id,
      name: quadra.name,
      latitude: quadra.latitude,
      longitude: quadra.longitude,
      informations: quadra.informations,
      opening_hours: quadra.opening_hours,
      sports: quadra.sports,
      tel: quadra.tel,
      value: quadra.value,
      open_on_weekends: quadra.open_on_weekends,
      images: imagesView.renderMany(quadra.images)
    };
  },

  renderMany(quadras: Quadra[]) {
    return quadras.map(quadra => this.render(quadra));
  }
}