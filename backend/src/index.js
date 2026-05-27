const config = require('./config');
const app = require('./app');
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`code.arr API running on port ${PORT}`);
});
