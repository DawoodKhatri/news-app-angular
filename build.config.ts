require('dotenv').config();
const fs = require('fs');

console.log('Building configuration...');

const envFilePathProd = './src/environments/environment.prod.ts';
const envFilePath = './src/environments/environment.ts';

const envContent = fs.readFileSync(envFilePathProd, { encoding: 'utf8' });

fs.writeFileSync(
  envFilePath,
  envContent
    .replace(/API_URL/g, process.env['API_URL'] || '')
    .replace(false, true)
);
