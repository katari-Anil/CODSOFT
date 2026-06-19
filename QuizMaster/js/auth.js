/**
 * Authentication Engine & Session Manager
 */

// Initialize empty tracking sets if not existing in Local Storage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}
if (!localStorage.getItem('quizzes')) {
    localStorage.setItem('quizzes', JSON.stringify([]));
}

/**
 * Returns current session object if valid
 */
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

/**
 * Helper to ensure unauthorized states are redirected
 */
function checkAuthRequired() {
    if (!getCurrentUser()) {
        window.location.href = 'login.html';
    }
}

/**
 * Destroys token maps and active structures
 */
function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

/**
 * Utility to generate uniform native navigation UI injection across pages
 */
function renderNavbar() {
    const headerNode = document.createElement('nav');
    headerNode.className = 'navbar';
    
    const user = getCurrentUser();
    
    let linksHTML = `<li><a href="index.html">Home</a></li>`;
    
    if (user) {
        linksHTML += `
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="quizzes.html">Take Quiz</a></li>
            <li><a href="create-quiz.html">Create Quiz</a></li>
            <li><a href="#" id="logout-link">Logout (${user.username})</a></li>
        `;
    } else {
        linksHTML += `
            <li><a href="quizzes.html">Take Quiz</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="register.html">Register</a></li>
        `;
    }
    
    headerNode.innerHTML = `
        <div class="nav-brand"><a href="index.html">QuizMaster</a></div>
        <ul class="nav-links">${linksHTML}</ul>
    `;
    
    document.body.insertBefore(headerNode, document.body.firstChild);
    
    // Wire logout listener if existing
    const logoutBtn = document.getElementById('logout-link');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
        });
    }

    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop();
    const anchors = headerNode.querySelectorAll('.nav-links a');
    anchors.forEach(a => {
        if (a.getAttribute('href') === currentPath) {
            a.classList.add('active');
        }
    });
}

/**
 * Custom notification component injection
 */
function showToast(message, duration = 3000) {
    const container = document.createElement('div');
    container.className = 'toast';
    container.innerText = message;
    document.body.appendChild(container);
    setTimeout(() => {
        container.remove();
    }, duration);
}

// Generate runtime execution immediately
document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
});