const express = require('express');
const guestsRouter = require('./routes/guests');
const app = express();

app.use(express.json());
app.use('/guests', guestsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
