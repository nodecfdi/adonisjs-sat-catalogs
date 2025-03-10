import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CceColonias extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cce_colonias';

  @column({ isPrimary: true })
  declare public colonia: string;

  @column()
  declare public codigoPostal: string;

  @column()
  declare public asentamiento: string;
}
