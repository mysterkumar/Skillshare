# Skillshare Expo App

This README provides instructions to set up and run the Skillshare Expo App.

## Prerequisites

- Node.js and npm installed ([Download Node.js](https://nodejs.org/))
- Expo CLI installed globally

```bash
npm install -g expo-cli
```

## Installation

1. **Create a New Expo App**

```bash
npx create-expo-app --template blank appname
```

2. **Copy Repository Files**

Copy all files from this repository into your newly created Expo app directory.

3. **Install Dependencies**

Navigate to the app directory and install the necessary dependencies:

```bash
npm install
```

4. **Start the App**

To run the app, use the following command:

```bash
npm start
```

This will open the Expo development server. You can test the app on an emulator, simulator, or physical device using the Expo Go app.

## Additional Notes

- Always start with a fresh Expo app to ensure all device-specific files are correctly generated.
- Installing dependencies before adding custom files helps avoid version conflicts and errors.

## Troubleshooting

- If you encounter issues with dependencies, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.
- Ensure your Expo CLI is up to date:

```bash
npm install -g expo-cli
```

