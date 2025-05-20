# TWChat - Modern React Native Chat Application

TWChat is a feature-rich chat application built with React Native, offering a modern and intuitive messaging experience across iOS and Android platforms.

## Features

- 🔐 Secure message storage with encryption
- 🖼️ Image sharing capabilities
- 📱 Cross-platform support (iOS & Android)
- 🎨 Modern UI with Material Design
- 🔄 Offline support with data persistence
- 📱 Responsive and smooth animations
- 🤖 Bot messaging support

## Tech Stack

- **Framework**: React Native 0.79.2
- **State Management**: Redux Toolkit with Redux Persist
- **Navigation**: React Navigation 7.x
- **UI Components**: React Native Paper
- **Form Handling**: React Hook Form with Zod validation
- **Storage**: AsyncStorage & Encrypted Storage
- **Performance**: FlashList for optimized list rendering
- **Type Safety**: TypeScript

## Prerequisites

- Node.js >= 18
- React Native development environment setup
- iOS: XCode and CocoaPods
- Android: Android Studio and Android SDK

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mohammeddadell/TWChat.git
cd TWChat
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. iOS Setup:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

## Running the App

### Start Metro Bundler

```bash
npm start
# or
yarn start
```

### Run on iOS

```bash
npm run ios
# or
yarn ios
```

### Run on Android

```bash
npm run android
# or
yarn android
```

## Development

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Project Structure

```
src/
├── components/    # Reusable UI components
├── screens/       # Screen components
├── navigation/    # Navigation configuration
├── store/         # Redux store setup
├── services/      # RESTful APIs
├── theme/         # Dark/Light theming configurations
├── constants/     # App constants
└── types/         # TypeScript type definitions
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- React Native community
