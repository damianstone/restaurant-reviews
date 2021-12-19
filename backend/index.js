import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import RestaurantsDAO from './dao/restaurantsDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';

dotenv.config();
const MongoClient = mongodb.MongoClient; // access to the mongo client

const port = process.env.PORT || 8000; // access to .env file port

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50, // only 50 people can connect at the time
  wtimeoutMS: 2500, // after 2500 seconds the request will timeout
  useNewUrlParser: true, //
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    //initial referente to the restaurant collection in the db
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
