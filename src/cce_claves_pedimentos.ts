import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CceClavesPedimentos extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cce_claves_pedimentos';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
