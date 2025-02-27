import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ret20Paises extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ret_20_paises';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
