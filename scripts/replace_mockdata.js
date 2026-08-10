const fs = require('fs');

const htmlContent = fs.readFileSync('plenaria_qr_todos.html', 'utf8');
const jsxContent = fs.readFileSync('plenaria-app/src/PlenariaProyectos.jsx', 'utf8');

const regex = /<span class="tag"[^>]*>([^<]+)<\/span>\s*<div class="qr-frame"><img src="([^"]+)"[^>]*><\/div>\s*<div class="name">([^<]+)<\/div>\s*<div class="project">([^<]+)<\/div>/g;

let mockData = "const mockData = [\n";
let match;
let id = 1;

while ((match = regex.exec(htmlContent)) !== null) {
  const tag = match[1];
  const qrUrl = match[2];
  const studentName = match[3];
  const projectName = match[4];

  let categoryId = 0;
  if (tag === '6to') categoryId = 1;
  if (tag === '9no') categoryId = 2;

  mockData += `  { id: ${id}, studentName: "${studentName}", projectName: "${projectName}", categoryId: ${categoryId}, qrUrl: "${qrUrl}" },\n`;
  id++;
}
mockData += "];";

const newJsxContent = jsxContent.replace(/const mockData = \[[\s\S]*?\];/, mockData);

fs.writeFileSync('plenaria-app/src/PlenariaProyectos.jsx', newJsxContent);
console.log('Update Complete!');
