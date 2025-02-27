import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40Localidades extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_40_localidades';

  @column({ isPrimary: true })
  declare public localidad: string;

  @column()
  declare public estado: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
