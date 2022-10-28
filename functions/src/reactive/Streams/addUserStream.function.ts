import * as functions from "firebase-functions";

import Moralis from "moralis";
const config = functions.config();

export const addUserStream = async (user: functions.auth.UserRecord) => {
  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    if (!user.displayName) {
      throw new Error(`Stream Addition Failed for ${user.uid}`);
    }
    console.log("Adding User To stream");
    const newUserStream = await Moralis.Streams.addAddress({
      id: "f7b7961e-13b4-4b7d-84a7-16624236ee3d",
      address: user.displayName,
    });
    console.log("Added User To stream");
    return newUserStream;
  } catch (error) {
    if (!(error instanceof Error)) {
      return;
    }
    console.log(error.message);
    return error.message;
  }
};
/* For Type ref */
// functions.auth.user().onCreate((user) => {
//   user.uid;
// });
