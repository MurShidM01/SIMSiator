// App Version
const APP_VERSION = "1.0.0"; // Update this when releasing new versions

// API Configuration
const APIURL = "https://fam-official.serv00.net/api/database.php?number=";
const ProxyAPI = "https://corsproxy.io/?";

// Dialog is now loaded from dialog.js

// Phone Number Validation
function validatePhoneNumber(number) {
  // Remove spaces and hyphens
  const cleaned = number.replace(/[\s-]/g, '');
  
  // Check if it's exactly 11 digits and starts with 03
  if (cleaned.length !== 11) {
    return { valid: false, message: 'Phone number must be exactly 11 digits' };
  }
  
  if (!cleaned.startsWith('03')) {
    return { valid: false, message: 'Phone number must start with 03' };
  }
  
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, message: 'Phone number must contain only digits' };
  }
  
  return { valid: true, cleaned: cleaned };
}

// Check for app updates
async function checkForUpdates(showFeedback = false) {
  try {
    // Wait for Firebase to be ready
    if (!window.FirebaseAuth || !window.FirebaseAuth.db) {
      console.log('Firebase not ready for update check');
      if (showFeedback) {
        Dialog.alert('Error', 'Unable to check for updates. Please try again later.', 'error');
      }
      return;
    }
    
    const { getDoc, doc } = await import('https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js');
    const db = window.FirebaseAuth.db;
    
    // Get latest version from Firestore
    const updateDoc = await getDoc(doc(db, 'update', 'latest'));
    
    if (updateDoc.exists()) {
      const updateData = updateDoc.data();
      const latestVersion = updateData.version;
      const downloadUrl = updateData.downloadUrl;
      
      console.log('Current version:', APP_VERSION);
      console.log('Latest version:', latestVersion);
      
      // Compare versions
      if (latestVersion && isNewerVersion(latestVersion, APP_VERSION)) {
        showUpdateDialog(latestVersion, downloadUrl);
      } else if (showFeedback) {
        // User manually checked - show "up to date" message
        Dialog.alert(
          'No Updates Available',
          `You are using the latest version (${APP_VERSION}). No updates are available at this time.`,
          'success'
        );
      }
    } else if (showFeedback) {
      Dialog.alert('Error', 'Unable to retrieve update information. Please try again later.', 'error');
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
    if (showFeedback) {
      Dialog.alert('Error', 'Failed to check for updates. Please check your internet connection and try again.', 'error');
    }
  }
}

// Compare version numbers (e.g., "1.0.1" vs "1.0.0")
function isNewerVersion(latest, current) {
  const latestParts = latest.split('.').map(Number);
  const currentParts = current.split('.').map(Number);
  
  for (let i = 0; i < 3; i++) {
    if (latestParts[i] > currentParts[i]) return true;
    if (latestParts[i] < currentParts[i]) return false;
  }
  return false;
}

// Show update available dialog
function showUpdateDialog(version, downloadUrl) {
  const dialog = document.getElementById('customDialog');
  const icon = document.getElementById('dialogIcon');
  const title = document.getElementById('dialogTitle');
  const message = document.getElementById('dialogMessage');
  const actions = document.getElementById('dialogActions');

  icon.className = 'w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary';
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />
    </svg>
  `;
  
  title.innerHTML = 'Update Required <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-1 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" /></svg>';
  message.innerHTML = `
    <div class="text-left space-y-3">
      <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 border border-primary/30">
        <p class="text-sm text-gray-300 mb-2"><strong>Important:</strong> A new version of SIMSiator is required!</p>
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-400">Current Version:</span>
          <span class="text-sm font-semibold text-gray-300">${APP_VERSION}</span>
        </div>
        <div class="flex items-center justify-between mt-1">
          <span class="text-xs text-gray-400">Latest Version:</span>
          <span class="text-sm font-semibold text-primary">${version}</span>
        </div>
      </div>
      <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
        <p class="text-xs text-yellow-400 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Please update to continue using SIMSiator with the latest features and security improvements.
        </p>
      </div>
    </div>
  `;

  actions.innerHTML = `
    <button id="dialogDownload" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-primary to-secondary text-black font-semibold rounded-lg hover:from-teal-400 hover:to-purple-400 transition flex items-center justify-center shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      Download Update Now
    </button>
  `;

  document.getElementById('dialogDownload').onclick = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
    // Don't close dialog - user must update
  };

  dialog.classList.remove('hidden');
  dialog.classList.add('flex');
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Initialize navigation
  initNavigation();
  
  // Initialize about modal
  initAboutModal();
  
  // Initialize login functionality after a small delay to ensure all modules are loaded
  setTimeout(() => {
    if (typeof window.initLogin === 'function') {
      window.initLogin();
    } else {
      console.warn('initLogin function not found, retrying...');
      setTimeout(() => {
        if (typeof window.initLogin === 'function') {
          window.initLogin();
        }
      }, 500);
    }
  }, 100);
  
  // Wait for Firebase to load, then check authentication
  const checkAuth = setInterval(() => {
    if (typeof window.FirebaseAuth !== 'undefined' && window.FirebaseAuth.auth) {
      clearInterval(checkAuth);
      
      // Check for updates during splash screen
      checkForUpdates();
      
      // Use Firebase's onAuthStateChanged to detect persisted sessions
      window.FirebaseAuth.auth.onAuthStateChanged((user) => {
        console.log('Auth state changed:', user ? 'Logged in' : 'Not logged in');
        
        setTimeout(() => {
          document.getElementById('splashScreen').classList.add('hidden');
          
          if (user) {
            // User is already logged in (session persisted)
            console.log('User session restored:', user.email);
            showMainApp();
          } else {
            // No user, show login screen
            showLoginScreen();
          }
        }, 2500);
      });
    }
  }, 100);
}

// Check if user is authenticated (using Firebase)
function checkAuthentication() {
  // Check if Firebase auth module is loaded
  if (typeof window.FirebaseAuth !== 'undefined') {
    const user = window.FirebaseAuth.getCurrentUser();
    return user !== null;
  }
  
  // Fallback: check localStorage for Firebase auth flag
  return localStorage.getItem('firebaseAuth') === 'true';
}

// Show login screen
function showLoginScreen() {
  document.getElementById('loginScreen').classList.remove('hidden');
  // Hide bottom navigation on login screen
  const bottomNav = document.querySelector('nav');
  if (bottomNav) {
    bottomNav.classList.add('hidden');
  }
}

// Show main app
function showMainApp() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
  // Show bottom navigation on main app
  const bottomNav = document.querySelector('nav');
  if (bottomNav) {
    bottomNav.classList.remove('hidden');
  }
  loadPage('home');
  
  // Show disclaimer only once per device
  setTimeout(() => {
    const disclaimerShown = localStorage.getItem('disclaimerAccepted');
    
    if (!disclaimerShown && typeof showDisclaimer === 'function') {
      showDisclaimer();
    }
  }, 1000);
}

// Make showMainApp available globally for login-handler.js
window.showMainApp = showMainApp;

// Comprehensive Disclaimer Modal
function showDisclaimer() {
  const dialog = document.getElementById('customDialog');
  const icon = document.getElementById('dialogIcon');
  const title = document.getElementById('dialogTitle');
  const message = document.getElementById('dialogMessage');
  const actions = document.getElementById('dialogActions');
  
  if (!dialog || !icon || !title || !message || !actions) {
    console.error('Dialog elements not found!');
    return;
  }

  icon.className = 'w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center bg-yellow-500/20';
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
  `;
  
  title.textContent = 'Important Disclaimer & Terms';
  
  message.innerHTML = `
    <div class="text-left space-y-3 text-xs sm:text-sm max-h-96 overflow-y-auto custom-scrollbar pr-2">
      <!-- Educational Purpose -->
      <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
        <p class="text-gray-200 font-semibold mb-1">
          <strong class="text-yellow-400">Educational & Research Purpose Only</strong>
        </p>
        <p class="text-gray-400 text-xs sm:text-sm">
          This application is strictly developed for <strong>educational, learning, and research purposes</strong>. 
          It is intended to demonstrate data retrieval concepts and should not be used for any commercial or malicious activities.
        </p>
      </div>
      
      <!-- Legal Warnings -->
      <div class="space-y-2">
        <p class="text-white font-semibold text-sm">Legal Warnings:</p>
        <div class="space-y-2 text-gray-400 text-xs sm:text-sm">
          <p class="flex items-start gap-2 bg-red-500/10 p-2 rounded border border-red-500/30">
            <span class="text-red-400 font-bold text-base">•</span>
            <span><strong class="text-red-300">DO NOT</strong> use this tool for any <strong class="text-white">illegal activities</strong>, harassment, stalking, or to violate anyone's privacy rights.</span>
          </p>
          <p class="flex items-start gap-2 bg-red-500/10 p-2 rounded border border-red-500/30">
            <span class="text-red-400 font-bold text-base">•</span>
            <span>Unauthorized access, collection, or use of personal data may constitute a <strong class="text-white">criminal offense</strong> under local and international laws including GDPR, PDPA, and other data protection regulations.</span>
          </p>
          <p class="flex items-start gap-2 bg-red-500/10 p-2 rounded border border-red-500/30">
            <span class="text-red-400 font-bold text-base">•</span>
            <span>Violators may face <strong class="text-white">legal prosecution, fines, and imprisonment</strong> depending on jurisdiction.</span>
          </p>
        </div>
      </div>

      <!-- Responsibilities -->
      <div class="space-y-2">
        <p class="text-white font-semibold text-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          User Responsibilities:
        </p>
        <div class="space-y-2 text-gray-400 text-xs sm:text-sm">
          <p class="flex items-start gap-2">
            <span class="text-orange-400 font-bold">•</span>
            <span>You are <strong class="text-white">solely responsible</strong> for any actions taken using this application.</span>
          </p>
          <p class="flex items-start gap-2">
            <span class="text-orange-400 font-bold">•</span>
            <span>Always <strong class="text-white">obtain proper authorization</strong> before accessing or using any personal information.</span>
          </p>
          <p class="flex items-start gap-2">
            <span class="text-orange-400 font-bold">•</span>
            <span><strong class="text-white">Respect privacy</strong> and comply with all applicable laws in your jurisdiction.</span>
          </p>
          <p class="flex items-start gap-2">
            <span class="text-primary font-bold">•</span>
            <span>Use this tool <strong class="text-white">ethically and responsibly</strong> at all times.</span>
          </p>
        </div>
      </div>

      <!-- No Liability -->
      <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
        <p class="text-white font-semibold text-sm mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
          </svg>
          Limitation of Liability:
        </p>
        <p class="text-gray-400 text-xs sm:text-sm">
          The developers and distributors of this application are <strong class="text-white">NOT responsible or liable</strong> for:
        </p>
        <ul class="mt-2 space-y-1 text-gray-400 text-xs sm:text-sm ml-4">
          <li>• Any misuse, abuse, or illegal use of this application</li>
          <li>• Any damages, losses, or legal consequences arising from its use</li>
          <li>• Accuracy, completeness, or reliability of the data provided</li>
          <li>• Any third-party actions or claims related to data access</li>
        </ul>
      </div>

      <!-- Database Information -->
      <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
        <p class="text-blue-300 font-semibold text-sm mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>
          Database Information:
        </p>
        <p class="text-gray-400 text-xs sm:text-sm">
          <strong class="text-white">Note:</strong> The database contains phone number records from <strong class="text-blue-300">2022 and previous years only</strong>. 
          Data may be outdated, incomplete, or inaccurate. This is not a real-time database.
        </p>
      </div>

      <!-- Data Accuracy -->
      <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
        <p class="text-gray-400 text-xs">
          <strong class="text-white">Data Accuracy Disclaimer:</strong> Information retrieved may be outdated, incorrect, or incomplete. 
          Always verify information through official channels. Do not make decisions based solely on this data.
        </p>
      </div>

      <!-- Terms Acceptance -->
      <div class="bg-primary/10 border border-primary/30 rounded-lg p-3">
        <p class="text-xs text-gray-300 text-center leading-relaxed">
          <strong class="text-primary">By clicking "I Understand & Accept"</strong>, you acknowledge that you have read, understood, 
          and agree to comply with all terms and conditions stated above. You accept full responsibility for your actions 
          and agree to use this application legally, ethically, and responsibly.
        </p>
      </div>
    </div>
  `;

  actions.innerHTML = `
    <button id="disclaimerAccept" class="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base bg-primary text-black font-semibold rounded-lg hover:bg-teal-400 transition flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      I Understand & Accept
    </button>
  `;

  document.getElementById('disclaimerAccept').onclick = () => {
    // Save acceptance to localStorage (will persist on this device)
    localStorage.setItem('disclaimerAccepted', 'true');
    
    dialog.classList.add('hidden');
    dialog.classList.remove('flex');
  };

  dialog.classList.remove('hidden');
  dialog.classList.add('flex');
}

// Navigation functionality
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      loadPage(page);
      
      // Update active state
      navLinks.forEach(l => {
        l.classList.remove('text-primary');
        l.classList.add('text-gray-400');
      });
      link.classList.remove('text-gray-400');
      link.classList.add('text-primary');
    });
  });
}

