import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaTiposNominas extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_tipos_nominas';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
