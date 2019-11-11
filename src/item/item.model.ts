import { Document, Schema, Model, model } from 'mongoose';

interface Iitem {
  title?: string;
}

export interface ItemModel extends Iitem, Document { };

export const ItemSchema: Schema = new Schema({
  _id: String,
  title: String
}, { _id: false });

export const Item: Model<ItemModel> = model<ItemModel>("Item", ItemSchema);