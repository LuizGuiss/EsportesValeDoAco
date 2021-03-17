import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; //determinan as operações no DB
import quadraView from '../views/quadras_view';
import * as Yup from 'yup';  //biblioteca para validação dos dados
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

import Quadra from '../models/Quadra';

interface quadraProps {
  name: string,
  latitude: number,
  longitude: number,
  informations: string,
  opening_hours: string,
  sports: string,
  tel: string,
  value: string,
  open_on_weekends: boolean,
  images?: Array<{}>,
  accepted: boolean,
};

async function validateQuadraData(data: quadraProps) {
  // criando um schema/interface que nossos orfanatos deve ter
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
    })),
    accepted: Yup.boolean().required()
  });

  await schema.validate(data, {
    abortEarly: false, 
  });
}

  export default {
    async index(request: Request, response: Response) {
      const { accepted } = request.params;

      const quadrasRepository = getRepository(Quadra);

      const quadras = await quadrasRepository.find({
        where: { accepted: accepted === "true" },
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

      return response.status(200).json(quadraView.render(quadra));
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
        accepted: false,
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
        })),
        accepted: Yup.boolean().required()
      });

      await schema.validate(data, {
        abortEarly: false, //campos invalidos retornam o erro de forma automatica
      });

      const quadra = quadrasRepository.create(data);

      await quadrasRepository.save(quadra);

      return response.status(201).json(quadra);
    },

    async update(request: Request, response: Response) {
      const {
        name,
        latitude,
        longitude,
        informations,
        opening_hours,
        sports,
        tel,
        value,
        open_on_weekends,
      } = request.body;
      const { id } = request.params;

      const quadrasRepository = getRepository(Quadra);

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
        accepted: true,
      };

      await validateQuadraData(data);

      //const quadra = await quadrasRepository.findOne(id);

      await quadrasRepository.update(id, data);
      return response.status(200).send("quadra updated successfully");
    },

    async delete(request: Request, response: Response) {
      const { id } = request.params;
      const quadrasRepository = getRepository(Quadra);

      const quadra = await quadrasRepository.findOne(id, {
        relations: ['images']
      });

      if (!quadra) return response.status(404).send('quadra not found');

      quadra.images.map(image => {
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', image.path))
      });

      await quadrasRepository.delete(id);

      return response.status(200).send();
    },

    async acceptQuadraResponse(req: Request, res: Response) {
      const { id } = req.params
      const { adminResponse } = req.body

      const quadrasRepository = getRepository(Quadra)

      const quadra = await quadrasRepository.findOne({ id: parseInt(id) })

      if (!quadra) { return res.status(404).send("quadra not found") }

      if (adminResponse) {
        quadra.accepted = true
        await quadrasRepository.save(quadra)
        return res.status(200).send("quadra saved")
      } else {
        await quadrasRepository.delete({ id: parseInt(id) })
        return res.status(200).send("quadra removed")
      }

    }
  }