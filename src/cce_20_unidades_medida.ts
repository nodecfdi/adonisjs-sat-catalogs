import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cce20UnidadesMedida extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cce_20_unidades_medida';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
