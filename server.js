const express = require('express');
const app = express();
require('dotenv').config();
const { ConnectDB } = require('./utils/ConnectDB')
const cors = require('cors');
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
const SignUpRoute = require('./routes/signup')
const LoginRoute = require('./routes/login')

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));


app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Welcome App</title>
      </head>
      <body>
        <h1>Welcome to the server</h1>
      </body>
    </html>
  `);
});


app.listen(PORT, () => {
  ConnectDB();
  console.log(`server is listing at ${PORT}`)
})

app.use('/signup', SignUpRoute)
app.use('/login', LoginRoute)

