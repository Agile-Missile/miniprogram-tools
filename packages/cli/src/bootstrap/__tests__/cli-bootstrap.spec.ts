import { join } from 'node:path';
import { getDirname } from '@armit/file-utility';
import { runScript } from '../../../tests/run-script.js';

async function runCliMock(...args: string[]) {
  const program = join(getDirname(import.meta.url), 'cli-boot.ts');
  return runScript(program, args);
}

describe('@flatjs/cli bootstrap', () => {
  const curDirName = getDirname(import.meta.url);

  const program = join(curDirName, 'cli-boot.ts');

  it('Should output correct `version` -v', async () => {
    const { stdout } = await runCliMock(program, '-h');
    expect(stdout).toStrictEqual(
      expect.stringContaining(`Usage: cli-boot.ts <command> [options]`)
    );

    expect(stdout).toStrictEqual(expect.stringContaining(`Commands:`));
    expect(stdout).toStrictEqual(expect.stringContaining(`cli-boot.ts mini`));
    expect(stdout).toStrictEqual(expect.stringContaining(`Globals:`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-h, --help`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-v, --version`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-l, --log-level`));
    expect(stdout).toStrictEqual(
      expect.stringContaining(
        'Copyright 2024 @mini (​https://github.com/Agile-Missile/agilejs​)'
      )
    );
  });
});
