const fs = require('fs');
const PNG = require('pngjs').PNG;
const jsQR = require('jsqr');

const data = JSON.parse(fs.readFileSync('../qr_data.json', 'utf8'));

let allOk = true;

for (const [name, imgStr] of Object.entries(data)) {
  if (imgStr.startsWith('http')) {
    console.log(`[SKIP] ${name} uses a web URL: ${imgStr}`);
    continue;
  }
  
  const base64Data = imgStr.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');
  
  const png = PNG.sync.read(buffer);
  
  const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  
  if (code) {
    console.log(`[OK] ${name} -> Decoded Data: "${code.data}"`);
  } else {
    console.log(`[ERROR] ${name} -> Failed to decode QR.`);
    allOk = false;
  }
}

if (allOk) {
  console.log('All QR codes decoded successfully!');
} else {
  console.log('Some QR codes failed to decode.');
}
