import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cfdi40FormasPago extends BaseModel {
  public static readonly connection = 'satcatalogs';

  public static readonly table = 'cfdi_40_formas_pago';

  @column({ isPrimary: true })
  declare public id: string;

  @column()
  declare public texto: string;

  @column()
  declare public esBancarizado: number | '';

  @column()
  declare public requiereNumeroOperacion: number | '';

  @column()
  declare public permiteBancoOrdenanteRfc: number | '';

  @column()
  declare public permiteCuentaOrdenante: number | '';

  @column()
  declare public patronCuentaOrdenante: string;

  @column()
  declare public permiteBancoBeneficiarioRfc: number | '';

  @column()
  declare public permiteCuentaBeneficiario: number | '';

  @column()
  declare public patronCuentaBeneficiario: string;

  @column()
  declare public permiteTipoCadenaPago: number | '';

  @column()
  declare public requiereBancoOrdenanteNombreExt: number | '';

  @column()
  declare public vigenciaDesde: string;

  @column()
  declare public vigenciaHasta: string;
}
