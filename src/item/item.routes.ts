import nuid from 'nuid';

import express from 'express';
import { isNull, isUndefined } from 'lodash/fp';

import { ItemModel, Item } from './item.model';

export const ItemRoutes = express.Router()
  .get('/', async (req: express.Request, res: express.Response) => {
    const items: Array<ItemModel> = await Item.find({}, { __v: 0 });
    return res.json({ items });
  })

  .post('/', async (req: express.Request, res: express.Response) => {
    const title: string = req.body.title;
    if (isUndefined(title)) return res.status(400).send();

    const item = await Item.create({ _id: nuid.next(), title });
    return res.json({ item });
  })

  .get('/:id', async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    const item: ItemModel | null = await Item.findById(id, { __v: 0 });
    if (isNull(item)) return res.status(404).send();

    return res.json({ item });
  })

  .put('/:id', async (req: express.Request, res: express.Response) => {
    const _id: string = req.params.id;
    if (isUndefined(_id)) return res.status(400).send();

    const item: ItemModel | null = await Item.findById(_id);
    if (isNull(item)) return res.status(400).send();

    const title: string = req.body.title;
    if (isUndefined(title)) return res.status(400).send();

    await Item.updateOne({ _id }, { title });
    return res.json({ item: await Item.findOne({ _id }) });
  })

  .delete('/:id', async (req: express.Request, res: express.Response) => {
    const _id: string = req.params.id;
    if (isUndefined(_id)) return res.status(400).send();

    const item: ItemModel | null = await Item.findById(_id);
    if (isNull(item)) return res.status(400).send();

    await Item.deleteOne({ _id });
    return res.send();
  });