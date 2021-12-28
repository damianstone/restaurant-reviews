import http from '../http-common';

// all functions to make API calls and return the info from it
// make API calls
class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`restaurants?page=${page}`);
  }

  get(id) { // get restaurant one restaurant
    return http.get(`/restaurants/id/${id}`);
  }

  find(query, by = 'name', page = 0) {
    return http.get(`restaurants?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return http.post('/review-new', data);
  }

  updateReview(data) {
    return http.put('/review-edit', data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review-delete?id=${id}`, {
      data: { user_id: userId },
    });
  }

  getCuisines(id) {
    return http.get(`restaurants/cuisines`);
  }
}

export default new RestaurantDataService();
