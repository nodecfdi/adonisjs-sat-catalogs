import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp20Colonias extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_20_colonias';

  @column({ isPrimary: true })
  declare public colonia: string;

  @column()
  declare public codigoPostal: string;

  @column()
  declare public texto: string;
}
