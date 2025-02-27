import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40TiposFactores extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_40_tipos_factores';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
