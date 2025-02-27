import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40Aduanas extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_40_aduanas';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
