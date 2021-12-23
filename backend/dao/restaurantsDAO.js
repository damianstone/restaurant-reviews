// data access object for the restaurants collection
// DAO => to adapts the data access to the client interface
import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

let restaurants; // references to our db

export default class RestaurantsDAO {
  // FIRST METHOD
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      // in sample_restaurants (in mongodb) go to restaurants instead of neighborhoods
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection('restaurants');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle for restaurants: ${e}`
      );
      process.exit(1);
    }
  }

  // GET ALL THE RESTAURANTS
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ('name' in filters) {
        query = { $text: { $search: filters['name'] } };
      } else if ('cuisine' in filters) {
        query = { 'cuisine': { $eq: filters['cuisine'] } };
      } else if ('zipcode' in filters) {
        query = { 'address.zipcode': { $eq: filters['zipcode'] } };
      }
    }
    // if no filters, get all the restaurants
    let cursor;
    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`Unable to issue find command: ${e}`);
      return {
        restaurantsList: [],
        totalRestaurants: 0,
      };
    }
    // limit the result
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    // get the total number of restaurants
    try {
      const restaurantsList = await displayCursor.toArray();
      const totalRestaurants = await restaurants.countDocuments(query);
      return {
        restaurantsList,
        totalRestaurants,
      };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents: ${e}`
      );
      return {
        restaurantsList: [],
        totalRestaurants: 0,
      };
    }
  }
  
  // GET RESTAURANT BY ID
  static async getRestaurantByID(id) {
    try {
      const pipeline = [ // pipeline -> match different collections together 
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'reviews',
            let: {
              id: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$restaurant_id', '$$id'],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviews: '$reviews',
          },
        },
      ];
      return await restaurants.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }
  
  // GET CUISINES
  static async getCuisines() {
    let cuisines = [];
    try {
      cuisines = await restaurants.distinct('cuisine');
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}
