const fs = require('fs');

const content = fs.readFileSync('plenaria_qr_todos.html', 'utf8');
const regex = /<img src="([^"]+)" alt="QR ([^"]+)">/g;

const qrData = {};
let match;
while ((match = regex.exec(content)) !== null) {
  const qrUrl = match[1];
  const name = match[2];
  qrData[name] = qrUrl;
}

fs.writeFileSync('qr_data.json', JSON.stringify(qrData, null, 2));
console.log('Done!');
