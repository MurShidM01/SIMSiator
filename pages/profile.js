// Profile Page Component
async function renderProfilePage() {
  // Get Firebase user
  const firebaseUser = window.FirebaseAuth?.getCurrentUser();
  
  if (!firebaseUser) {
    return `
      <div class="max-w-md mx-auto text-center py-12">
        <div class="text-red-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl text-white font-bold mb-2">Not Logged In</h3>
        <p class="text-gray-400">Please login to view your profile</p>
      </div>
    `;
  }
  
  // Get profile from Firestore
  const profileResult = await window.FirebaseAuth.getUserProfile(firebaseUser.uid);
  const profile = profileResult.success ? profileResult.data : null;
  
  const displayName = profile?.name || firebaseUser.displayName || 'User';
  const email = firebaseUser.email;
  const memberSince = profile?.createdAt ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString() : 'N/A';
  const lastActive = profile?.lastActive ? new Date(profile.lastActive.seconds * 1000).toLocaleDateString() : 'N/A';
  const stats = getProfileStats();
  
  return `
    <div class="max-w-md mx-auto">
      <!-- Profile Header -->
      <div class="bg-surface rounded-2xl p-6 border border-gray-800 text-center mb-6">
        <div class="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white mb-1">${displayName}</h2>
        <p class="text-gray-400 text-sm">${email}</p>
        <button onclick="editProfile()" class="mt-4 px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition border border-primary/50">
          Edit Profile
        </button>
      </div>

      <!-- Verification Status -->
      <div class="mb-6">
        <div class="bg-surface rounded-xl p-4 border border-gray-800">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
              <div class="w-10 h-10 ${profile?.verified ? 'bg-primary/20' : 'bg-yellow-500/20'} rounded-lg flex items-center justify-center mr-3">
                ${profile?.verified 
                  ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
                  : '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>'
                }
              </div>
              <div>
                <p class="text-white font-medium">Account Status</p>
                <p class="text-sm ${profile?.verified ? 'text-primary' : 'text-yellow-400'}">${profile?.verified ? 'Verified' : 'Not Verified'}</p>
              </div>
            </div>
            ${!profile?.verified 
              ? '<button onclick="verifyAccountDialog()" class="px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-lg hover:bg-primary/30 transition border border-primary/50">Verify Now</button>'
              : '<span class="text-xs text-gray-500 px-3 py-1 bg-primary/10 rounded-full">Premium</span>'
            }
          </div>
          ${!profile?.verified 
            ? '<p class="text-xs text-gray-400 mt-2">Verify your account to get unlimited searches and premium features!</p>'
            : '<p class="text-xs text-gray-400 mt-2">You have access to all premium features including unlimited searches.</p>'
          }
        </div>
      </div>

      <!-- Statistics -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-white mb-3">Statistics</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-surface rounded-xl p-4 border border-gray-800 text-center">
            <div class="text-3xl font-bold text-primary mb-1">${profile?.searchCount || 0}</div>
            <p class="text-sm text-gray-400">Searches Used</p>
          </div>
          <div class="bg-surface rounded-xl p-4 border border-gray-800 text-center">
            <div class="text-3xl font-bold text-secondary mb-1">
              ${profile?.verified 
                ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 6c-2.02 0-3.68 1.19-5.06 2.73l-.44.47-.44-.47C11.18 7.19 9.52 6 7.5 6A4.5 4.5 0 0 0 3 10.5 4.5 4.5 0 0 0 7.5 15c2.02 0 3.68-1.19 5.06-2.73l.44-.47.44.47C14.82 13.81 16.48 15 18.5 15A4.5 4.5 0 0 0 23 10.5 4.5 4.5 0 0 0 18.5 6zm-11 7c-1.38 0-2.5-1.12-2.5-2.5S6.12 8 7.5 8c1.27 0 2.34.9 3.53 2.24l.47.52-.47.52C9.84 12.1 8.77 13 7.5 13zm11 0c-1.27 0-2.34-.9-3.53-2.24l-.47-.52.47-.52C17.16 8.9 18.23 8 19.5 8c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13z"/></svg>'
                : (profile?.searchLimit || 5) - (profile?.searchCount || 0)
              }
            </div>
            <p class="text-sm text-gray-400">Remaining</p>
          </div>
        </div>
        
        ${!profile?.verified ? `
        <div class="mt-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/30">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm font-medium text-white">Searches Reset In</span>
            </div>
          </div>
          <div id="countdownTimer" class="text-2xl font-bold text-primary text-center" data-reset-time="${(() => {
            const resetTime = profile?.lastResetTime?.seconds ? profile.lastResetTime.seconds * 1000 : Date.now();
            console.log('Setting timer data-reset-time:', resetTime, 'Profile lastResetTime:', profile?.lastResetTime);
            return resetTime;
          })()}">
            Loading...
          </div>
          <p class="text-xs text-gray-400 text-center mt-2">Your 5 free searches will be restored</p>
        </div>
        ` : ''}
      </div>

      <!-- Quick Actions -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-white mb-3">Quick Actions</h3>
        <div class="space-y-3">
          <button onclick="loadPage('history')" class="w-full bg-surface rounded-xl p-4 border border-gray-800 hover:border-primary/50 transition text-left flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span class="text-white font-medium">View Search History</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <button onclick="loadPage('settings')" class="w-full bg-surface rounded-xl p-4 border border-gray-800 hover:border-primary/50 transition text-left flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="text-white font-medium">App Settings</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Logout Section -->
      <div class="mb-6">
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
          <button onclick="logout()" class="w-full bg-red-500/20 text-red-400 font-medium py-2.5 rounded-lg hover:bg-red-500/30 transition border border-red-500/50 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout from App
          </button>
        </div>
      </div>

      <!-- Account Info -->
      <div class="bg-surface rounded-xl p-4 border border-gray-800">
        <h3 class="text-sm font-semibold text-gray-400 mb-3">ACCOUNT INFORMATION</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-400">Member Since</span>
            <span class="text-white">${memberSince}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Last Active</span>
            <span class="text-white">${lastActive}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">User ID</span>
            <span class="text-white text-xs">${firebaseUser.uid.substring(0, 8)}...</span>
          </div>
        </div>
      </div>

      <!-- Ad Section in Profile -->
      <div class="mt-6 bg-surface rounded-2xl p-4 border border-gray-800">
        <div class="text-center mb-3">
          <span class="text-xs text-gray-400 uppercase tracking-wide">Sponsored Content</span>
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

      <!-- Native Banner -->
      <div class="mt-6 bg-surface rounded-2xl p-4 border border-gray-800">
        <script async="async" data-cfasync="false" src="//femalesfellowship.com/551a0174af27101ed7c1aa175a5785b8/invoke.js"></script>
        <div id="container-551a0174af27101ed7c1aa175a5785b8"></div>
      </div>

      <!-- Offers Page Promotion -->
      <div class="mt-6 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-2xl p-6 border border-purple-500/30">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">🎁 Free Rewards Available!</h3>
          <p class="text-gray-400 mb-4 text-sm">Earn points by watching ads and unlock premium features instantly</p>
          <button onclick="loadPage('offers')" class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
            </svg>
            Start Earning Now
          </button>
        </div>
      </div>
    </div>
  `;
}

