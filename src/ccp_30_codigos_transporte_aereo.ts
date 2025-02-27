import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp30CodigosTransporteAereo extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_30_codigos_transporte_aereo';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public nacionalidad: string;

  @column()
  declare public texto: string;

  @column()
  declare public designadorOaci: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
