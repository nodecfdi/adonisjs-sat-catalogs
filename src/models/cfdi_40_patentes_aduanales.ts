import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40PatentesAduanales extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column()
  declare public id: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
