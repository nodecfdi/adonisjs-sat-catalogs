import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp31AutorizacionesNaviero extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_31_autorizaciones_naviero';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
