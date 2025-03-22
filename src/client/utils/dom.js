// DOM manipulation helpers from your input.js and results.js
export function showLoading(progress = 0) {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.remove('hidden');
      document.getElementById('loadProgress').value = progress;
      document.getElementById('error')?.classList.add('hidden');
      document.getElementById('feedback')?.classList.add('hidden');
    }
  }
  
  export function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
  }
  
  export function showFeedback(message) {
    hideLoading();
    const feedback = document.getElementById('feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.classList.remove('hidden');
      document.getElementById('error')?.classList.add('hidden');
    }
  }
  
  export function showError(message) {
    hideLoading();
    const error = document.getElementById('error');
    if (error) {
      error.textContent = message;
      error.classList.remove('hidden');
      document.getElementById('feedback')?.classList.add('hidden');
    }
  }