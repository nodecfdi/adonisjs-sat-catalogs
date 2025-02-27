import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cce20Colonias extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cce_20_colonias';

  @column({ isPrimary: true })
  declare public colonia: string;

  @column()
  declare public codigoPostal: string;

  @column()
  declare public asentamiento: string;
}
