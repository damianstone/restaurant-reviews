import express from 'express';
import RestaurantsCtrl from './restaurants.controller.js';
import ReviewsCtrl from './reviews.controller.js';

// API
// The api connects the backend with the frontend as well as the backend with the database

const router = express.Router(); // access to the express router

// RESTAURANTS
router.route('/').get(RestaurantsCtrl.apiGetRestaurants);
router.route('/id/:id').get(RestaurantsCtrl.apiGetRestaurantById);
router.route('/cuisines').get(RestaurantsCtrl.apiGetRestaurantCuisines);
 
// REVIEWS
router.route('/review').post(ReviewsCtrl.apiPostReview);
router.route('/review-edit').put(ReviewsCtrl.apiUpdateReview);
router.route('/review-delete/:id').delete(ReviewsCtrl.apiDeleteReview);

export default router;
