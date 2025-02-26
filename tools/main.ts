import process from 'node:process';
import { HelpCommand, Kernel, ListLoader } from '@adonisjs/ace';
import SatCatalogsMakerCommand from './commands/sat_catalogs_maker_command.js';

const kernel = Kernel.create();
kernel.addLoader(new ListLoader([HelpCommand, SatCatalogsMakerCommand]));

kernel.defineFlag('help', {
  type: 'boolean',
  alias: 'h',
  description: 'Display help for the given command. When no command is given display help for the list command',
});

kernel.on('help', async (command, _kernel, options: { args: string[] }) => {
  options.args.unshift(command.commandName);
  await new HelpCommand(_kernel, options, kernel.ui, kernel.prompt).exec();

  return true;
});

kernel.info.set('binary', 'node ace');

await kernel.handle(process.argv.slice(2));
