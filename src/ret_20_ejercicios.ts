import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ret20Ejercicios extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ret_20_ejercicios';

  @column({ isPrimary: true })
  declare public id: number;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
