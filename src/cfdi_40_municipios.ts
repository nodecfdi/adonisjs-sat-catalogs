import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40Municipios extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_40_municipios';

  @column({ isPrimary: true })
  declare public municipio: string;

  @column()
  declare public estado: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
