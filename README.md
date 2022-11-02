# Info

Boilerplate project created using the [Moralis-v2](https://moralis.io/) package on the next.js framework, to simplify testing and using v2 api's.

`Just for testing only. Maynot be used for production.`

# Getting Started

## Setup .env.local

Get the Moralis API key from [Moralis admin page](https://admin.moralis.io/web3apis)

Rename the .env.local.example to .env.local and add the required secrets.

## Install Packages

Run yarn install to install the packages

```bash
yarn
or
yarn install
```

## Start local server

Run the development server in port 8000 as the `NEXTAUTH_URL` in env.local file is set to this port. Can be updated to the required port.

```bash
yarn run dev -p 8000
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

## Firestore security rules for cryptoUsers(users) collection.

#### To be pasted in your firestore rules.

```bash
match /cryptoUsers/{cryptoUser} {
    	allow delete: if false;
      allow list: if request.auth != null
      && resource.data.profileId == request.auth.uid;
  		allow read, update: if request.auth != null
      && resource.data != null
      && resource.data.profileId == request.auth.uid;
      allow create: if request.auth.uid != null
  	}

```

## Learn More

To learn more about Morlais API, take a look at [Moralis Docs](https://docs.moralis.io/moralis-dapp/solana-api).

To get you questions answered reach out to Moralis [forum](https://forum.moralis.io/) or [discord](https://moralis.io/joindiscord/)
