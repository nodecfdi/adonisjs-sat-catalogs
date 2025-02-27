import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp30ConfiguracionesAutotransporte extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column()
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public numeroDeEjes: number;

  @column()
  declare public numeroDeLlantas: number;

  @column()
  declare public remolque: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
