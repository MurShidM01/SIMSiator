// Offers Page Component
function renderOffersPage() {
  const userPoints = localStorage.getItem('offerPoints') || 0;
  
  return `
    <div class="max-w-4xl mx-auto">
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-white mb-2">🎁 Special Offers</h2>
        <p class="text-gray-400">Watch ads and complete offers to earn rewards!</p>
      </div>

      <!-- Points Display -->
      <div class="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 mb-6 text-center shadow-lg">
        <div class="flex items-center justify-center gap-3 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
          </svg>
          <h3 class="text-3xl font-bold text-white">${userPoints}</h3>
        </div>
        <p class="text-white/80 text-sm">Points Earned</p>
      </div>

      <!-- Quick Earn Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-surface rounded-2xl p-5 border border-gray-800 text-center">
          <div class="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-white font-bold mb-2">Watch & Earn</h3>
          <p class="text-gray-400 text-sm mb-4">View ads below and claim instant points</p>
          <div id="ad-container-1" class="min-h-[90px] mb-3"></div>
          <button onclick="earnPoints(25, 'quick1')" class="w-full px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
            Claim 25 Points
          </button>
        </div>

        <div class="bg-surface rounded-2xl p-5 border border-gray-800 text-center">
          <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-white font-bold mb-2">Daily Bonus</h3>
          <p class="text-gray-400 text-sm mb-4">Click ads daily for bonus rewards</p>
          <div id="ad-container-2" class="min-h-[90px] mb-3"></div>
          <button onclick="earnPoints(30, 'quick2')" class="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
            Claim 30 Points
          </button>
        </div>
      </div>

      <!-- Ad Section 1 - Banner -->
      <div class="bg-surface rounded-2xl p-4 mb-6 border border-gray-800">
        <div class="text-center mb-3">
          <span class="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            Watch to Earn +15 Points
          </span>
        </div>
        <div id="ad-container-3" class="flex justify-center min-h-[90px]"></div>
        <button onclick="earnPoints(15, 'ad1')" class="w-full mt-3 px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-teal-400 transition">
          Claim 15 Points
        </button>
      </div>

      <!-- Native Banner Ad Section -->
      <div class="bg-surface rounded-2xl p-4 mb-6 border border-gray-800">
        <div class="text-center mb-3">
          <span class="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 text-secondary text-sm font-semibold rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
            Sponsored Offer +20 Points
          </span>
        </div>
        <div id="ad-container-4" class="min-h-[100px]"></div>
        <button onclick="earnPoints(20, 'ad2')" class="w-full mt-3 px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-purple-600 transition">
          Claim 20 Points
        </button>
      </div>

      <!-- Offer Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- Offer Card 1 -->
        <div class="bg-surface rounded-xl p-5 border border-gray-800 hover:border-primary/50 transition">
          <div class="flex items-start gap-3 mb-3">
            <div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-white font-semibold mb-1">Premium Unlock</h3>
              <p class="text-gray-400 text-sm">Get unlimited searches for 24 hours</p>
              <div class="mt-2 flex items-center gap-2">
                <span class="text-yellow-400 font-bold">500 Points</span>
              </div>
            </div>
          </div>
          <button onclick="redeemOffer('premium')" class="w-full px-4 py-2 bg-yellow-500/20 text-yellow-400 font-medium rounded-lg hover:bg-yellow-500/30 transition border border-yellow-500/50">
            Redeem Now
          </button>
        </div>

        <!-- Offer Card 2 -->
        <div class="bg-surface rounded-xl p-5 border border-gray-800 hover:border-primary/50 transition">
          <div class="flex items-start gap-3 mb-3">
            <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-white font-semibold mb-1">+10 Extra Searches</h3>
              <p class="text-gray-400 text-sm">Add 10 searches to your daily limit</p>
              <div class="mt-2 flex items-center gap-2">
                <span class="text-primary font-bold">200 Points</span>
              </div>
            </div>
          </div>
          <button onclick="redeemOffer('searches')" class="w-full px-4 py-2 bg-primary/20 text-primary font-medium rounded-lg hover:bg-primary/30 transition border border-primary/50">
            Redeem Now
          </button>
        </div>

        <!-- Offer Card 3 -->
        <div class="bg-surface rounded-xl p-5 border border-gray-800 hover:border-secondary/50 transition">
          <div class="flex items-start gap-3 mb-3">
            <div class="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-white font-semibold mb-1">Verification Badge</h3>
              <p class="text-gray-400 text-sm">Get instant account verification</p>
              <div class="mt-2 flex items-center gap-2">
                <span class="text-secondary font-bold">1000 Points</span>
              </div>
            </div>
          </div>
          <button onclick="redeemOffer('verification')" class="w-full px-4 py-2 bg-secondary/20 text-secondary font-medium rounded-lg hover:bg-secondary/30 transition border border-secondary/50">
            Redeem Now
          </button>
        </div>

        <!-- Offer Card 4 -->
        <div class="bg-surface rounded-xl p-5 border border-gray-800 hover:border-primary/50 transition">
          <div class="flex items-start gap-3 mb-3">
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-white font-semibold mb-1">Special Bonus</h3>
              <p class="text-gray-400 text-sm">Mystery reward - Could be anything!</p>
              <div class="mt-2 flex items-center gap-2">
                <span class="text-green-400 font-bold">300 Points</span>
              </div>
            </div>
          </div>
          <button onclick="redeemOffer('bonus')" class="w-full px-4 py-2 bg-green-500/20 text-green-400 font-medium rounded-lg hover:bg-green-500/30 transition border border-green-500/50">
            Redeem Now
          </button>
        </div>
      </div>

      <!-- Another Ad Section -->
      <div class="bg-surface rounded-2xl p-4 mb-6 border border-gray-800">
        <div class="text-center mb-3">
          <span class="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-semibold rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
            Triple Points! Earn +35 Points
          </span>
        </div>
        <div id="ad-container-5" class="flex justify-center min-h-[90px]"></div>
        <button onclick="earnPoints(35, 'ad3')" class="w-full mt-3 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition">
          🎉 Claim Triple Points
        </button>
      </div>

      <!-- More External Offers -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <a href="https://femalesfellowship.com/t6qq82crr?key=290af80b678c8951350789ec11789d6f" 
           target="_blank"
           onclick="earnPoints(10, 'external1')"
           class="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-5 border border-blue-500/30 hover:border-blue-500/50 transition text-center group">
          <div class="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </div>
          <h3 class="text-white font-bold mb-1 text-sm">Visit Partner #1</h3>
          <p class="text-gray-400 text-xs mb-2">Earn 10 Points</p>
          <div class="text-blue-400 text-xs font-semibold">Click Now →</div>
        </a>

        <a href="https://femalesfellowship.com/t6qq82crr?key=290af80b678c8951350789ec11789d6f" 
           target="_blank"
           onclick="earnPoints(10, 'external2')"
           class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-5 border border-purple-500/30 hover:border-purple-500/50 transition text-center group">
          <div class="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-white font-bold mb-1 text-sm">Special Offer #2</h3>
          <p class="text-gray-400 text-xs mb-2">Earn 10 Points</p>
          <div class="text-purple-400 text-xs font-semibold">Click Now →</div>
        </a>

        <a href="https://femalesfellowship.com/t6qq82crr?key=290af80b678c8951350789ec11789d6f" 
           target="_blank"
           onclick="earnPoints(15, 'external3')"
           class="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-5 border border-green-500/30 hover:border-green-500/50 transition text-center group">
          <div class="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-white font-bold mb-1 text-sm">Premium Deal #3</h3>
          <p class="text-gray-400 text-xs mb-2">Earn 15 Points</p>
          <div class="text-green-400 text-xs font-semibold">Click Now →</div>
        </a>
      </div>

      <!-- External Offers Link -->
      <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/30 text-center">
        <h3 class="text-xl font-bold text-white mb-2">Want More Offers?</h3>
        <p class="text-gray-400 mb-4">Visit our partner site for exclusive deals and earn even more points!</p>
        <a href="https://femalesfellowship.com/t6qq82crr?key=290af80b678c8951350789ec11789d6f" 
           target="_blank"
           onclick="earnPoints(5, 'external')"
           class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-lg hover:from-teal-400 hover:to-purple-400 transition transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          Explore More Offers (+5 Points)
        </a>
      </div>

      <!-- Info Box -->
      <div class="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div>
            <p class="text-blue-300 font-semibold text-sm mb-1">How to Earn Points?</p>
            <ul class="text-blue-200/80 text-xs space-y-1">
              <li>• View ads and click "Claim Points" button</li>
              <li>• Complete offers from partner sites</li>
              <li>• Redeem points for premium features</li>
              <li>• Points never expire - Save up for big rewards!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Earn points function
function earnPoints(points, adId) {
  // Check if already claimed
  const claimed = localStorage.getItem(`claimed_${adId}`);
  if (claimed) {
    Dialog.alert('Already Claimed', 'You have already claimed points from this ad. Check back later for new offers!', 'warning');
    return;
  }

  // Add points
  const currentPoints = parseInt(localStorage.getItem('offerPoints') || 0);
  const newPoints = currentPoints + points;
  localStorage.setItem('offerPoints', newPoints);
  
  // Mark as claimed
  localStorage.setItem(`claimed_${adId}`, 'true');
  
  // Show success message
  Dialog.alert(
    'Points Earned! 🎉',
    `You earned ${points} points! Your total is now ${newPoints} points.`,
    'success'
  );
  
  // Reload page to update display
  setTimeout(() => {
    loadPage('offers');
  }, 1500);
}

// Redeem offer function
function redeemOffer(offerType) {
  const currentPoints = parseInt(localStorage.getItem('offerPoints') || 0);
  let cost = 0;
  let offerName = '';
  let action = null;
  
  switch(offerType) {
    case 'premium':
      cost = 500;
      offerName = 'Premium Unlock (24h)';
      action = () => {
        const expiryTime = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        localStorage.setItem('premiumUntil', expiryTime);
        Dialog.alert('Premium Activated! 🌟', 'You now have unlimited searches for the next 24 hours!', 'success');
      };
      break;
    case 'searches':
      cost = 200;
      offerName = '+10 Extra Searches';
      action = async () => {
        const firebaseUser = window.FirebaseAuth?.getCurrentUser();
        if (firebaseUser) {
          const profileResult = await window.FirebaseAuth.getUserProfile(firebaseUser.uid);
          if (profileResult.success) {
            const currentLimit = profileResult.data.searchLimit || 5;
            await window.FirebaseAuth.updateUserProfile(firebaseUser.uid, {
              searchLimit: currentLimit + 10
            });
            Dialog.alert('Searches Added! 🔍', 'You got 10 extra searches added to your account!', 'success');
          }
        }
      };
      break;
    case 'verification':
      cost = 1000;
      offerName = 'Verification Badge';
      action = async () => {
        const firebaseUser = window.FirebaseAuth?.getCurrentUser();
        if (firebaseUser) {
          await window.FirebaseAuth.updateUserProfile(firebaseUser.uid, {
            verified: true,
            verificationMethod: 'points_redeem'
          });
          Dialog.alert('Account Verified! ✅', 'Congratulations! Your account is now verified with unlimited searches!', 'success');
          setTimeout(() => loadPage('profile'), 2000);
        }
      };
      break;
    case 'bonus':
      cost = 300;
      offerName = 'Mystery Bonus';
      action = () => {
        const bonuses = [
          { name: '50 Bonus Points', points: 50 },
          { name: '100 Bonus Points', points: 100 },
          { name: '5 Extra Searches', searches: 5 },
          { name: 'Lucky Spin Again', points: 300 }
        ];
        const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
        
        if (bonus.points) {
          const current = parseInt(localStorage.getItem('offerPoints') || 0);
          localStorage.setItem('offerPoints', current + bonus.points);
          Dialog.alert('Mystery Bonus! 🎁', `You won ${bonus.name}!`, 'success');
        } else if (bonus.searches) {
          Dialog.alert('Mystery Bonus! 🎁', `You won ${bonus.name}!`, 'success');
        }
        
        setTimeout(() => loadPage('offers'), 2000);
      };
      break;
  }
  
  if (currentPoints < cost) {
    Dialog.alert(
      'Insufficient Points',
      `You need ${cost} points to redeem ${offerName}. You currently have ${currentPoints} points. Watch more ads to earn points!`,
      'warning'
    );
    return;
  }
  
  Dialog.confirm(
    'Redeem Offer?',
    `Are you sure you want to redeem ${offerName} for ${cost} points?`,
    () => {
      // Deduct points
      localStorage.setItem('offerPoints', currentPoints - cost);
      
      // Execute action
      if (action) action();
      
      // Reload page
      setTimeout(() => {
        loadPage('offers');
      }, 2000);
    }
  );
}

// Initialize offers page ads
function initOffersPage() {
  console.log('Initializing offers page ads...');
  
  // Load ads into containers
  setTimeout(() => {
    // Ad Container 1
    loadBannerAd('ad-container-1');
    
    // Ad Container 2
    loadBannerAd('ad-container-2');
    
    // Ad Container 3
    loadBannerAd('ad-container-3');
    
    // Ad Container 4 - Native
    loadNativeAd('ad-container-4');
    
    // Ad Container 5
    loadBannerAd('ad-container-5');
  }, 100);
}

// Load banner ad into container
function loadBannerAd(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
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

// Load native ad into container
function loadNativeAd(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const script = document.createElement('script');
  script.async = true;
  script.setAttribute('data-cfasync', 'false');
  script.src = '//femalesfellowship.com/551a0174af27101ed7c1aa175a5785b8/invoke.js';
  container.appendChild(script);
  
  const div = document.createElement('div');
  div.id = 'container-551a0174af27101ed7c1aa175a5785b8';
  container.appendChild(div);
}

// Make functions globally available
window.earnPoints = earnPoints;
window.redeemOffer = redeemOffer;
window.initOffersPage = initOffersPage;
