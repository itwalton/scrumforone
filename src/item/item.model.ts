import { Document, Schema, Model, model } from 'mongoose';

interface Iitem {
  title?: string;
}

export interface ItemModel extends Iitem, Document { };

export var ItemSchema: Schema = new Schema({
  title: String
});

export const Item: Model<ItemModel> = model<ItemModel>("Item", ItemSchema);