// Load page content
async function loadPage(pageName) {
  const mainContent = document.getElementById('mainContent');
  
  let content = '';
  switch(pageName) {
    case 'home':
      content = renderHomePage();
      break;
    case 'history':
      content = renderHistoryPage();
      break;
    case 'settings':
      content = renderSettingsPage();
      break;
    case 'profile':
      // Await the async profile page render
      content = await renderProfilePage();
      break;
    default:
      content = renderHomePage();
  }
  
  mainContent.innerHTML = content;
  
  // Initialize page-specific functionality
  switch(pageName) {
    case 'home':
      initHomePage();
      break;
    case 'settings':
      initSettingsPage();
      break;
    case 'profile':
      // Initialize countdown timer if it exists
      if (typeof initCountdownTimer === 'function') {
        console.log('Initializing countdown timer from app.js');
        initCountdownTimer();
      }
      break;
  }
}

// Make loadPage available globally
window.loadPage = loadPage;

// About modal functionality
function initAboutModal() {
  const aboutBtn = document.getElementById('aboutBtn');
  const aboutModal = document.getElementById('aboutModal');
  const closeAbout = document.getElementById('closeAbout');

  aboutBtn.addEventListener('click', () => {
    // Update version display
    const versionElement = document.getElementById('appVersion');
    if (versionElement) {
      versionElement.textContent = `Version ${APP_VERSION}`;
    }
    
    aboutModal.classList.remove('hidden');
    aboutModal.classList.add('flex');
  });

  closeAbout.addEventListener('click', () => {
    aboutModal.classList.add('hidden');
    aboutModal.classList.remove('flex');
  });
}

