import axios from "axios";

export default axios.create({
  baseURL: "https://api.nasa.gov/neo/rest/v1/feed",
  headers: {
    Authorization: "2zcSAHeiiktxliyCHz2eVVzGfUpwPsFqTX97WquF",
  },
});
