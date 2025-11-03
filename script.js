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

    // Add click event to all navigation links
    allToggleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('data-target');
            if (!targetId) return; // Ignore links without a data-target

            // Load the new content
            loadContent(targetId);

            // Update "active" state for ALL toggle links (syncs header and sidebar)
            allToggleLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('data-target') === targetId);
            });
        });
    });

    // Load the default "about-me" content when the page first loads
    loadContent('about-me');
});