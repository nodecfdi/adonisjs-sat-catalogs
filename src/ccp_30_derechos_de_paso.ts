import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp30DerechosDePaso extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_30_derechos_de_paso';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public entre: string;

  @column()
  declare public hasta: string;

  @column()
  declare public otorgaRecibe: string;

  @column()
  declare public concesionario: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
