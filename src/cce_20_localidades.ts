import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cce20Localidades extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cce_20_localidades';

  @column({ isPrimary: true })
  declare public localidad: string;

  @column()
  declare public estado: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
