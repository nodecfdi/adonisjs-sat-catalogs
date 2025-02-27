import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp20TiposCarro extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_20_tipos_carro';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public contenedor: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
