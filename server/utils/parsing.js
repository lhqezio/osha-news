/* eslint-disable no-console */
const fs = require('fs/promises');

const parseData = async () => {
  try {
    const dataPath = 'data/News_Category_Dataset_v3.json';
    const newDataPath = 'data/parsedData.json';
    const data = await fs.readFile(dataPath);
    const stringData = data.toString();

    const lines = stringData.split(/(\n|\r\n)/);

    const newContent = `[${lines.filter((line) => line.length > 1).join(',\n')}]`;

    fs.writeFile(newDataPath, newContent);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await parseData();
})();