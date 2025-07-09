# ⏱️ Multi-Timer React Native App

> ⚡ **Your personal productivity booster — manage multiple timers effortlessly and stay on top of your tasks.**

---

## 🚀 Overview

A beautifully designed, feature-rich **multi-timer application** built with **React Native**, helping users manage multiple countdown timers grouped by categories. Enjoy real-time progress visualization, category-based control, and a clutter-free experience.

---

## ✨ Features

### 🔑 Core Functionality
- ⏰ **Create Custom Timers** — Set timer name, duration, and category
- 🗂️ **Category Grouping** — Organize timers into collapsible sections
- 🎛️ **Control Timers** — Start, pause, reset individual timers
- 📊 **Progress Visualization** — See real-time progress with sleek progress bars
- 🚀 **Bulk Controls** — Start, pause, or reset all timers in a category
- 🎉 **Completion Alerts** — Beautiful modals notify you when a timer finishes

### 🌟 Enhanced Capabilities
- 🕘 **Timer History** — See a timeline of completed timers
- 🔔 **Halfway Notifications** — Optional 50% completion alerts
- 💾 **Persistent Data** — Auto-save timers with AsyncStorage
- 🎨 **Material Design Inspired UI** — Clean and intuitive design

---

## 🔧 Installation & Setup

### ✅ Prerequisites
- Node.js v14+
- React Native CLI
- Android Studio (for Android) / Xcode (for iOS)

---

### 📦 Quick Start

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd TimerApp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **iOS Only: Install Pods**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the App**

   - **Android**
     ```bash
     npx react-native run-android
     ```

   - **iOS**
     ```bash
     npx react-native run-ios
     ```

---

## 🏗️ Project Structure

```
TimerApp/
├── android/                 # Android-specific configs
├── ios/                     # iOS-specific configs
├── src/                     # App source code
│   ├── components/          # Reusable UI components
│   ├── screens/             # Screen components
│   ├── utils/               # Utility functions
│   ├── context/             # Global state management
│   └── styles/              # Centralized styles
├── App.js
├── package.json
├── index.js                 # App entry point
└── README.md
```

---

## ⚙️ Technical Overview

### 🔑 State Management
- **React Context API + useReducer** for global timer state
- Efficient management of timers, history, and intervals

### 💾 Persistence
- **AsyncStorage** for storing timers and history across sessions

### ⏳ Timer Logic
- Built with JavaScript `setInterval` & clear interval handling for optimized performance

### 🔀 Navigation
- **React Navigation** (Stack + Bottom Tabs)
- Smooth navigation flow between screens

---

## 🔍 Assumptions & Constraints

- ⏱️ Max timer duration: **99:59:59**
- 🏷️ Category names: **Max 30 chars, case-sensitive**
- 📝 Timer names: **Max 50 chars**
- ☁️ No cloud sync (local storage only)
- 🔔 Halfway alerts as console logs (upgradeable to push notifications)
- 📂 History export in JSON format
- 🌕 Light theme by default (Dark Mode as a future add-on)

---

## 📚 Dependencies

### ⚙️ Core Libraries
| Package                                       | Purpose                        |
|-----------------------------------------------|--------------------------------|
| `react-native`                                | Mobile app framework           |
| `@react-navigation/native`                    | Navigation core                |
| `@react-navigation/stack`                     | Stack navigation               |
| `@react-navigation/bottom-tabs`               | Tabbed navigation              |
| `@react-native-async-storage/async-storage`   | Local storage                  |
| `react-native-vector-icons`                   | Icon support                   |
| `react-native-screens`                        | Performance optimization       |
| `react-native-safe-area-context`              | Safe area handling             |

---

## 🌱 Future Roadmap

### 🚨 Short-Term
- 🔔 Push notifications for timer events
- 🎵 Add sound alerts
- 🌑 Dark Mode UI toggle
- 🎛️ Custom themes

### ☁️ Mid-Term
- ☁️ Cloud sync & backup
- 🧩 Timer templates for quick reuse

### 📊 Long-Term
- 📈 Usage analytics for timer patterns
- 🤖 Smart timer suggestions based on user behavior

---

## 🤝 Contributing

🎯 We welcome contributions!

1. Fork the repository
2. Create your branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add an awesome feature'`)
4. Push to your branch (`git push origin feature/awesome-feature`)
5. Create a Pull Request

---

## 📜 License

Licensed under the **MIT License**.

---

<div align="center">

Made with ❤️ by Smitesh

</div>
