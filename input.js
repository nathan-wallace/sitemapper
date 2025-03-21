(() => {
    const elements = {
        urlForm: document.getElementById('urlForm'),
        uploadForm: document.getElementById('uploadForm'),
        sitemapUrl: document.getElementById('sitemapUrl'),
        sitemapFile: document.getElementById('sitemapFile'),
        clearCacheBtn: document.getElementById('clearCacheBtn'),
        feedback: document.getElementById('feedback'),
        loading: document.getElementById('loading'),
        loadProgress: document.getElementById('loadProgress'),
        error: document.getElementById('error'),
        themeToggleBtn: document.getElementById('themeToggleBtn')
    };

    function showLoading(progress = 0) {
        elements.loading.classList.remove('hidden');
        elements.loadProgress.value = progress;
        elements.error.classList.add('hidden');
        elements.feedback.classList.add('hidden');
    }

    function hideLoading() {
        elements.loading.classList.add('hidden');
    }

    function showFeedback(message) {
        hideLoading();
        elements.feedback.textContent = message;
        elements.feedback.classList.remove('hidden');
        elements.error.classList.add('hidden');
    }

    function showError(message) {
        hideLoading();
        elements.error.textContent = message;
        elements.error.classList.remove('hidden');
        elements.feedback.classList.add('hidden');
    }

    // Check for error or feedback in URL query string on page load
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('error');
    const feedbackMessage = urlParams.get('feedback');
    if (errorMessage) {
        showError(decodeURIComponent(errorMessage));
    } else if (feedbackMessage) {
        showFeedback(decodeURIComponent(feedbackMessage));
    }

    elements.urlForm.addEventListener('submit', (e) => {
        if (!elements.sitemapUrl.value.trim()) {
            e.preventDefault();
            showError('Please enter a sitemap URL');
        } else {
            showLoading(10);
        }
    });

    elements.uploadForm.addEventListener('submit', (e) => {
        if (!elements.sitemapFile.files.length) {
            e.preventDefault();
            showError('Please select a sitemap file');
        } else {
            showLoading(10);
        }
    });

    elements.clearCacheBtn.addEventListener('click', () => {
        showLoading(10);
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/clear-cache';
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
    });

    elements.themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    hideLoading();
})();