const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../config.env') });

const directoryPath = path.join(__dirname, '../cache');
const timeBeforeExpire = Number(process.env.TIME_BEFORE_EXPIRE);

exports.getPokemon = async (req, res, next) => {
  try {
    const pokemonName = req.params.id.toLowerCase();
    const time = Date.now();

    // Ensure cache directory exists
    if (!fs.existsSync(directoryPath)) {
      // Create directory if it doesn't exist
      fs.mkdirSync(directoryPath);
    }

    // Read all files name from 'cache' directory
    const filesName = fs.readdirSync(directoryPath);

    // If there is a folder name with the requested pokemon name
    if (filesName.includes(pokemonName)) {
      const dataPath = path.join(directoryPath, pokemonName, 'data.txt');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

      // If data was too old
      if (time - data.time >= timeBeforeExpire) {
        // Remove folder name
        fs.rmSync(path.join(directoryPath, pokemonName), {
          recursive: true,
          force: true,
        });

        const message = 'Refetching as the data was too old';
        console.log(message);

        // Below will refetch data from API, and save it do 'cache'
        return await saveDataLocally(res, next, pokemonName, time, message);
      }

      return res.status(200).json({
        status: 'success',
        source: 'Local',
        data,
      });
    } else {
      return await saveDataLocally(res, next, pokemonName, time);
    }
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    return res
      .status(500)
      .json({ status: 'failure', message: 'Internal Server Error' });
  }
};

async function saveDataLocally(res, next, pokemonName, time, message = 'none') {
  try {
    // Fetch data from API
    const data = await getPokemonByNameOrId(pokemonName, time);

    // If user enterd pokemon name incorrectly
    if (data.status === 'not found') {
      return res.status(404).json({ status: 'failure', data: 'not found' });
    }

    // Create a folder
    const folderPath = path.join(directoryPath, pokemonName);
    fs.mkdirSync(folderPath);

    // Create a file in that folder and write to it.
    const dataPath = path.join(folderPath, 'data.txt');
    fs.writeFileSync(dataPath, JSON.stringify(data));
    console.log('Data saved locally');

    if (message !== 'none') {
      return res.status(200).json({
        status: 'success',
        message,
        source: 'API',
        data,
      });
    } else {
      return res.status(200).json({
        status: 'success',
        source: 'API',
        data,
      });
    }
  } catch (error) {
    console.error('Error saving Pokemon data:', error);

    return res
      .status(500)
      .json({ status: 'failure', message: 'Internal Server Error' });
  }
}

async function getPokemonByNameOrId(name, time) {
  try {
    const url = `${process.env.URL}/${name}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Pokemon not found: ${name}`);
      return { status: 'not found' };
    }

    const data = await res.json();

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      time,
    };
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return { status: 'not found' };
  }
}
