import express from 'express';

import { ItemModel, Item } from './item.model';

export const ItemRoutes = express.Router()
  .get('/', async (req: express.Request, res: express.Response) => {
    const items: Array<ItemModel> = await Item.find();
    return res.status(200).json({ items });
  })

  .get('/:id', async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    const item: ItemModel | null = await Item.findById(id);

    return res.status(200).json({ item });
  });