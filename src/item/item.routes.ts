import express from 'express';

import { ItemModel, Item } from './item.model'

export const ItemRoutes = express.Router()
  .get('/', async (req: express.Request, res: express.Response) => {
    return res.status(200).json({
      items: await Item.find()
    })
  })

  .get('/:id', async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id

    return res.status(200).json({
      item: await Item.findById(id)
    });
  });