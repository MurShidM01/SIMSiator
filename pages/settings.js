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

      <!-- Ad Section in Settings -->
      <div class="mt-6 bg-surface rounded-2xl p-4 border border-gray-800">
        <div class="text-center mb-3">
          <span class="text-xs text-gray-400 uppercase tracking-wide">Advertisement</span>
        </div>
        <div class="flex justify-center">
          <script type="text/javascript">
            atOptions = {
              'key' : 'e3a604d94aefc677ef350394704cd944',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//femalesfellowship.com/e3a604d94aefc677ef350394704cd944/invoke.js"></script>
        </div>
      </div>

      <!-- Native Banner Ad -->
      <div class="mt-6 bg-surface rounded-2xl p-4 border border-gray-800">
        <script async="async" data-cfasync="false" src="//femalesfellowship.com/551a0174af27101ed7c1aa175a5785b8/invoke.js"></script>
        <div id="container-551a0174af27101ed7c1aa175a5785b8"></div>
      </div>

      <!-- Premium Unlock CTA -->
      <div class="mt-6 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-yellow-500/30">
        <div class="text-center">
          <div class="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">⭐ Go Premium!</h3>
          <p class="text-gray-400 mb-4 text-sm">Unlock unlimited searches and premium features by earning points</p>
          <button onclick="loadPage('offers')" class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition transform hover:scale-105 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
            </svg>
            Earn Points Now
          </button>
        </div>
      </div>

      <!-- External Link Ad -->
      <div class="mt-4">
        <a href="https://femalesfellowship.com/t6qq82crr?key=290af80b678c8951350789ec11789d6f" 
           target="_blank"
           class="block bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 border border-primary/30 hover:border-primary/50 transition text-center">
          <div class="flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            <span class="text-white font-semibold">Exclusive Deals & Offers</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </a>
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
