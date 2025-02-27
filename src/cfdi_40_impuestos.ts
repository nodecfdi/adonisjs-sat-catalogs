import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40Impuestos extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public retencion: number;

  @column()
  declare public traslado: number | '';

  @column()
  declare public ambito: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
