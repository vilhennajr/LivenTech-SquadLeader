import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AddressesController from '../controllers/AddressesController';

const addressesRouter = Router();
const addressesController = new AddressesController();

addressesRouter.get('/', addressesController.index);

addressesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  addressesController.show,
);

addressesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      district: Joi.string().required(),
      zipcode: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
    },
  }),
  addressesController.create,
);

addressesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      district: Joi.string().required(),
      zipcode: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  addressesController.update,
);

addressesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  addressesController.delete,
);

export default addressesRouter;
