import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40Colonias extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_40_colonias';

  @column({ isPrimary: true })
  declare public colonia: string;

  @column()
  declare public codigoPostal: string;

  @column()
  declare public texto: string;
}
