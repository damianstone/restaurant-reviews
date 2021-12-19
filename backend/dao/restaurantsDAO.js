// data access object for the restaurants collection
// DAO => to adapts the data access to the client interface

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

  // geth all the restaurants
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
        console.error(`Unable to convert cursor to array or problem counting documents: ${e}`);
        return {
            restaurantsList: [],
            totalRestaurants: 0,
        };
    }
  }
}
