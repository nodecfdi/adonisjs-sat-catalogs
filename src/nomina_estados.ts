import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaEstados extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_estados';

  @column({ isPrimary: true })
  declare public estado: string;

  @column()
  declare public pais: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
