import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class CfdiPatentesAduanales extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_patentes_aduanales';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
