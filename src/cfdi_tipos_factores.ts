import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CfdiTiposFactores extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column({ isPrimary: true })
  declare public id: string;
}
