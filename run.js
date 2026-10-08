import fs from 'node:fs';
import { spawn } from 'node:child_process';

// Load variables from .env.production, .env.local, or .env if present
const envFiles = ['.env.production', '.env.local', '.env'];
for (const file of envFiles) {
  if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const match = trimmed.match(/^([A-Za-z0-9_]+)\s*=\s*(.*)$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
      }
    }
  }
}

const port = process.env.PORT || '3000';
const mode = process.argv[2] === 'dev' ? 'dev' : 'start';

console.log(`[Next.js] Starting in ${mode} mode on port ${port} (from .env)`);

const nextBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(nextBin, ['next', mode, '-p', String(port)], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
