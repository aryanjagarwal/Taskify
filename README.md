# Taskify 📝

A modern task management app built with React Native and Expo, designed to help users stay organized and productive. Taskify combines powerful features with an intuitive interface to make task management effortless and enjoyable.

## Features ✨

- **Task Management**

  - Create, edit, and delete tasks with ease
  - Organize tasks with custom categories
  - Mark tasks as complete/incomplete
  - Batch actions for multiple tasks
  - Search and filter tasks

- **Priority System**

  - Three-tier priority levels (Low, Medium, High)
  - Visual indicators for each priority level
  - Sort tasks by priority
  - Priority-based notifications

- **Due Date Management**

  - Set and track task deadlines
  - Calendar view for task scheduling
  - Deadline notifications
  - Overdue task highlighting
  - Date-based task sorting

- **User Experience**

  - Clean, modern interface
  - Smooth animations and transitions
  - Dark/Light mode support
  - Haptic feedback
  - Gesture-based controls
  - Responsive design for all screen sizes

- **User Authentication & Security**

  - Secure sign-in/sign-up
  - Password recovery
  - Profile management
  - Data encryption
  - Automatic session handling

- ⚙️ **Settings & Customization**
  - App preferences
  - Notification settings
  - Theme options
  - Privacy controls

## Tech Stack 🛠️

- React Native
- Expo
- TypeScript
- React Navigation
- Reanimated for smooth animations
- Bottom Sheet for modal interfaces
- Expo Router for navigation
- AsyncStorage for local data persistence
- Clerk Authentication
- Convex Backend

### Development Tools

- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety
- Expo Dev Client for development

## Project Structure 📁

taskify/
├── app/ # Main application screens
│ ├── (auth)/ # Authentication screens
│ ├── (tabs)/ # Tab navigation screens
│ ├── account/ # Account management screens
│ └── support/ # Help and support screens
├── assets/ # Images, fonts, and other static files
├── components/ # Reusable components
├── convex/ # Backend configuration and functions
├── utils/ # Utility functions and constants
└── types/ # TypeScript type definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Screenshots

<p align="center">
  <img src="assets/screenshots/welcome.png" width="200" alt="Welcome Screen"/>
  <img src="assets/screenshots/auth.png" width="200" alt="Auth Screen"/>
  <img src="assets/screenshots/tasks.png" width="200" alt="Tasks Screen"/>
  <img src="assets/screenshots/add.png" width="200" alt="AddTask Screen"/>
  <img src="assets/screenshots/completed.png" width="200" alt="CompletedTask Screen"/>
  <img src="assets/screenshots/settings.png" width="200" alt="Settings Screen"/>
  <img src="assets/screenshots/profile.png" width="200" alt="Profile Screen"/>
  <img src="assets/screenshots/edit.png" width="200" alt="EditProfile Screen"/>
  <img src="assets/screenshots/privacy.png" width="200" alt="PrivacyPolicy Screen"/>
  <img src="assets/screenshots/contact.png" width="200" alt="ContactUs Screen"/>
  <img src="assets/screenshots/about.png" width="200" alt="AboutUs Screen"/>
  <img src="assets/screenshots/help.png" width="200" alt="HelpCenter Screen"/>
</p>

## Environment Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Development Environment

1. Install Expo CLI:

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
