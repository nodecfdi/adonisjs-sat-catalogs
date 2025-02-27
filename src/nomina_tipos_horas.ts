import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaTiposHoras extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_tipos_horas';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
