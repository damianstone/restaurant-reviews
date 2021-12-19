import express from 'express';
import RestaurantsCtrl from './restaurants.controller.js';
import ReviewsCtrl from './reviews.controller.js';

const router = express.Router(); // access to the express router

// RESTAURANTS
router.route('/').get(RestaurantsCtrl.apiGetRestaurants);

// REVIEWS
router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router;
