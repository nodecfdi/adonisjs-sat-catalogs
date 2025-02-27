import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp30RegimenesAduaneros extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_30_regimenes_aduaneros';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public impoexpo: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
