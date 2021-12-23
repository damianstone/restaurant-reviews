import axios from 'axios';

// import this to make GET, POST, PUT, DELETE requests
// the connection of backend to the services functions
// connection to the backend API
export default axios.create({
  baseURL: 'http://localhost:5000/api/v1', // URL of the backend server
  headers: {
    'Content-Type': 'application/json',
  },
});
