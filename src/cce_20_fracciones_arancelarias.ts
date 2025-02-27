import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cce20FraccionesArancelarias extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cce_20_fracciones_arancelarias';

  @column({ isPrimary: true })
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
