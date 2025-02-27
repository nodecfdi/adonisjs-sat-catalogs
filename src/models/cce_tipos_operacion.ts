import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CceTiposOperacion extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column()
  declare public id: string;

  @column()
  declare public texto: string;
}
