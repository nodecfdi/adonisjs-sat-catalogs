import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40NumerosPedimentoAduana extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_40_numeros_pedimento_aduana';

  @column()
  declare public aduana: string;

  @column()
  declare public patente: string;

  @column()
  declare public ejercicio: number;

  @column()
  declare public cantidad: number;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
