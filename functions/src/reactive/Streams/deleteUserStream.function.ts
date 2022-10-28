import * as functions from "firebase-functions";

import Moralis from "moralis";
const config = functions.config();

export const deleteUserStream = async (user: functions.auth.UserRecord) => {
  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    if (!user.displayName) {
      throw new Error(`Stream Deletion Failed for ${user.uid}`);
    }
    const deletedUserStream = await Moralis.Streams.deleteAddress({
      id: "f7b7961e-13b4-4b7d-84a7-16624236ee3d",
      address: user.displayName,
    });
    return deletedUserStream;
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
