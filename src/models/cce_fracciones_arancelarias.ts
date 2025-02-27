import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CceFraccionesArancelarias extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column()
  declare public fraccion: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;

  @column()
  declare public unidad: string;
}
