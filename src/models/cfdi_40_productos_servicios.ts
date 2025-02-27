import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40ProductosServicios extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column()
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public ivaTrasladado: number;

  @column()
  declare public iepsTrasladado: number;

  @column()
  declare public complemento: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;

  @column()
  declare public estimuloFrontera: number;

  @column()
  declare public similares: string;
}
