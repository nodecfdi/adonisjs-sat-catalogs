import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cce20TiposOperacion extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column()
  declare public id: string;

  @column()
  declare public texto: string;
}
