import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class NominaOrigenesRecursos extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'nomina_origenes_recursos';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
