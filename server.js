import express from 'express';
import { MeiliSearch } from 'meilisearch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
	const searchValue = req.query.search;
	const client = new MeiliSearch({
		host: process.env.YOUR_PROJECT_URL,
		apiKey: process.env.YOUR_SEARCH_API_KEY,
	});
	const index = client.index('books');
	const searchResults = !!searchValue && (await index.search(searchValue));

	res.render('index', {
		books: searchResults ? searchResults.hits : [],
		searchValue,
	});
});
app.listen(PORT, () => {
	console.log(`listening at http://localhost:${PORT}`);
});
