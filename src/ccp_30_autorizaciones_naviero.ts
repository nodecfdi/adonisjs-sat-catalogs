import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp30AutorizacionesNaviero extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
