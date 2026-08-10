const fs = require('fs');

const data = JSON.parse(fs.readFileSync('qr_data.json', 'utf8'));
const comp = fs.readFileSync('plenaria-app/src/PlenariaProyectos.jsx', 'utf8');

let newComp = comp;

for (const [name, img] of Object.entries(data)) {
  const nameSafe = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const regex = new RegExp('{ id: ([0-9]+), studentName: "' + nameSafe + '", projectName: "([^"]+)", categoryId: ([0-9]+), qrUrl: "[^"]+" }', 'g');
  newComp = newComp.replace(regex, '{ id: $1, studentName: "' + name + '", projectName: "$2", categoryId: $3, qrUrl: "' + img + '" }');
}

fs.writeFileSync('plenaria-app/src/PlenariaProyectos.jsx', newComp);
console.log('Update Complete!');