// Make checkForUpdates globally available
window.checkForUpdates = checkForUpdates;

// Fetch data function
async function fetchData() {
  const numberInput = document.getElementById('number');
  const spinner = document.getElementById('spinner');
  const output = document.getElementById('output');
  const fetchBtn = document.getElementById('fetchBtn');
  
  const number = numberInput.value.trim();
  if (!number) {
    Dialog.alert('Invalid Input', 'Please enter a phone number', 'warning');
    return;
  }

  // Validate phone number
  const validation = validatePhoneNumber(number);
  if (!validation.valid) {
    Dialog.alert('Invalid Phone Number', validation.message, 'error');
    return;
  }

  // Check user verification status and search limit
  const firebaseUser = window.FirebaseAuth?.getCurrentUser();
  let userProfile = null;
  
  if (firebaseUser) {
    // Check and reset search count if 24 hours have passed
    await window.FirebaseAuth.checkAndResetSearchCount(firebaseUser.uid);
    
    const profileResult = await window.FirebaseAuth.getUserProfile(firebaseUser.uid);
    if (profileResult.success) {
      userProfile = profileResult.data;
      const searchCount = userProfile.searchCount || 0;
      const searchLimit = userProfile.searchLimit || 5;
      const isVerified = userProfile.verified || false;
      
      console.log('Search check - Count:', searchCount, 'Limit:', searchLimit, 'Verified:', isVerified);
      
      // Check if user has exceeded limit (only for unverified users)
      if (!isVerified && searchCount >= searchLimit) {
        Dialog.confirm(
          'Search Limit Reached',
          `You've used all ${searchLimit} free searches. Verify your account to get unlimited searches!`,
          () => {
            loadPage('profile');
          }
        );
        return;
      }
      
      // Increment count BEFORE search for unverified users
      if (!isVerified) {
        console.log('Incrementing search count from', searchCount, 'to', searchCount + 1);
        await window.FirebaseAuth.incrementSearchCount(firebaseUser.uid);
      }
    }
  }

  // Disable button during fetch
  if (fetchBtn) {
    fetchBtn.disabled = true;
    fetchBtn.classList.add('opacity-50', 'cursor-not-allowed');
    fetchBtn.classList.remove('hover:bg-teal-400', 'hover:scale-[1.02]');
  }

  spinner.classList.remove("hidden");
  output.classList.add("hidden");
  output.innerHTML = "";

  try {
    const response = await fetch(ProxyAPI + encodeURIComponent(APIURL + number));
    const text = await response.text();
    spinner.classList.add("hidden");
    output.classList.remove("hidden");

    if (!response.ok) {
      showMessage(`Error fetching data (Status: ${response.status})`, "text-red-400");
      // Re-enable button
      if (fetchBtn) {
        fetchBtn.disabled = false;
        fetchBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        fetchBtn.classList.add('hover:bg-teal-400', 'hover:scale-[1.02]');
      }
      return;
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      showMessage(`<pre>${text}</pre>`);
      // Re-enable button
      if (fetchBtn) {
        fetchBtn.disabled = false;
        fetchBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        fetchBtn.classList.add('hover:bg-teal-400', 'hover:scale-[1.02]');
      }
      return;
    }

    if (data.success && data.data && data.data.length > 0) {
      const user = data.data[0];
      
      // Add to history if auto-save is enabled
      const settings = getSettings();
      if (settings.autoSaveHistory) {
        addToHistory(number);
      }
      
      output.innerHTML = `
        <div class="space-y-4">
          <div class="text-center mb-4">
            <h2 class="text-lg font-semibold text-primary">User Information</h2>
          </div>
          <div class="space-y-3">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-400">Phone Number</p>
                <p class="text-white">${user.number}</p>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-400">Name</p>
                <p class="text-white">${user.name}</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-400">CNIC</p>
                  <p class="text-white">${user.cnic}</p>
                </div>
              </div>
              <button onclick="showAllCNICInfo('${user.cnic}')" class="px-3 py-1.5 bg-secondary/20 text-secondary text-xs font-medium rounded-lg hover:bg-secondary/30 transition border border-secondary/50 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                </svg>
                Show All
              </button>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-400">Address</p>
                <p class="text-white">${user.address}</p>
              </div>
            </div>
          </div>
          <div class="text-xs text-gray-500 text-center pt-3 border-t border-gray-800">Credit: ${data.credit || "Unknown"}</div>
        </div>
      `;
      // Re-enable button after success
      if (fetchBtn) {
        fetchBtn.disabled = false;
        fetchBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        fetchBtn.classList.add('hover:bg-teal-400', 'hover:scale-[1.02]');
      }
    } else {
      showMessage("No data found for this number.", "text-red-400");
      // Re-enable button
      if (fetchBtn) {
        fetchBtn.disabled = false;
        fetchBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        fetchBtn.classList.add('hover:bg-teal-400', 'hover:scale-[1.02]');
      }
    }

  } catch (err) {
    spinner.classList.add("hidden");
    output.classList.remove("hidden");
    showMessage(`Error: ${err.message}`, "text-red-400");
    // Re-enable button on error
    if (fetchBtn) {
      fetchBtn.disabled = false;
      fetchBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      fetchBtn.classList.add('hover:bg-teal-400', 'hover:scale-[1.02]');
    }
  }
}

