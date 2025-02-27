import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaTiposOtrosPagos extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_tipos_otros_pagos';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
