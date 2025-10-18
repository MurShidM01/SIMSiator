// Settings Page Component
function renderSettingsPage() {
  const settings = getSettings();
  
  return `
    <div class="max-w-md mx-auto">
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-white mb-2">Settings</h2>
        <p class="text-gray-400">Customize your app experience</p>
      </div>

      <div class="space-y-4">
        <!-- Auto-save History -->
        <div class="bg-surface rounded-xl p-4 border border-gray-800">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-white font-medium">Auto-save History</p>
                <p class="text-sm text-gray-400">Save searches automatically</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="autoSaveHistory" class="sr-only peer" ${settings.autoSaveHistory ? 'checked' : ''}>
              <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <!-- Notifications -->
        <div class="bg-surface rounded-xl p-4 border border-gray-800">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <p class="text-white font-medium">Notifications</p>
                <p class="text-sm text-gray-400">Enable push notifications</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="notifications" class="sr-only peer" ${settings.notifications ? 'checked' : ''}>
              <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <!-- Theme (Placeholder) -->
        <div class="bg-surface rounded-xl p-4 border border-gray-800">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <p class="text-white font-medium">Theme</p>
                <p class="text-sm text-gray-400">Dark mode (default)</p>
              </div>
            </div>
            <span class="text-gray-500 text-sm">Coming Soon</span>
          </div>
        </div>

        <!-- Data & Storage -->
        <div class="bg-surface rounded-xl p-4 border border-gray-800">
          <div class="flex items-center mb-3">
            <div class="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <p class="text-white font-medium">Data & Storage</p>
              <p class="text-sm text-gray-400">Manage app data</p>
            </div>
          </div>
          <div class="space-y-2">
            <button onclick="resetDisclaimer()" class="w-full bg-yellow-500/20 text-yellow-400 font-medium py-2 rounded-lg hover:bg-yellow-500/30 transition border border-yellow-500/50">
              Reset Disclaimer
            </button>
            <button onclick="clearAllData()" class="w-full bg-red-500/20 text-red-400 font-medium py-2 rounded-lg hover:bg-red-500/30 transition border border-red-500/50">
              Clear All Data
            </button>
          </div>
        </div>

        <!-- Logout Section -->
        <div class="bg-surface rounded-xl p-4 border border-gray-800">
          <div class="flex items-center mb-3">
            <div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div>
              <p class="text-white font-medium">Logout</p>
              <p class="text-sm text-gray-400">Sign out of your account</p>
            </div>
          </div>
          <button onclick="logout()" class="w-full bg-red-500/20 text-red-400 font-medium py-2 rounded-lg hover:bg-red-500/30 transition border border-red-500/50">
            Logout from App
          </button>
        </div>

        <!-- About Section -->
        <div class="bg-surface rounded-xl p-4 border border-gray-800">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-white font-medium">About App</p>
                <p class="text-sm text-gray-400">Version 1.0.0</p>
              </div>
            </div>
            <button id="showAboutBtn" class="text-primary hover:text-teal-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Get settings from localStorage
function getSettings() {
  const settings = localStorage.getItem('appSettings');
  return settings ? JSON.parse(settings) : {
    autoSaveHistory: true,
    notifications: false
  };
}

// Save settings to localStorage
function saveSettings(settings) {
  localStorage.setItem('appSettings', JSON.stringify(settings));
}

// Initialize settings page
function initSettingsPage() {
  const autoSaveCheckbox = document.getElementById('autoSaveHistory');
  const notificationsCheckbox = document.getElementById('notifications');
  const showAboutBtn = document.getElementById('showAboutBtn');

  if (autoSaveCheckbox) {
    autoSaveCheckbox.addEventListener('change', (e) => {
      const settings = getSettings();
      settings.autoSaveHistory = e.target.checked;
      saveSettings(settings);
    });
  }

  if (notificationsCheckbox) {
    notificationsCheckbox.addEventListener('change', (e) => {
      const settings = getSettings();
      settings.notifications = e.target.checked;
      saveSettings(settings);
    });
  }

  if (showAboutBtn) {
    showAboutBtn.addEventListener('click', () => {
      const aboutModal = document.getElementById('aboutModal');
      aboutModal.classList.remove('hidden');
      aboutModal.classList.add('flex');
    });
  }
}

// Clear all app data
function clearAllData() {
  Dialog.confirm(
    'Clear All Data',
    'Are you sure you want to clear all app data including settings, history, and profile? This action cannot be undone.',
    () => {
      localStorage.clear();
      Dialog.alert('Success', 'All app data has been cleared successfully!', 'success');
      setTimeout(() => {
        loadPage('settings');
      }, 1500);
    }
  );
}

// Logout function
async function logout() {
  Dialog.confirm(
    'Logout',
    'Are you sure you want to logout? You will need to login again to access the app.',
    async () => {
      try {
        // Sign out from Firebase
        if (window.FirebaseAuth) {
          await window.FirebaseAuth.logoutUser();
        }
        
        // Clear local storage
        localStorage.removeItem('firebaseAuth');
        
        Dialog.alert('Logged Out', 'You have been logged out successfully', 'success');
        
        setTimeout(() => {
          // Hide main app and show login screen
          document.getElementById('mainApp').classList.add('hidden');
          document.getElementById('loginScreen').classList.remove('hidden');
          
          // Clear form inputs
          document.getElementById('loginEmail').value = '';
          document.getElementById('loginPassword').value = '';
        }, 1500);
      } catch (error) {
        Dialog.alert('Error', 'Failed to logout. Please try again.', 'error');
      }
    }
  );
}

// Reset disclaimer function
function resetDisclaimer() {
  Dialog.confirm(
    'Reset Disclaimer',
    'This will reset the disclaimer so it appears again on next app load. Do you want to continue?',
    () => {
      // Remove disclaimer acceptance flag
      localStorage.removeItem('disclaimerAccepted');
      
      Dialog.alert('Success', 'Disclaimer has been reset. You will see it again on next refresh.', 'success');
    }
  );
}
