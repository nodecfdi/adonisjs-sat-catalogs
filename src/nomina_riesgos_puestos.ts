import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaRiesgosPuestos extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_riesgos_puestos';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
