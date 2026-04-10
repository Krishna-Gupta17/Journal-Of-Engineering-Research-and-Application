import app from './app.js'

const port = process.env.PORT || 4000

app.get('/ping', (req, res) => {
  res.send('pong')
});

//listens to port for req 
app.listen(port, () => {
  setInterval(() => {
    fetch('https://jera-backend.onrender.com/ping')
      .then(() => console.log('Pinged self!'))
      .catch(() => console.log('Self ping failed.'));
  }, 1000 * 60 * 10);
});
