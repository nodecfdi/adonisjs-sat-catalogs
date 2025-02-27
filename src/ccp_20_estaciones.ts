import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp20Estaciones extends BaseModel {
  public static readonly connection = 'satcatalogs';

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
