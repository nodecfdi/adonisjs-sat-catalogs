import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaTiposContratos extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_tipos_contratos';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
