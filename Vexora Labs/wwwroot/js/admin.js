/**
 * Vexora Labs Admin Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize any charts if they exist
    initCharts();

    // Initialize tooltips
    initTooltips();

    // Initialize data tables
    initDataTables();

    // Add active class to current sidebar menu item
    highlightCurrentMenuItem();

    // Initialize any dropdowns that aren't using Bootstrap
    initCustomDropdowns();
});

/**
 * Initialize charts using Chart.js
 */
function initCharts() {
    // Check if Chart.js is loaded and if there are any chart canvases
    if (typeof Chart !== 'undefined') {
        // Set default Chart.js options to match our theme
        Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--admin-text').trim();
        Chart.defaults.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--admin-border').trim();

        // Revenue Chart
        const revenueChartEl = document.getElementById('revenueChart');
        if (revenueChartEl) {
            const revenueChart = new Chart(revenueChartEl, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue',
                        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 25000, 30000, 35000, 40000, 50000],
                        borderColor: '#7928CA',
                        backgroundColor: 'rgba(121, 40, 202, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Projects Chart
        const projectsChartEl = document.getElementById('projectsChart');
        if (projectsChartEl) {
            const projectsChart = new Chart(projectsChartEl, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'In Progress', 'On Hold', 'Cancelled'],
                    datasets: [{
                        data: [65, 25, 8, 2],
                        backgroundColor: [
                            '#10b981',
                            '#7928CA',
                            '#f59e0b',
                            '#ef4444'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    },
                    cutout: '75%'
                }
            });
        }

        // Clients Chart
        const clientsChartEl = document.getElementById('clientsChart');
        if (clientsChartEl) {
            const clientsChart = new Chart(clientsChartEl, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'New Clients',
                        data: [5, 8, 12, 7, 10, 15],
                        backgroundColor: '#FF0080'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
    // Check if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    } else {
        // Attempt to load bootstrap from CDN if not already loaded
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.onload = function() {
            console.log('Bootstrap loaded successfully from CDN.');
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        };
        bootstrapScript.onerror = function() {
            console.error('Failed to load Bootstrap from CDN.');
        };
        document.head.appendChild(bootstrapScript);
    }
}

/**
 * Initialize data tables
 */
function initDataTables() {
    // Add your data tables initialization code here if you're using a library like DataTables
}

/**
 * Highlight the current menu item in the sidebar
 */
function highlightCurrentMenuItem() {
    // This is already handled by the Razor code in the layout
    // But you can add additional logic here if needed
}

/**
 * Initialize custom dropdowns not using Bootstrap
 */
function initCustomDropdowns() {
    // Add your custom dropdown initialization code here if needed
}

/**
 * Toggle fullscreen mode
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => {
            console.log(`Error attempting to enable full-screen mode: ${e.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

/**
 * Handle theme switching
 */
function handleThemeSwitch() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    html.classList.toggle('theme-alt');

    if (html.classList.contains('theme-alt')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    localStorage.setItem(
        'theme',
        html.classList.contains('theme-alt') ? 'alt' : 'default'
    );

    // If we have any charts, update them for the new theme
    if (typeof Chart !== 'undefined') {
        Chart.instances.forEach(chart => {
            chart.update();
        });
    }
}

/**
 * Create a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, warning, info)
 * @param {number} duration - How long to show the toast in milliseconds
 */
function showToast(message, type = 'info', duration = 3000) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);

        // Add toast container styles if not in CSS
        const style = document.createElement('style');
        style.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
            }
            .toast {
                padding: 12px 20px;
                border-radius: 8px;
                margin-bottom: 10px;
                min-width: 250px;
                max-width: 350px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: slideInRight 0.3s ease forwards;
            }
            .toast.success { background-color: var(--admin-success); }
            .toast.error { background-color: var(--admin-danger); }
            .toast.warning { background-color: var(--admin-warning); }
            .toast.info { background-color: var(--admin-info); }
            .toast-close {
                background: transparent;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
                margin-left: 10px;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;

    // Add to container
    toastContainer.appendChild(toast);

    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });

    // Auto remove after duration
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }, duration);
}
