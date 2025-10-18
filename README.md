<div align="center">

# 📱 SIMSiator - Phone Data Finder

<img src="https://img.shields.io/badge/version-1.0.0-00C9A7?style=for-the-badge&logo=semver&logoColor=white" alt="Version">
<img src="https://img.shields.io/badge/status-active-00C9A7?style=for-the-badge" alt="Status">
<img src="https://img.shields.io/badge/license-MIT-845EC2?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License">

### 🚀 A Modern Phone Number Information Retrieval System

*Secure • Fast • User-Friendly*

[🌐 Live Demo](https://murshidm01.github.io/SIMSiator/) • [📝 Report Bug](https://github.com/MurShidM01/SIMSiator/issues) • [✨ Request Feature](https://github.com/MurShidM01/SIMSiator/issues)

---

</div>

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Disclaimer](#%EF%B8%8F-disclaimer)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

**SIMSiator** is a professional web application designed for educational and research purposes to retrieve phone number information. Built with modern web technologies, it provides a secure, fast, and intuitive interface for users to search and manage phone data efficiently.

### 🌟 Why SIMSiator?

- ✅ **Secure Authentication** - Firebase-powered user authentication
- ✅ **Real-time Validation** - Instant phone number format validation
- ✅ **Search History** - Track and manage your previous searches
- ✅ **User Verification** - Tiered access system with verification options
- ✅ **Modern UI/UX** - Clean, responsive design with smooth animations
- ✅ **Auto-Update System** - Built-in version checking and updates

---

## ✨ Features

### 🔐 Authentication System
- User registration and login via Firebase
- Secure session management
- Password visibility toggle
- Persistent authentication state

### 🔍 Search Capabilities
- **Phone Number Search** - Enter 11-digit Pakistani phone numbers (03XXXXXXXXX)
- **CNIC-based Search** - View all numbers associated with a CNIC
- **Real-time Validation** - Instant feedback on input validity
- **Search Limits** - 5 free searches for unverified users, unlimited for verified

### 📊 User Dashboard
- **Search History** - View, filter, and manage search history
- **Profile Management** - Update user information and verify account
- **Settings** - Customize app preferences
  - Auto-save history toggle
  - Dark mode (default)
  - Theme customization

### 🎨 User Experience
- **Splash Screen** - Beautiful loading animation
- **Responsive Design** - Works seamlessly on all devices
- **Bottom Navigation** - Easy access to all features
- **Custom Dialogs** - Elegant alerts and confirmations
- **Smooth Animations** - Enhanced user interactions

### 🔔 Additional Features
- Auto-update notifications
- Comprehensive disclaimer system
- Search count reset (24-hour cycle)
- Telegram contact integration
- Version display and management

---

## 🛠️ Tech Stack

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend & Services
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Firestore](https://img.shields.io/badge/Firestore-FFA611?style=for-the-badge&logo=firebase&logoColor=white)

### Hosting
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)

### Key Technologies
- **Firebase Authentication** - User management and security
- **Cloud Firestore** - Real-time database for user profiles
- **TailwindCSS** - Utility-first CSS framework
- **ES6 Modules** - Modern JavaScript architecture
- **CORS Proxy** - Cross-origin request handling

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- (Optional) Firebase account for deployment

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MurShidM01/SIMSiator.git
   ```

2. **Navigate to project directory**
   ```bash
   cd SIMSiator
   ```

3. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Firebase Configuration (Optional)

If you want to use your own Firebase project:

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password)
3. Create a **Firestore Database**
4. Update `firebase.js` with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

---

## 💡 Usage

### 1. **Registration/Login**
- Visit the application URL
- Click **Register** to create a new account
- Or **Login** if you already have an account
- Need access? Contact [@But_Kadah](https://t.me/But_Kadah) on Telegram

### 2. **Search Phone Numbers**
- Navigate to the **Home** tab
- Enter an 11-digit Pakistani phone number (format: 03XXXXXXXXX)
- Click **Fetch Data** to retrieve information
- View results including:
  - Name
  - CNIC
  - Address
  - Associated phone numbers

### 3. **Manage History**
- Go to **History** tab to view past searches
- Filter by date range
- Clear individual or all history entries

### 4. **Profile & Verification**
- Access **Profile** tab
- View your search statistics
- Request verification for unlimited searches
- Update profile information

### 5. **Settings**
- Navigate to **Settings** tab
- Toggle auto-save history
- Customize app preferences
- Logout when needed

---

## 📸 Screenshots

> *Screenshots showcase the modern, intuitive interface of SIMSiator*

### 🏠 Home Screen
Clean and focused search interface with real-time validation

### 🔐 Authentication
Secure login and registration with Firebase integration

### 📊 User Dashboard
Comprehensive profile management and statistics

### 📜 Search History
Easy-to-navigate history with filtering options

---

## ⚠️ Disclaimer

### 🎓 Educational Purpose Only

This application is developed **strictly for educational, learning, and research purposes**. It demonstrates data retrieval concepts and modern web development practices.

### ⚖️ Legal Warnings

- ❌ **DO NOT** use this tool for illegal activities, harassment, stalking, or privacy violations
- ❌ Unauthorized access or collection of personal data may constitute a **criminal offense**
- ❌ Violations may result in legal prosecution, fines, and imprisonment
- ✅ **Always** obtain proper authorization before accessing personal information
- ✅ **Respect** privacy and comply with all applicable laws (GDPR, PDPA, etc.)

### 📌 Limitations

- Database contains records from **2022 and previous years only**
- Data may be **outdated, incomplete, or inaccurate**
- Not a real-time database
- Developers are **NOT responsible** for:
  - Any misuse or illegal use
  - Damages or legal consequences
  - Data accuracy or completeness
  - Third-party claims

### 👤 User Responsibility

By using SIMSiator, you accept **full responsibility** for your actions and agree to use the application **legally, ethically, and responsibly**.

---

## 📂 Project Structure

```
SIMSiator/
├── index.html              # Main HTML file
├── app.js                  # Core application logic
├── firebase.js             # Firebase configuration
├── auth-firebase.js        # Authentication handler
├── login-handler.js        # Login UI logic
├── dialog.js               # Custom dialog system
├── styles.css              # Custom styles
├── pages/
│   ├── home.js            # Home page component
│   ├── history.js         # History page component
│   ├── profile.js         # Profile page component
│   └── settings.js        # Settings page component
└── README.md              # Documentation
```

---

## 🔄 Updates & Versioning

SIMSiator includes an **automatic update checking system**:
- Checks for updates on app launch
- Manual update check available in About section
- Version comparison with Firestore-based update management
- One-click download for new versions

**Current Version:** `1.0.0`

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve SIMSiator:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Ali Khan Jalbani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Contact

**Developer:** Ali Khan Jalbani

- 📧 Email: Contact via GitHub
- 💬 Telegram: [@But_Kadah](https://t.me/But_Kadah)
- 🐙 GitHub: [@MurShidM01](https://github.com/MurShidM01)
- 🌐 Live Demo: [https://murshidm01.github.io/SIMSiator/](https://murshidm01.github.io/SIMSiator/)

---

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- TailwindCSS for the beautiful UI framework
- Heroicons for SVG icons
- The open-source community

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ by Ali Khan Jalbani**

[![GitHub stars](https://img.shields.io/github/stars/MurShidM01/SIMSiator?style=social)](https://github.com/MurShidM01/SIMSiator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/MurShidM01/SIMSiator?style=social)](https://github.com/MurShidM01/SIMSiator/network/members)

---

*Remember: With great power comes great responsibility. Use this tool ethically and legally.*

</div>
