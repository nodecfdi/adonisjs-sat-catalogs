import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40CodigosPostales extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public estado: string;

  @column()
  declare public municipio: string;

  @column()
  declare public localidad: string;

  @column()
  declare public estimuloFrontera: number;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;

  @column()
  declare public husoDescripcion: string;

  @column()
  declare public husoVeranoMesInicio: string;

  @column()
  declare public husoVeranoDiaInicio: string;

  @column()
  declare public husoVeranoHoraInicio: string;

  @column()
  declare public husoVeranoDiferencia: string;

  @column()
  declare public husoInviernoMesInicio: string;

  @column()
  declare public husoInviernoDiaInicio: string;

  @column()
  declare public husoInviernoHoraInicio: string;

  @column()
  declare public husoInviernoDiferencia: string;
}
