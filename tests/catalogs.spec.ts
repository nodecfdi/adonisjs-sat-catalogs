import { test } from '@japa/runner';
import Cfdi40Impuestos from '../src/cfdi_40_impuestos.js';
import { createConnection } from './_helpers/test_utils.js';

test.group('Catalogs', () => {
  test('only read', async ({ assert }) => {
    await createConnection();

    const usoCfdi = await Cfdi40Impuestos.firstOrFail();
    usoCfdi.id = 'Nuevo ID';

    await assert.rejects(async () => usoCfdi.save());
  });

  test('correct bindings orm', async ({ assert }) => {
    await createConnection();
    const cfdi40Impuestos = await Cfdi40Impuestos.all();

    assert.isArray(cfdi40Impuestos);
    assert.notEmpty(cfdi40Impuestos);
  });
});
