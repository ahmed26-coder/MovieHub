const fs = require('fs');
const path = require('path');

const API_KEY = '902448fc43a38ed08a67a10ce457b573';
const BASE_URL = 'https://api.themoviedb.org/3';

const dataDir = path.join(__dirname, '..', 'public', 'data');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

async function fetchJSON(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function fetchAndSave(filename, endpoint) {
  try {
    console.log(`Fetching ${filename}...`);
    const data = await fetchJSON(endpoint);
    const filePath = path.join(dataDir, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✓ Saved ${filename}.json`);
  } catch (error) {
    console.error(`✗ Error fetching ${filename}:`, error.message);
  }
}

async function main() {
  console.log('Starting data fetch...\n');

  // Fetch genres
  await fetchAndSave('genres', '/genre/movie/list?include_adult=false');

  // Fetch trending movies
  await fetchAndSave('trending', '/trending/movie/week?include_adult=false');

  // Fetch popular movies
  await fetchAndSave('popular', '/movie/popular?include_adult=false&page=1');

  // Fetch top rated movies
  await fetchAndSave('top-rated', '/movie/top_rated?include_adult=false&page=1');

  // Fetch upcoming movies
  await fetchAndSave('upcoming', '/movie/upcoming?include_adult=false&page=1');

  // Fetch featured movie (first from popular)
  try {
    console.log('Fetching featured movie...');
    const popular = await fetchJSON('/movie/popular?include_adult=false&page=1');
    const featured = popular.results?.[0] || null;
    const filePath = path.join(dataDir, 'featured.json');
    fs.writeFileSync(filePath, JSON.stringify(featured, null, 2));
    console.log('✓ Saved featured.json');
  } catch (error) {
    console.error('✗ Error fetching featured movie:', error.message);
  }

  // Fetch movie IDs for static generation (first 50 popular movies)
  try {
    console.log('Fetching movie IDs for static generation...');
    const popular = await fetchJSON('/movie/popular?include_adult=false&page=1');
    const movieIds = (popular.results || []).slice(0, 50).map((m) => m.id.toString());
    const filePath = path.join(dataDir, 'movie-ids.json');
    fs.writeFileSync(filePath, JSON.stringify(movieIds, null, 2));
    console.log('✓ Saved movie-ids.json');
  } catch (error) {
    console.error('✗ Error fetching movie IDs:', error.message);
  }

  console.log('\n✓ Data fetch complete!');
}

main().catch(console.error);
