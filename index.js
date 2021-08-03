const express = require('express');
const Routes = require('./Route/routes');
const app = express();

app.use(express.json());
app.use(Routes);

const PORT = 3000;

app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Rodando na porta ${PORT}`); });