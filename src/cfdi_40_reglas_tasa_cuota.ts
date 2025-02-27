import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40ReglasTasaCuota extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_40_reglas_tasa_cuota';

  @column()
  declare public tipo: string;

  @column()
  declare public minimo: string;

  @column()
  declare public valor: string;

  @column()
  declare public impuesto: string;

  @column()
  declare public factor: string;

  @column()
  declare public traslado: number | '';

  @column()
  declare public retencion: number | '';

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
