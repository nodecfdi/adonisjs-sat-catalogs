import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class PagosTiposCadenaPago extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'pagos_tipos_cadena_pago';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;
}
