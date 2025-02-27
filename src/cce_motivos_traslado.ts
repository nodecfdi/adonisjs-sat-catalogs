import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CceMotivosTraslado extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cce_motivos_traslado';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
