import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp31Colonias extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'ccp_31_colonias';

  @column({ isPrimary: true })
  declare public colonia: string;

  @column()
  declare public codigoPostal: string;

  @column()
  declare public texto: string;
}
