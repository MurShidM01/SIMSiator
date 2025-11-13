// History Page Component
function renderHistoryPage() {
  const searchHistory = getSearchHistory();
  
  return `
    <div class="max-w-md mx-auto">
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-white mb-2">Search History</h2>
        <p class="text-gray-400">Your recent phone number searches</p>
      </div>

      <div class="space-y-3">
        ${searchHistory.length > 0 ? searchHistory.map((item, index) => `
          <div class="bg-surface rounded-xl p-4 border border-gray-800 hover:border-primary/50 transition">
            <div class="flex items-center justify-between">
              <div class="flex items-center flex-1">
                <div class="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p class="text-white font-medium">${item.number}</p>
                  <p class="text-sm text-gray-400">${item.date}</p>
                </div>
              </div>
              <button onclick="deleteHistoryItem(${index})" class="text-red-400 hover:text-red-300 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        `).join('') : `
          <div class="bg-surface rounded-xl p-8 border border-gray-800 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-gray-400">No search history yet</p>
            <p class="text-sm text-gray-500 mt-2">Your searches will appear here</p>
          </div>
        `}
      </div>

      ${searchHistory.length > 0 ? `
        <button onclick="clearHistory()" class="w-full mt-6 bg-red-500/20 text-red-400 font-semibold py-3 rounded-lg hover:bg-red-500/30 transition border border-red-500/50">
          Clear All History
        </button>
      ` : ''}

      <!-- Ad Section -->
      <div class="mt-6 bg-surface rounded-2xl p-4 border border-gray-800">
        <div class="text-center mb-3">
          <span class="text-xs text-gray-400 uppercase tracking-wide">Sponsored</span>
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

      <!-- Earn Points CTA -->
      <div class="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/30 text-center">
        <h3 class="text-lg font-bold text-white mb-2">💰 Earn Rewards!</h3>
        <p class="text-gray-400 mb-4 text-sm">Watch ads and complete offers to unlock premium features</p>
        <button onclick="loadPage('offers')" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-lg hover:from-teal-400 hover:to-purple-400 transition transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
          </svg>
          Visit Offers Page
        </button>
      </div>
    </div>
  `;
}

// Get search history from localStorage
function getSearchHistory() {
  const history = localStorage.getItem('searchHistory');
  return history ? JSON.parse(history) : [];
}

// Add to search history
function addToHistory(number) {
  const history = getSearchHistory();
  const date = new Date().toLocaleString();
  
  // Avoid duplicates
  const existingIndex = history.findIndex(item => item.number === number);
  if (existingIndex !== -1) {
    history.splice(existingIndex, 1);
  }
  
  history.unshift({ number, date });
  
  // Keep only last 20 searches
  if (history.length > 20) {
    history.pop();
  }
  
  localStorage.setItem('searchHistory', JSON.stringify(history));
}

// Delete history item
function deleteHistoryItem(index) {
  const history = getSearchHistory();
  const item = history[index];
  
  Dialog.confirm(
    'Delete Search',
    `Are you sure you want to delete "${item.number}" from your search history?`,
    () => {
      history.splice(index, 1);
      localStorage.setItem('searchHistory', JSON.stringify(history));
      loadPage('history');
      Dialog.alert('Deleted', 'Search history item has been deleted successfully', 'success');
    }
  );
}

// Clear all history
function clearHistory() {
  Dialog.confirm(
    'Clear All History',
    'Are you sure you want to clear all search history? This action cannot be undone.',
    () => {
      localStorage.removeItem('searchHistory');
      loadPage('history');
      Dialog.alert('Cleared', 'All search history has been cleared successfully', 'success');
    }
  );
}
