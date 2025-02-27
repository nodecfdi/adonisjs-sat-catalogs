import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaTiposIncapacidades extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_tipos_incapacidades';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