// Store interval globally so we can clear it
let countdownInterval = null;

// Initialize countdown timer
function initCountdownTimer() {
  // Clear any existing interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  
  const timerElement = document.getElementById('countdownTimer');
  if (!timerElement) {
    console.log('Timer element not found');
    return;
  }
  
  const resetTime = parseInt(timerElement.getAttribute('data-reset-time'));
  console.log('Reset time:', resetTime, 'Current time:', Date.now());
  
  if (!resetTime || isNaN(resetTime)) {
    console.error('Invalid reset time:', resetTime);
    timerElement.textContent = '00:00:00';
    return;
  }
  
  function updateCountdown() {
    if (!document.getElementById('countdownTimer')) {
      // Timer element removed, clear interval
      clearInterval(countdownInterval);
      return;
    }
    
    const now = Date.now();
    const timePassed = now - resetTime;
    const timeRemaining = (24 * 60 * 60 * 1000) - timePassed; // 24 hours in milliseconds
    
    if (timeRemaining <= 0) {
      timerElement.textContent = '00:00:00';
      clearInterval(countdownInterval);
      // Reload profile to show reset
      setTimeout(() => loadPage('profile'), 1000);
      return;
    }
    
    const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
    const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
    
    timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  // Update immediately and then every second
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Make initCountdownTimer globally available
window.initCountdownTimer = initCountdownTimer;

// Get profile from localStorage
function getProfile() {
  const profile = localStorage.getItem('userProfile');
  if (profile) {
    return JSON.parse(profile);
  }
  
  // Default profile
  const defaultProfile = {
    name: 'User',
    email: 'user@example.com',
    memberSince: new Date().toLocaleDateString(),
    lastActive: new Date().toLocaleDateString()
  };
  
  localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
  return defaultProfile;
}

// Get profile statistics
function getProfileStats() {
  const history = localStorage.getItem('searchHistory');
  const searches = history ? JSON.parse(history) : [];
  
  return {
    totalSearches: searches.length,
    successfulSearches: searches.length // In real app, track this separately
  };
}

// Edit profile function
async function editProfile() {
  const firebaseUser = window.FirebaseAuth?.getCurrentUser();
  
  if (!firebaseUser) {
    Dialog.alert('Error', 'You must be logged in to edit your profile', 'error');
    return;
  }
  
  // Get current profile
  const profileResult = await window.FirebaseAuth.getUserProfile(firebaseUser.uid);
  const currentName = profileResult.success ? profileResult.data.name : firebaseUser.displayName || '';
  
  // Create custom edit dialog
  const dialog = document.getElementById('customDialog');
  const icon = document.getElementById('dialogIcon');
  const title = document.getElementById('dialogTitle');
  const message = document.getElementById('dialogMessage');
  const actions = document.getElementById('dialogActions');

  icon.className = 'w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center bg-primary/20';
  icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-primary" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>';
  title.textContent = 'Edit Profile';
  message.innerHTML = `
    <div class="text-left space-y-3 mt-2 sm:mt-4">
      <div>
        <label class="block text-xs sm:text-sm font-medium text-gray-400 mb-1">Name</label>
        <input id="editName" type="text" value="${currentName}" class="w-full px-3 py-2 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary" />
      </div>
      <div>
        <label class="block text-xs sm:text-sm font-medium text-gray-400 mb-1">Email</label>
        <input id="editEmail" type="email" value="${firebaseUser.email}" class="w-full px-3 py-2 text-sm sm:text-base bg-gray-700 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed" disabled />
        <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
      </div>
    </div>
  `;

  actions.innerHTML = `
    <button id="dialogCancel" class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">Cancel</button>
    <button id="dialogSave" class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-primary text-black font-semibold rounded-lg hover:bg-teal-400 transition">Save</button>
  `;

  document.getElementById('dialogCancel').onclick = () => {
    dialog.classList.add('hidden');
    dialog.classList.remove('flex');
  };

  document.getElementById('dialogSave').onclick = async () => {
    const newName = document.getElementById('editName').value.trim();
    
    if (!newName || newName.length < 3) {
      Dialog.alert('Invalid Input', 'Name must be at least 3 characters', 'warning');
      return;
    }
    
    // Disable save button
    const saveBtn = document.getElementById('dialogSave');
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<svg class="animate-spin h-4 w-4 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Saving...';
    
    try {
      // Update Firestore profile
      const result = await window.FirebaseAuth.updateUserProfile(firebaseUser.uid, {
        name: newName
      });
      
      if (result.success) {
        dialog.classList.add('hidden');
        dialog.classList.remove('flex');
        
        Dialog.alert('Success', 'Profile updated successfully!', 'success');
        setTimeout(() => {
          loadPage('profile');
        }, 1500);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      Dialog.alert('Error', 'Failed to update profile. Please try again.', 'error');
      saveBtn.disabled = false;
      saveBtn.innerHTML = 'Save';
    }
  };

  dialog.classList.remove('hidden');
  dialog.classList.add('flex');
}

// Verify account dialog
async function verifyAccountDialog() {
  const firebaseUser = window.FirebaseAuth?.getCurrentUser();
  
  if (!firebaseUser) {
    Dialog.alert('Error', 'You must be logged in to verify your account', 'error');
    return;
  }
  
  const dialog = document.getElementById('customDialog');
  const icon = document.getElementById('dialogIcon');
  const title = document.getElementById('dialogTitle');
  const message = document.getElementById('dialogMessage');
  const actions = document.getElementById('dialogActions');

  icon.className = 'w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center bg-primary/20';
  icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>';
  title.textContent = 'Verify Your Account';
  message.innerHTML = `
    <div class="text-left space-y-3 mt-2 sm:mt-4">
      <p class="text-gray-300 text-sm">Enter your secret key to unlock premium features:</p>
      <ul class="text-xs text-gray-400 space-y-1 ml-4">
        <li>• Unlimited phone number searches</li>
        <li>• Priority support</li>
        <li>• Access to advanced features</li>
      </ul>
      
      <div class="bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-lg p-3 border border-blue-500/30">
        <p class="text-xs text-gray-300 mb-2">Don't have a secret key?</p>
        <a href="https://t.me/But_Kadah" target="_blank" class="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
          </svg>
          Get Secret Key on Telegram
        </a>
      </div>
      
      <div>
        <label class="block text-xs sm:text-sm font-medium text-gray-400 mb-1">Secret Key</label>
        <input id="verifyKey" type="password" placeholder="Enter secret key..." class="w-full px-3 py-2 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary" />
      </div>
      <p id="verifyError" class="text-xs text-red-400 hidden"></p>
    </div>
  `;

  actions.innerHTML = `
    <button id="dialogCancel" class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">Cancel</button>
    <button id="dialogVerify" class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-primary text-black font-semibold rounded-lg hover:bg-teal-400 transition">Verify</button>
  `;

  document.getElementById('dialogCancel').onclick = () => {
    dialog.classList.add('hidden');
    dialog.classList.remove('flex');
  };

  document.getElementById('dialogVerify').onclick = async () => {
    const key = document.getElementById('verifyKey').value.trim();
    const verifyError = document.getElementById('verifyError');
    
    if (!key) {
      verifyError.textContent = 'Please enter a secret key';
      verifyError.classList.remove('hidden');
      return;
    }
    
    const verifyBtn = document.getElementById('dialogVerify');
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<svg class="animate-spin h-4 w-4 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Verifying...';
    verifyError.classList.add('hidden');
    
    try {
      const result = await window.FirebaseAuth.verifyAccount(firebaseUser.uid, key);
      
      if (result.success) {
        dialog.classList.add('hidden');
        dialog.classList.remove('flex');
        
        Dialog.alert('Success', 'Your account has been verified! You now have unlimited searches.', 'success');
        setTimeout(() => {
          loadPage('profile');
        }, 2000);
      } else {
        verifyError.textContent = result.error;
        verifyError.classList.remove('hidden');
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = 'Verify';
      }
    } catch (error) {
      verifyError.textContent = 'Verification failed. Please try again.';
      verifyError.classList.remove('hidden');
      verifyBtn.disabled = false;
      verifyBtn.innerHTML = 'Verify';
    }
  };

  dialog.classList.remove('hidden');
  dialog.classList.add('flex');
}

// Make verifyAccountDialog globally available
window.verifyAccountDialog = verifyAccountDialog;
