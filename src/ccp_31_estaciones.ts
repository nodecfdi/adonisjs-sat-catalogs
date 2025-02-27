import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp31Estaciones extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_31_estaciones';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public claveTransporte: string;

  @column()
  declare public nacionalidad: string;

  @column()
  declare public designadorIata: string;

  @column()
  declare public lineaFerrea: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
