import config from '../config';

import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';

import start from './server';
import { Item } from './item/item.model';

describe('App Integration Tests', () => {
  let app: express.Application, mongooseConn: mongoose.Mongoose

  before(async () => {
    app = await start()
    mongooseConn = await mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  })

  beforeEach(async () => {
    await Item.deleteMany({})
  })

  describe('/v1/items/', () => {
    describe('GET /', () => {
      it('lists all items', async () => {
        await Item.create({ _id: '1', title: 'Foo Item' })
        await Item.create({ _id: '2', title: 'Bar Item' })

        return request(app)
          .get('/v1/items/')
          .expect('Content-Type', /json/)
          .expect(200, {
            items: [
              { _id: '1', title: 'Foo Item' },
              { _id: '2', title: 'Bar Item' },
            ]
          })
      })
    })

    describe('GET /:id', () => {
      it('finds item by id', async () => {
        await Item.create({ _id: '1', title: 'Foo Item' })

        return request(app)
          .get('/v1/items/1')
          .expect('Content-Type', /json/)
          .expect(200, {
            item: { _id: '1', title: 'Foo Item' }
          })
      })

      it('returns 404 when no item exists at id', async () => {
        return request(app)
          .get('/v1/items/1')
          .expect(404)
      })
    })

    describe('POST /', () => {
      it('creates an item', async () => {
        const result = await request(app)
          .post('/v1/items/')
          .send({
            title: 'Foo Item'
          })
          .expect(200)

        expect(result.body.item._id).to.exist;
        expect(result.body.item.title).to.eq('Foo Item');
        const item = await Item.findOne({ title: 'Foo Item' });
        expect(item).to.have.property('title').to.eq('Foo Item');
      })

      it('returns 400 when no title is provided', async () => {
        return request(app)
          .post('/v1/items/')
          .send({})
          .expect(400)
      })
    })

    describe('PUT /:id', () => {
      it('updates an item title', async () => {
        await Item.create({ _id: '1', title: 'Foo Item' });

        const result = await request(app)
          .put('/v1/items/1')
          .send({
            title: 'Bar Item'
          })
          .expect(200)

        expect(result.body.item._id).to.eq('1');
        expect(result.body.item.title).to.eq('Bar Item');
        const item = await Item.findOne({ _id: '1' });
        expect(item).to.have.property('title').to.eq('Bar Item');
      })

      it('returns 400 when no title is provided', async () => {
        return request(app)
          .put('/v1/items/1')
          .send({})
          .expect(400)
      })

      it('returns 400 when no item exists with id', async () => {
        return request(app)
          .put('/v1/items/1')
          .send({ title: 'Foo Item' })
          .expect(400)
      })
    })

    describe('DELETE /:id', () => {
      it('deletes an item', async () => {
        await Item.create({ _id: '1', title: 'Foo Item' })

        return request(app)
          .delete('/v1/items/1')
          .expect(200)
      })

      it('returns 400 when no item exists with id', async () => {
        return request(app)
          .delete('/v1/items/1')
          .expect(400)
      })
    })
  })
});