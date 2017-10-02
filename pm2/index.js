const Express = require('express');

const App = Express();

App.get('/', (req, res) => {
  res.send('Hello');
});

App.listen(8000, () => {
  console.log('Listening on 8000');
  process.send('ready');
});
