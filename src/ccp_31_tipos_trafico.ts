import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp31TiposTrafico extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_31_tipos_trafico';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
