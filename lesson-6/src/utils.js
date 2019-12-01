const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const newsFile = path.join(__dirname, './data/news.json');

const updateNewsFile = async (data) => {
  await writeFileAsync(newsFile, JSON.stringify(data, null, 2));
};

const readNewsFile = async () => {
  const data = await readFileAsync(newsFile, 'utf-8');
  return JSON.parse(data);
};

module.exports = { updateNewsFile, readNewsFile };
