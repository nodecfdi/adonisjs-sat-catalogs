import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp31DocumentosAduaneros extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_31_documentos_aduaneros';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
