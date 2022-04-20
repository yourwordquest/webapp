# [YourWord.Quest](https://yourword.quest)

This is the user interface for the public website. It's built on typescript and react

### Config
We use firebase-authentication and in future the UI should read some values directly from firestore instead of going through the API.
We use .env files for configuration. Get the details of your firebase project and use them replace the values below:

```env
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN="__project_id__.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="__project_id__"
REACT_APP_FIREBASE_STORAGE_BUCKET="__project_id__.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
REACT_APP_FIREBASE_APP_ID=""
REACT_APP_FIREBASE_MEASUREMENT_ID=""
```

The values are required to initialize firebase. You can also use our  default config `cp .env.default .env` which maps to our firebase project.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## API calls
While running the app locally api calls are made to `localhost:8000` and to `api.yourword.quest` when running online. You can change these values in `src/utils/routing.ts@make_api_url`

