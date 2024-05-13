const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let db = [
    { id: 1, title: "Why don't scientists trust atoms?", comedian: "They make up everything.", year: 2020 },
    { id: 2, title: "Parallel lines have so much in common...", comedian: "It's a shame they'll never meet.", year: 2019 }
];

// GET all jokes
app.get('/', (req, res) => {
    res.json(db);
});

// POST a new joke
app.post('/', (req, res) => {
    const { title, comedian, year } = req.body;
    const id = db.length + 1;
    const newJoke = { id, title, comedian, year };
    db.push(newJoke);
    res.json(db);
});

// PATCH a joke by ID
app.patch('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, comedian, year } = req.body;
    const jokeIndex = db.findIndex(joke => joke.id === id);
    if (jokeIndex !== -1) {
        db[jokeIndex] = { ...db[jokeIndex], title, comedian, year };
        res.json(db[jokeIndex]);
    } else {
        res.status(404).json({ error: "Joke not found" });
    }
});

// DELETE a joke by ID
app.delete('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const jokeIndex = db.findIndex(joke => joke.id === id);
    if (jokeIndex !== -1) {
        const deletedJoke = db.splice(jokeIndex, 1);
        res.json(deletedJoke[0]);
    } else {
        res.status(404).json({ error: "Joke not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
