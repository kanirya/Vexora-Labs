/**
 * Vexora Labs Admin Dashboard JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
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
    if (typeof Chart !== "undefined") {
        // Set default Chart.js options to match our theme
        Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue("--admin-text").trim();
        Chart.defaults.borderColor = getComputedStyle(document.documentElement).getPropertyValue("--admin-border").trim();

        // Revenue Chart
        const revenueChartEl = document.getElementById("revenueChart");
        if (revenueChartEl) {
            const revenueChart = new Chart(revenueChartEl, {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            label: "Revenue",
                            data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 25000, 30000, 35000, 40000, 50000],
                            borderColor: "#7928CA",
                            backgroundColor: "rgba(121, 40, 202, 0.1)",
                            tension: 0.4,
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            titleColor: "#1e293b",
                            bodyColor: "#334155",
                            borderColor: "#e2e8f0",
                            borderWidth: 1,
                            padding: 12,
                            boxPadding: 6,
                            usePointStyle: true,
                            callbacks: {
                                label: function(context) {
                                    return `$${context.parsed.y.toLocaleString()}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                            },
                            ticks: {
                                callback: (value) => "$" + value.toLocaleString(),
                            },
                        },
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                },
            });

            // Update chart when theme changes
            document.getElementById('themeToggle').addEventListener('click', () => {
                setTimeout(() => {
                    revenueChart.update();
                }, 300);
            });
        }

        // Projects Chart
        const projectsChartEl = document.getElementById("projectsChart");
        if (projectsChartEl) {
            const projectsChart = new Chart(projectsChartEl, {
                type: "doughnut",
                data: {
                    labels: ["Completed", "In Progress", "On Hold", "Cancelled"],
                    datasets: [
                        {
                            data: [65, 25, 8, 2],
                            backgroundColor: ["#10b981", "#7928CA", "#f59e0b", "#ef4444"],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: "circle",
                            },
                        },
                        tooltip: {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            titleColor: "#1e293b",
                            bodyColor: "#334155",
                            borderColor: "#e2e8f0",
                            borderWidth: 1,
                            padding: 12,
                            boxPadding: 6,
                            usePointStyle: true,
                        }
                    },
                    cutout: "75%",
                },
            });

            // Update chart when theme changes
            document.getElementById('themeToggle').addEventListener('click', () => {
                setTimeout(() => {
                    projectsChart.update();
                }, 300);
            });
        }

        // Clients Chart
        const clientsChartEl = document.getElementById("clientsChart");
        if (clientsChartEl) {
            const clientsChart = new Chart(clientsChartEl, {
                type: "bar",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                        {
                            label: "New Clients",
                            data: [5, 8, 12, 7, 10, 15],
                            backgroundColor: "#FF0080",
                            borderRadius: 4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            titleColor: "#1e293b",
                            bodyColor: "#334155",
                            borderColor: "#e2e8f0",
                            borderWidth: 1,
                            padding: 12,
                            boxPadding: 6,
                            usePointStyle: true,
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                            },
                        },
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                },
            });

            // Update chart when theme changes
            document.getElementById('themeToggle').addEventListener('click', () => {
                setTimeout(() => {
                    clientsChart.update();
                }, 300);
            });
        }
    }
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
    // Check if Bootstrap is loaded
    if (typeof bootstrap !== "undefined") {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
    } else {
        console.warn("Bootstrap is not loaded. Tooltips will not be initialized.");
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
        document.documentElement.requestFullscreen().catch((e) => {
            console.log(`Error attempting to enable full-screen mode: ${e.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

/**
 * Create a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, warning, info)
 * @param {number} duration - How long to show the toast in milliseconds
 */
function showToast(message, type = "info", duration = 3000) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);

        // Add toast container styles if not in CSS
        const style = document.createElement("style");
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
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close">&times;</button>
  `;

    // Add to container
    toastContainer.appendChild(toast);

    // Add close button functionality
    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.addEventListener("click", () => {
        toast.style.animation = "fadeOut 0.3s ease forwards";
        setTimeout(() => {
            toast.remove();
        }, 300);
    });

    // Auto remove after duration
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = "fadeOut 0.3s ease forwards";
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }, duration);
}
// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('theme-dark');
        themeText.textContent = 'Light Mode';
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('theme-dark');
        const isDark = body.classList.contains('theme-dark');
        themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        const iconContainer = themeToggle.querySelector('svg');
        if (isDark) {
            iconContainer.innerHTML = '<path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>';
        } else {
            iconContainer.innerHTML = '<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>';
        }
    }