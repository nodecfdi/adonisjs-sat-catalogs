import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CfdiRegimenesFiscales extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_regimenes_fiscales';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public aplicaFisica: number | '';

  @column()
  declare public aplicaMoral: number | '';

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
