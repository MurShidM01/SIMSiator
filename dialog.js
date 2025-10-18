// Custom Dialog System - Loaded early for global access
const Dialog = {
  show: function(options) {
    const dialog = document.getElementById('customDialog');
    const icon = document.getElementById('dialogIcon');
    const title = document.getElementById('dialogTitle');
    const message = document.getElementById('dialogMessage');
    const actions = document.getElementById('dialogActions');

    // Set icon
    icon.className = `w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center ${options.iconBg || 'bg-primary/20'}`;
    icon.innerHTML = options.icon || '';

    // Set content
    title.textContent = options.title || '';
    message.textContent = options.message || '';

    // Set buttons
    actions.innerHTML = '';
    
    if (options.type === 'confirm') {
      // Confirm dialog with two buttons
      actions.innerHTML = `
        <button id="dialogCancel" class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
          ${options.cancelText || 'Cancel'}
        </button>
        <button id="dialogConfirm" class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-primary text-black font-semibold rounded-lg hover:bg-teal-400 transition">
          ${options.confirmText || 'Confirm'}
        </button>
      `;

      document.getElementById('dialogCancel').onclick = () => {
        this.hide();
        if (options.onCancel) options.onCancel();
      };

      document.getElementById('dialogConfirm').onclick = () => {
        this.hide();
        if (options.onConfirm) options.onConfirm();
      };
    } else {
      // Alert dialog with single button
      actions.innerHTML = `
        <button id="dialogOk" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-primary text-black font-semibold rounded-lg hover:bg-teal-400 transition">
          ${options.okText || 'OK'}
        </button>
      `;

      document.getElementById('dialogOk').onclick = () => {
        this.hide();
        if (options.onOk) options.onOk();
      };
    }

    dialog.classList.remove('hidden');
    dialog.classList.add('flex');
  },

  hide: function() {
    const dialog = document.getElementById('customDialog');
    dialog.classList.add('hidden');
    dialog.classList.remove('flex');
  },

  alert: function(title, message, type = 'info') {
    const icons = {
      success: {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>',
        iconBg: 'bg-primary/20'
      },
      error: {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>',
        iconBg: 'bg-red-500/20'
      },
      warning: {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>',
        iconBg: 'bg-yellow-500/20'
      },
      info: {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>',
        iconBg: 'bg-blue-500/20'
      }
    };

    this.show({
      type: 'alert',
      title: title,
      message: message,
      icon: icons[type].icon,
      iconBg: icons[type].iconBg
    });
  },

  confirm: function(title, message, onConfirm, onCancel) {
    this.show({
      type: 'confirm',
      title: title,
      message: message,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>',
      iconBg: 'bg-yellow-500/20',
      onConfirm: onConfirm,
      onCancel: onCancel
    });
  }
};

// Make Dialog available globally
window.Dialog = Dialog;

console.log('Dialog system loaded and available globally');
