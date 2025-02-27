import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CfdiTiposRelaciones extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_tipos_relaciones';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
