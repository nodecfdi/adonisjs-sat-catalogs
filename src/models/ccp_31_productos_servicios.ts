import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp31ProductosServicios extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column()
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public similares: string;

  @column()
  declare public materialPeligroso: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
