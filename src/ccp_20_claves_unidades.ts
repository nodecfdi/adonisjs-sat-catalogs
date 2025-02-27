import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp20ClavesUnidades extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_20_claves_unidades';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public descripcion: string;

  @column()
  declare public nota: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;

  @column()
  declare public simbolo: string;

  @column()
  declare public bandera: string;
}
