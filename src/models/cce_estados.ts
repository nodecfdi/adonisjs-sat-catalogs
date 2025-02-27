import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CceEstados extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column()
  declare public estado: string;

  @column()
  declare public pais: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
