// 1. Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
});

// 2. Panel Toggling Logic (NEW UNIFIED FUNCTION)
// This function now handles both the header and sidebar nav, keeping them in sync.
function setupPanelToggling() {
    // Get all links that can toggle a panel (from header and sidebar)
    // The "My LinkedIn" link is excluded because it lacks a 'data-target' attribute.
    const allToggleLinks = document.querySelectorAll('.sidebar-nav a, .main-nav a[data-target]');
    const allContentPanels = document.querySelectorAll('.content-panel');

    allToggleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('data-target');
            if (!targetId) return; // Safety check

            // Update content panel "active" state
            allContentPanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === targetId);
            });

            // Update "active" state for ALL toggle links (syncs header and sidebar)
            allToggleLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('data-target') === targetId);
            });
        });
    });
}

// Run the new setup
setupPanelToggling();