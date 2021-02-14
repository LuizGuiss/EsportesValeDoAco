import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import quadraView from '../views/quadras_view';
import * as Yup from 'yup';

import Quadra from '../models/Quadra';

export default {
  async index(request: Request, response: Response) {
    const quadrasRepository = getRepository(Quadra);

    const quadras = await quadrasRepository.find({
      relations: ['images']
    });

    return response.json(quadraView.renderMany(quadras));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const quadrasRepository = getRepository(Quadra);

    const quadra = await quadrasRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(quadraView.render(quadra));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      informations,
      opening_hours,
      sports,
      tel,
      value,
      open_on_weekends
    } = request.body;

    const quadrasRepository = getRepository(Quadra);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      name,
      latitude,
      longitude,
      informations,
      opening_hours,
      sports,
      tel,
      value,
      open_on_weekends: open_on_weekends === 'true',
      images,
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      informations: Yup.string().required().max(300),
      opening_hours: Yup.string().required(),
      sports: Yup.string().required(),
      tel: Yup.string().required(),
      value: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    });

    await schema.validate(data, {
      abortEarly: false, //campos invalidos retornam o erro de forma automatica
    });

    const quadra = quadrasRepository.create(data);

    await quadrasRepository.save(quadra);

    return response.status(201).json(quadra);
  }
};