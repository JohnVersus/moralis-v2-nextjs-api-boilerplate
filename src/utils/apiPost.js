import axios from "axios";

export const clientApiPost = async (endpoint, params) => {
  const result = await axios.post(`${endpoint}`, params, {
    headers: {
      "content-type": "application/json",
    },
  });
  return result.data;
};

export const serverApiPost = async (endpoint, params) => {
  const result = await axios.post(
    `${process.env.NEXTAUTH_URL}/${endpoint}`,
    params,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return result.data;
};
