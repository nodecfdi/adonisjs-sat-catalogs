import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class PagosTiposCadenaPago extends BaseModel {
  public static readonly connection = 'satcatalogs';

  @column()
  declare public id: string;

  @column()
  declare public texto: string;
}
