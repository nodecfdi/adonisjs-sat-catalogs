import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40Paises extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_40_paises';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public patronCodigoPostal: string;

  @column()
  declare public patronIdentidadTributaria: string;

  @column()
  declare public validacionIdentidadTributaria: string;

  @column()
  declare public agrupaciones: string;
}
