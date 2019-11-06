import express from 'express';
import mongoose from 'mongoose';

import ItemRepository from './item.repository'

export default (mongooseConn: mongoose.Mongoose) => {
  const schema: mongoose.Schema = new mongoose.Schema({ title: String });
  const Item: mongoose.Model<mongoose.Document> = mongoose.model('Item', schema);

  return express.Router()
    .get('/', async (req: express.Request, res: express.Response) => {
      return res.status(200).json({
        items: await Item.find({})
      })
    })

    .get('/:id', async (req: express.Request, res: express.Response) => {
      const id: string = req.params.id

      return res.status(200).json({
        item: await Item.find({ id })
      })
    })
};