const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const logger = require('./commons/Logger');

const UserRoutes = require('./routes/UserRoutes');
const IntentRoutes = require('./routes/IntentRoutes');
const ChatbotRoutes = require('./routes/ChatbotRoutes');
const DatabaseRoutes = require('./routes/SettingRoutes');
const LineRoutes = require('./routes/LineRoutes');

const port = process.env.PORT || 3000;
const app = express();

require('dotenv').config();

console.log(`
Y88b   d88P          8G8    8G8      d8b 8G8           .d8888b.  8G88888b.  8G8      
 Y88b d88P           8U8    8U8      Y8P 8U8          d88P  Y88b 8U8   Y88b 8U8      
  Y88o88P            8A8    8A8          8A8          Y88b.      8A8    888 8A8      
   Y888P     8888b.  8I8888 8I8  888 888 8I8888        "Y888b.   8I8   d88P 8I8      
   d888b        "88b 8T8    8T8 .88P 888 8T8              "Y88b. 8T88888P"  8T8      
  d88888b   .d888888 8O8    8O8888K  888 8O8   888888       "888 8O8        8O8      
 d88P Y88b  888  888 Y88b.  888 "88b 888 Y88b.        Y88b  d88P 888        888      
d88P   Y88b "Y888888  "Y888 888  888 888  "Y888        "Y8888P"  888        8888888                                                                                  
`);

async function connectToDatabase() {
  await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/xatkit-spl-test');
}

connectToDatabase()
  .then(() => {
    logger.info('Connected to database');

    app.use(express.json());
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api/v1/users', UserRoutes)
    app.use('/api/v1/intents', IntentRoutes)
    app.use('/api/v1/chatbots', ChatbotRoutes)
    app.use('/api/v1/lines', LineRoutes)
    app.use('/api/v1/settings', DatabaseRoutes)

    app.get('/', (req, res) => {
      logger.info('GET /');
      res.status(200).sendFile(__dirname + '/views/home.html');
    })

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    })

  })
  .catch((error) => {
    logger.error(`Error connecting to database: ${error}`);
  });

module.exports = app;