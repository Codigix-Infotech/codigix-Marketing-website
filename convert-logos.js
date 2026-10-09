const fs = require('fs');
const path = require('path');
const sharp = require('./backend/node_modules/sharp');

const frontendRoot = __dirname;
const publicDir = path.join(frontendRoot, 'public');
const publicClientsDir = path.join(publicDir, 'clients');
const publicUploadsClientsDir = path.join(publicDir, 'uploads', 'clients');
const backendUploadsClientsDir = path.join(frontendRoot, 'backend', 'uploads', 'clients');

[publicClientsDir, publicUploadsClientsDir, backendUploadsClientsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function convertToWebp(inputPath, outputNames, targetDirs) {
  if (!fs.existsSync(inputPath)) {
    console.error('File not found:', inputPath);
    return;
  }
  const buffer = await sharp(inputPath)
    .webp({ quality: 90, effort: 6 })
    .toBuffer();

  for (const dir of targetDirs) {
    for (const name of outputNames) {
      const outPath = path.join(dir, name.endsWith('.webp') ? name : name + '.webp');
      fs.writeFileSync(outPath, buffer);
      console.log('Saved:', outPath, '(' + buffer.length + ' bytes)');
    }
  }
}

async function run() {
  console.log('--- Converting Brand Logos ---');
  await convertToWebp(path.join(publicDir, 'logo.png'), ['logo.webp'], [publicDir]);
  await convertToWebp(path.join(publicDir, 'logo-mark.png'), ['logo-mark.webp'], [publicDir]);
  await convertToWebp(path.join(publicDir, 'App-icon.png'), ['App-icon.webp'], [publicDir]);

  console.log('--- Converting Client Logos ---');
  const clientMappings = [
    {
      source: path.join(frontendRoot, "sheetal's_glow.png"),
      fallbackSource: path.join(publicClientsDir, 'sheetals-glow.png'),
      names: ['sheetals-glow.webp', 'sheetals_glow.webp', 'sheetalsglow.webp']
    },
    {
      source: path.join(frontendRoot, 'simles_for_all.webp'),
      fallbackSource: path.join(publicClientsDir, 'smiles-for-all.webp'),
      names: ['smiles-for-all.webp', 'simles-for-all.webp', 'simles_for_all.webp', 'simlesforall.webp']
    },
    {
      source: path.join(frontendRoot, 'aayurlekha.png'),
      fallbackSource: path.join(publicClientsDir, 'aayurlekha.png'),
      names: ['aayurlekha.webp']
    },
    {
      source: path.join(frontendRoot, 'corplegal.png'),
      fallbackSource: path.join(publicClientsDir, 'corplegal.png'),
      names: ['corplegal.webp']
    },
    {
      source: path.join(frontendRoot, 'Dr_shagun_rao.webp'),
      fallbackSource: path.join(publicClientsDir, 'dr-shagun-rao.webp'),
      names: ['dr-shagun-rao.webp', 'dr_shagun_rao.webp', 'drshagunrao.webp']
    },
    {
      source: path.join(frontendRoot, 'Shriraj Clinic Logo PNG.png'),
      fallbackSource: path.join(publicClientsDir, 'shriraj-clinic.png'),
      names: ['shriraj-clinic.webp', 'shriraj-clinic-logo-png.webp']
    },
    {
      source: path.join(frontendRoot, 'Sanskruti agro farm logo.jpg.jpeg'),
      fallbackSource: path.join(publicClientsDir, 'sanskruti-agro-farm.jpg'),
      names: ['sanskruti-agro-farm.webp', 'sanskruti-agro-farm-logo.webp']
    },
    {
      source: path.join(frontendRoot, 'morya.png'),
      fallbackSource: path.join(publicClientsDir, 'morya.png'),
      names: ['morya.webp']
    },
    {
      source: path.join(frontendRoot, 'canopy.png'),
      fallbackSource: path.join(publicClientsDir, 'canopy.png'),
      names: ['canopy.webp']
    },
    {
      source: path.join(frontendRoot, 'kimya.webp'),
      fallbackSource: path.join(publicClientsDir, 'kimaya.webp'),
      names: ['kimaya.webp', 'kimya.webp']
    },
    {
      source: path.join(frontendRoot, 'bakul.png'),
      fallbackSource: path.join(publicClientsDir, 'bakul.png'),
      names: ['bakul.webp']
    },
    {
      source: path.join(frontendRoot, 'kitchen_canvas.jpg.jpeg'),
      fallbackSource: path.join(publicClientsDir, 'kitchen-canvas.jpg'),
      names: ['kitchen-canvas.webp', 'kitchen_canvas.webp', 'kitchencanvas.webp']
    },
    {
      source: path.join(frontendRoot, 'regain.png'),
      fallbackSource: path.join(publicClientsDir, 'regain.png'),
      names: ['regain.webp']
    },
    {
      source: path.join(frontendRoot, 'shushrut.png'),
      fallbackSource: path.join(publicClientsDir, 'shushrut.png'),
      names: ['shushrut.webp']
    },
    {
      source: path.join(frontendRoot, 'viranjany.webp'),
      fallbackSource: path.join(publicClientsDir, 'viranjany.webp'),
      names: ['viranjany.webp']
    }
  ];

  for (const client of clientMappings) {
    const src = fs.existsSync(client.source) ? client.source : client.fallbackSource;
    await convertToWebp(src, client.names, [publicClientsDir, publicUploadsClientsDir, backendUploadsClientsDir]);
  }

  console.log('--- ALL LOGOS CONVERTED TO WEBP SUCCESSFULLY ---');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
