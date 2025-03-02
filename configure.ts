import type Configure from '@adonisjs/core/commands/configure';

export const configure = async function (command: Configure): Promise<void> {
  const codemods = await command.createCodemods();

  await codemods.updateRcFile((rcFile) => {
    rcFile.addCommand('@nodecfdi/adonisjs-sat-catalogs/commands');
  });
};
