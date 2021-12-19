import express from 'express';
import RestaurantsCtrl from './restaurants.controller.js';
import ReviewsCtrl from './reviews.controller.js';

const router = express.Router(); // access to the express router

// RESTAURANTS
router.route('/').get(RestaurantsCtrl.apiGetRestaurants);
router.route('/id/:id').get(RestaurantsCtrl.apiGetRestaurantById);
router.route('/cuisines').get(RestaurantsCtrl.apiGetRestaurantCuisines);

// REVIEWS
router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router;

