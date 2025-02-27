import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp31MaterialesPeligrosos extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_31_materiales_peligrosos';

  @column()
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public claseODiv: string;

  @column()
  declare public peligroSecundario: string;

  @column()
  declare public nombreTecnico: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
