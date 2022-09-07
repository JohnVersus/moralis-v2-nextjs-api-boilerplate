import axios from "axios";

const apiPost = async (endpoint, params) => {
  const result = await axios.post(`${endpoint}`, params, {
    headers: {
      "content-type": "application/json",
    },
  });
  return result.data;
};

export default apiPost;
