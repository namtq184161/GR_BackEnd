const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const { readdirSync } = require('fs');

dotenv.config();

// Database
connectDB().catch((err) => console.log(err));
mongoose.connection.on(
  'error',
  console.error.bind(console, 'Connection error:')
);

async function connectDB() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log('Connected to the MongoDB Server');
}

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileupload({ useTempFiles: true }));

// Routes
readdirSync('./routes').map((route) =>
  app.use('/', require('./routes/' + route))
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
