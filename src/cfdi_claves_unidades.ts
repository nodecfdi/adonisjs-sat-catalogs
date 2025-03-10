import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CfdiClavesUnidades extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_claves_unidades';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public descripcion: string;

  @column()
  declare public notas: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;

  @column()
  declare public simbolo: string;
}
