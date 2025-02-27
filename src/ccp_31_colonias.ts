import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Ccp31Colonias extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column({ isPrimary: true })
  declare public colonia: string;

  @column()
  declare public codigoPostal: string;

  @column()
  declare public texto: string;
}
