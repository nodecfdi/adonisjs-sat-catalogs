import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CceTiposOperacion extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cce_tipos_operacion';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
