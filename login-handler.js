// Login Handler for Firebase Authentication
// This file handles the login and registration UI logic
console.log('=== LOGIN HANDLER VERSION 2.0 LOADED ===');

// Wait for Firebase to be ready
let firebaseReady = false;
window.addEventListener('firebaseReady', () => {
  firebaseReady = true;
  console.log('Firebase is ready for authentication');
});

// Initialize login page
function initLogin() {
  console.log('Initializing login handlers...');
  
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (!loginTab || !registerTab || !loginForm || !registerForm) {
    console.error('Login form elements not found');
    return;
  }
  
  // Set initial colors with inline styles (for mobile compatibility)
  loginTab.style.backgroundColor = '#00C9A7';
  loginTab.style.color = '#000000';
  
  // Tab switching
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('bg-primary', 'text-black');
    loginTab.classList.remove('bg-gray-800', 'text-gray-400');
    loginTab.style.backgroundColor = '#00C9A7';
    loginTab.style.color = '#000000';
    
    registerTab.classList.add('bg-gray-800', 'text-gray-400');
    registerTab.classList.remove('bg-primary', 'text-black');
    registerTab.style.backgroundColor = '';
    registerTab.style.color = '';
    
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  });
  
  registerTab.addEventListener('click', () => {
    registerTab.classList.add('bg-primary', 'text-black');
    registerTab.classList.remove('bg-gray-800', 'text-gray-400');
    registerTab.style.backgroundColor = '#00C9A7';
    registerTab.style.color = '#000000';
    
    loginTab.classList.add('bg-gray-800', 'text-gray-400');
    loginTab.classList.remove('bg-primary', 'text-black');
    loginTab.style.backgroundColor = '';
    loginTab.style.color = '';
    
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });
  
  // Password visibility toggles
  setupPasswordToggle('toggleLoginPassword', 'loginPassword');
  setupPasswordToggle('toggleRegisterPassword', 'registerPassword');
  
  // Handle login form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check if Firebase is ready
    if (!window.FirebaseAuth) {
      Dialog.alert('Error', 'Firebase is still loading. Please wait a moment and try again.', 'warning');
      return;
    }
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const loginError = document.getElementById('loginError');
    const loginBtn = document.getElementById('loginBtn');
    
    // Disable button and show loading
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Logging in...';
    loginError.classList.add('hidden');
    
    try {
      const result = await window.FirebaseAuth.loginUser(email, password);
      
      if (result.success) {
        loginError.classList.add('hidden');
        Dialog.alert('Success', `Welcome back, ${result.user.displayName || 'User'}!`, 'success');
        
        setTimeout(() => {
          showMainApp();
        }, 1500);
      } else {
        // Handle login failure
        const errorMessage = result.error || 'Login failed';
        console.log('Login failed - Error message:', errorMessage);
        console.log('Checking for invalid-credential:', errorMessage.includes('invalid-credential'));
        console.log('Dialog available?', typeof Dialog !== 'undefined');
        
        const errorMsg = getErrorMessage(errorMessage);
        loginError.textContent = errorMsg;
        loginError.classList.remove('hidden');
        
        // Show dialog for specific errors
        if (errorMessage.includes('user-not-found') || errorMessage.includes('not-found')) {
          console.log('Showing user-not-found dialog');
          Dialog.alert('User Not Registered', 'No account exists with this email. Please register first.', 'warning');
        } else if (errorMessage.includes('invalid-credential')) {
          console.log('Showing invalid-credential dialog');
          Dialog.alert('User Not Registered', 'This email is not registered. Please create an account first.', 'warning');
        } else if (errorMessage.includes('wrong-password')) {
          console.log('Showing wrong-password dialog');
          Dialog.alert('Invalid Password', 'Incorrect password. Please try again.', 'error');
        } else {
          console.log('Showing generic login failed dialog');
          Dialog.alert('Login Failed', errorMsg, 'error');
        }
        
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg> Login';
      }
    } catch (error) {
      console.error('Login exception:', error);
      const errorMsg = getErrorMessage(error.message);
      loginError.textContent = errorMsg;
      loginError.classList.remove('hidden');
      
      Dialog.alert('Login Error', 'An unexpected error occurred. Please try again.', 'error');
      
      loginBtn.disabled = false;
      loginBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg> Login';
    }
  });
  
  // Handle register form submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check if Firebase is ready
    if (!window.FirebaseAuth) {
      Dialog.alert('Error', 'Firebase is still loading. Please wait a moment and try again.', 'warning');
      return;
    }
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const registerError = document.getElementById('registerError');
    const registerBtn = document.getElementById('registerBtn');
    
    // Validate name
    if (name.length < 3) {
      registerError.textContent = 'Name must be at least 3 characters';
      registerError.classList.remove('hidden');
      return;
    }
    
    // Disable button and show loading
    registerBtn.disabled = true;
    registerBtn.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Creating account...';
    registerError.classList.add('hidden');
    
    try {
      console.log('Attempting to register user:', email);
      const result = await window.FirebaseAuth.registerUser(email, password, name);
      
      if (result.success) {
        registerError.classList.add('hidden');
        Dialog.alert('Success', `Account created successfully! Welcome, ${name}!`, 'success');
        
        setTimeout(() => {
          showMainApp();
        }, 1500);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMsg = getErrorMessage(error.message);
      registerError.textContent = errorMsg;
      registerError.classList.remove('hidden');
      
      // Show dialog for specific errors
      if (error.message.includes('email-already-in-use')) {
        Dialog.alert('Email Already Registered', 'An account with this email already exists. Please login instead.', 'warning');
      }
      
      registerBtn.disabled = false;
      registerBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" /></svg> Create Account';
    }
  });
  
  console.log('Login handlers initialized successfully');
}

// Setup password visibility toggle
function setupPasswordToggle(buttonId, inputId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(inputId);
  
  if (button && input) {
    button.addEventListener('click', () => {
      const type = input.type === 'password' ? 'text' : 'password';
      input.type = type;
      
      button.innerHTML = type === 'text'
        ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>';
    });
  }
}

// Get user-friendly error messages
function getErrorMessage(error) {
  const errors = {
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'User not registered',
    'auth/wrong-password': 'Incorrect password',
    'auth/email-already-in-use': 'Email already registered',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/network-request-failed': 'Network error. Please check your connection',
    'auth/too-many-requests': 'Too many attempts. Please try again later',
    'auth/invalid-credential': 'User not registered or incorrect password'
  };
  
  for (const [key, message] of Object.entries(errors)) {
    if (error.includes(key)) return message;
  }
  
  return error || 'An error occurred. Please try again.';
}

// Make functions available globally
window.initLogin = initLogin;
