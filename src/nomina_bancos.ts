import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaBancos extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_bancos';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public razonSocial: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
