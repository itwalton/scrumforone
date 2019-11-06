import Item from './item.model'

export default class ItemRepository {
  async findItems(): Promise<Array<Item>> {
    return [
      new Item()
    ]
  }

  async findItemById(): Promise<Item> {
    return new Item()
  }
}