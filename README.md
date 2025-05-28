# MyArtHouse

## Project Summary

MyArtHouse is a platform for users to explore virtual exhibitions and artwork from a combined collection of arthouses and museums. Users can search, filter and browse these artworks and find additional information about each specific piece. Additionally, users can create their own custom collections of art, saving individual artworks into these collections by any criteria they choose, enabling quick and easy viewing.

## Hosted Version

Please find the hosted site [here](https://cfagan88.github.io/MyArtHouse/)

## Built With:

Nodejs\
JavaScript\
React\
Vite\
Tailwind\
Jest (for testing)

## Setup Instructions

### Minimum Requirements

Nodejs - v20.18.0\
React - v19.0.0\
Vite - v6.2.0\
Tailwind - v4.1.3

### Initial Setup

In order to run this site locally, please follow the steps below:

- On GitHub, navigate to the main page of the repository and click `<> Code`
- Copy the URL for this repo
- On your local machine, type `git clone` followed by the repo URL into the terminal, pressing enter to create your local clone
- Use the command `CD` to navigate into this folder

Once the repo is open, please run the following commands in the terminal:

- `npm install` - this will install all the dependencies for the project to run
- `npm run dev` - this will set up the site on a local port and provide a link to view the site in a browser

### Configuring .env Variables and API Keys

To run this project locally, you'll need to create your own .env file at the root of the project directory. This file stores sensitive information like API keys and base URLs used by the application.

- Create a .env file

- Add the following variables:\
  `VITE_API_KEY="your-api-key-here"`\
  `VITE_BASE_URL_HARVARD="https://api.harvardartmuseums.org"`\
  `VITE_BASE_URL_CMA="https://openaccess-api.clevelandart.org/api`"

- Get an API Key
  To use the Harvard Art Museums API, you'll need to sign up and request an API key here:/
  🔗 https://www.harvardartmuseums.org/collections/api

- Replace `"your-api-key-here"` with the API key you receive.

## Roadmap

- Additional sort/filter functionality (API dependent)
- Add further galleries to increase total number of available artworks
- Improved visuals (loading animations and optimised rendering)

## Project Link:

https://github.com/cfagan88/MyArtHouse
