import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp30TiposMateria extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_30_tipos_materia';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
