import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp30AutorizacionesNaviero extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_30_autorizaciones_naviero';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
