import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp30PartesTransporte extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_30_partes_transporte';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
