// Home Page Component
function renderHomePage() {
  return `
    <div class="max-w-md mx-auto">
      <div class="mb-8 text-center">
        <h2 class="text-2xl font-bold text-white mb-2">Phone Data Finder</h2>
        <p class="text-gray-400">Enter a phone number to find detailed information</p>
      </div>

      <!-- Banner 728x90 Ad -->
      <div class="w-full flex justify-center mb-6 overflow-hidden">
        <div id="home-ad-banner" class="inline-block min-h-[90px]"></div>
      </div>

      <div class="bg-surface rounded-2xl shadow-lg p-6 border border-gray-800 slide-up">
        <div class="space-y-4">
          <div>
            <label for="number" class="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
            <input
              id="number"
              type="tel"
              placeholder="03XXXXXXXXX (11 digits)"
              maxlength="11"
              class="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-primary transition"
            />
            <div id="validationMessage" class="mt-2 text-sm hidden"></div>
          </div>
          
          <button
            id="fetchBtn"
            class="w-full bg-primary text-black font-semibold py-3 rounded-lg hover:bg-teal-400 transition transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
            Fetch Data
          </button>
        </div>

        <div id="spinner" class="hidden mt-6 flex justify-center">
          <div class="w-10 h-10 border-4 border-gray-700 border-t-primary rounded-full animate-spin"></div>
        </div>

        <div id="output" class="hidden mt-6 bg-gray-900 rounded-xl p-5 border border-gray-800 shadow-inner"></div>
      </div>

      <!-- Features Section -->
      <div class="mt-8 grid grid-cols-2 gap-4">
        <div class="bg-surface rounded-xl p-4 border border-gray-800 text-center">
          <div class="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-sm font-medium text-white">Secure</h3>
        </div>
        
        <div class="bg-surface rounded-xl p-4 border border-gray-800 text-center">
          <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-sm font-medium text-white">Fast</h3>
        </div>
      </div>
    </div>
  `;
}

// Home page functionality
function initHomePage() {
  const fetchBtn = document.getElementById('fetchBtn');
  const numberInput = document.getElementById('number');
  const validationMessage = document.getElementById('validationMessage');
  
  if (fetchBtn && numberInput) {
    // Update button state
    const updateButtonState = (isValid) => {
      if (isValid) {
        fetchBtn.disabled = false;
        fetchBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        fetchBtn.classList.add('hover:bg-teal-400', 'transform', 'hover:scale-[1.02]');
      } else {
        fetchBtn.disabled = true;
        fetchBtn.classList.add('opacity-50', 'cursor-not-allowed');
        fetchBtn.classList.remove('hover:bg-teal-400', 'transform', 'hover:scale-[1.02]');
      }
    };
    
    // Initial state
    updateButtonState(false);
    
    // Real-time validation
    numberInput.addEventListener('input', (e) => {
      const value = e.target.value;
      const cleaned = value.replace(/[\s-]/g, '');
      
      // Remove border colors first
      numberInput.classList.remove('border-red-500', 'border-primary', 'border-gray-700');
      validationMessage.classList.add('hidden');
      
      if (value.length === 0) {
        numberInput.classList.add('border-gray-700');
        updateButtonState(false);
        return;
      }
      
      // Check for non-digits
      if (!/^\d+$/.test(cleaned)) {
        numberInput.classList.add('border-red-500');
        validationMessage.className = 'mt-2 text-sm text-red-400';
        validationMessage.textContent = 'Only digits allowed';
        validationMessage.classList.remove('hidden');
        updateButtonState(false);
        return;
      }
      
      // Check if starts with 03
      if (cleaned.length >= 2 && !cleaned.startsWith('03')) {
        numberInput.classList.add('border-red-500');
        validationMessage.className = 'mt-2 text-sm text-red-400';
        validationMessage.textContent = 'Must start with 03';
        validationMessage.classList.remove('hidden');
        updateButtonState(false);
        return;
      }
      
      // Check length
      if (cleaned.length < 11) {
        numberInput.classList.add('border-gray-700');
        validationMessage.className = 'mt-2 text-sm text-gray-400';
        validationMessage.textContent = `${cleaned.length}/11 digits`;
        validationMessage.classList.remove('hidden');
        updateButtonState(false);
        return;
      }
      
      if (cleaned.length === 11) {
        numberInput.classList.add('border-primary');
        validationMessage.className = 'mt-2 text-sm text-primary';
        validationMessage.textContent = 'Valid phone number';
        validationMessage.classList.remove('hidden');
        updateButtonState(true);
      }
    });
    
    fetchBtn.addEventListener('click', fetchData);
    numberInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !fetchBtn.disabled) fetchData();
    });
  }
  
  // Load home page ad
  setTimeout(() => {
    const container = document.getElementById('home-ad-banner');
    if (container) {
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.innerHTML = `
        atOptions = {
          'key' : 'e3a604d94aefc677ef350394704cd944',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      container.appendChild(script1);
      
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = '//femalesfellowship.com/e3a604d94aefc677ef350394704cd944/invoke.js';
      container.appendChild(script2);
    }
  }, 100);
}
