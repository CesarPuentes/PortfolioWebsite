// 1. Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
});

// 2. Content Loading and Panel Toggling
document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');
    const allToggleLinks = document.querySelectorAll('.sidebar-nav a, .main-nav a[data-target]');

    // Valid section IDs (to prevent loading invalid sections)
    const validSections = ['about-me', 'work-experience', 'portfolio', 'certifications', 'case-studies', 'contact'];

    // Function to fetch and load content
    async function loadContent(targetId) {
        // Set a loading state
        contentContainer.innerHTML = '<p style="padding: 2rem;">Loading...</p>';

        try {
            const response = await fetch(`sections/${targetId}.html`);

            if (!response.ok) {
                throw new Error(`Could not load section: ${response.status}`);
            }

            const html = await response.text();
            contentContainer.innerHTML = html;

        } catch (error) {
            console.error('Error fetching content:', error);
            contentContainer.innerHTML = '<p style="padding: 2rem; color: red;">Error: Could not load content. Please try again.</p>';
        }
    }

    // Function to navigate to a section and update UI state
    function navigateToSection(targetId, updateHash = true) {
        if (!validSections.includes(targetId)) {
            targetId = 'about-me'; // Fallback to default
        }

        // Load the content
        loadContent(targetId);

        // Update the URL hash (without triggering hashchange)
        if (updateHash) {
            history.pushState(null, '', `#${targetId}`);
        }

        // Update "active" state for ALL toggle links (syncs header and sidebar)
        allToggleLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('data-target') === targetId);
        });
    }

    // Add click event to all navigation links
    allToggleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('data-target');
            if (!targetId) return; // Ignore links without a data-target

            navigateToSection(targetId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1); // Remove the '#'
        if (hash && validSections.includes(hash)) {
            navigateToSection(hash, false); // Don't update hash again
        }
    });

    // On page load: check for hash in URL, otherwise load default
    const initialHash = window.location.hash.slice(1);
    if (initialHash && validSections.includes(initialHash)) {
        navigateToSection(initialHash, false);
    } else {
        navigateToSection('about-me', false);
    }
});