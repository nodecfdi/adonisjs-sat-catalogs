import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40Monedas extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public decimales: number;

  @column()
  declare public porcentajeVariacion: number;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
