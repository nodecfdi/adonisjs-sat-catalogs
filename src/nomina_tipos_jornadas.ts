import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaTiposJornadas extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_tipos_jornadas';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