function showMessage(message, color = "text-gray-300") {
  const output = document.getElementById('output');
  output.classList.remove("hidden");
  output.innerHTML = `
    <div class="flex items-center justify-center py-4">
      <p class="${color} text-center">${message}</p>
    </div>
  `;
}

// Make functions globally available
window.fetchData = fetchData;
window.showMessage = showMessage;

// Fetch all numbers by CNIC
async function showAllCNICInfo(cnic) {
  const dialog = document.getElementById('customDialog');
  const icon = document.getElementById('dialogIcon');
  const title = document.getElementById('dialogTitle');
  const message = document.getElementById('dialogMessage');
  const actions = document.getElementById('dialogActions');

  // Show loading state
  icon.className = 'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-primary/20';
  icon.innerHTML = '<div class="w-8 h-8 border-4 border-gray-700 border-t-primary rounded-full animate-spin"></div>';
  title.textContent = 'Loading...';
  message.innerHTML = '<p class="text-gray-400">Fetching all numbers for CNIC: ' + cnic + '</p>';
  actions.innerHTML = '';
  
  dialog.classList.remove('hidden');
  dialog.classList.add('flex');

  try {
    const response = await fetch(ProxyAPI + encodeURIComponent(APIURL + cnic));
    const text = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error('Invalid response format');
    }

    if (data.success && data.data && data.data.length > 0) {
      // Update dialog with results
      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-primary" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" /></svg>';
      title.textContent = 'All Numbers for CNIC';
      
      const numbersHTML = data.data.map((user, index) => `
        <div class="bg-gray-800 rounded-lg p-2 sm:p-3 border border-gray-700 hover:border-primary/50 transition">
          <div class="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span class="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">${index + 1}</span>
            <div class="min-w-0 flex-1">
              <p class="text-white font-medium text-sm sm:text-base truncate">${user.number}</p>
              <p class="text-xs text-gray-400 truncate">${user.name}</p>
            </div>
          </div>
          <div class="ml-7 sm:ml-8">
            <div class="flex items-start text-xs text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span class="line-clamp-2">${user.address}</span>
            </div>
          </div>
        </div>
      `).join('');

      message.innerHTML = `
        <div class="text-left">
          <div class="bg-secondary/20 border border-secondary/50 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-gray-400">CNIC Number</p>
                <p class="text-white font-medium text-sm sm:text-base">${cnic}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-400">Total Numbers</p>
                <p class="text-xl sm:text-2xl font-bold text-secondary">${data.data.length}</p>
              </div>
            </div>
          </div>
          <div class="max-h-48 sm:max-h-64 overflow-y-auto space-y-2 pr-1 sm:pr-2 custom-scrollbar">
            ${numbersHTML}
          </div>
          <div class="text-xs text-gray-500 text-center mt-2 sm:mt-3 pt-2 border-t border-gray-700">
            Credit: ${data.credit || "Unknown"}
          </div>
        </div>
      `;

      actions.innerHTML = `
        <button id="dialogClose" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-primary text-black font-semibold rounded-lg hover:bg-teal-400 transition">Close</button>
      `;

      document.getElementById('dialogClose').onclick = () => {
        dialog.classList.add('hidden');
        dialog.classList.remove('flex');
      };
    } else {
      throw new Error('No data found for this CNIC');
    }

  } catch (err) {
    // Show error in dialog
    icon.className = 'w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center bg-red-500/20';
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>';
    title.textContent = 'Error';
    message.innerHTML = `<p class="text-gray-400 text-sm sm:text-base">${err.message}</p>`;
    
    actions.innerHTML = `
      <button id="dialogClose" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">Close</button>
    `;

    document.getElementById('dialogClose').onclick = () => {
      dialog.classList.add('hidden');
      dialog.classList.remove('flex');
    };
  }
}

// Make showAllCNICInfo globally available for onclick handlers
window.showAllCNICInfo = showAllCNICInfo;
