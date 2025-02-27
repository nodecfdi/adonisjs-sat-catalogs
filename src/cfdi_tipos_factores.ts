import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CfdiTiposFactores extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_tipos_factores';

  @column({ isPrimary: true })
  declare public id: string;
}
