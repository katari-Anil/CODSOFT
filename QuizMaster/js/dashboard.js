/**
 * User Dashboard Engine Handling Personal Repository Isolation Mapping
 */
document.addEventListener('DOMContentLoaded', () => {
    checkAuthRequired();
    
    const currentUser = getCurrentUser();
    document.getElementById('welcome-title').innerText = `Hello, ${currentUser.username}!`;

    const allQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    
    // Filter down mapping structure specifically captured or built by current session contextual owner
    const personalQuizzes = allQuizzes.filter(q => q.author === currentUser.username);
    const targetGrid = document.getElementById('user-quizzes-grid');

    if (personalQuizzes.length === 0) {
        targetGrid.innerHTML = `
            <div class="glass-card" style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem;">
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">You haven't constructed any testing evaluation models yet.</p>
                <a href="create-quiz.html" class="btn btn-primary">Build Your First Quiz</a>
            </div>
        `;
        return;
    }

    personalQuizzes.forEach(quiz => {
        const card = document.createElement('div');
        card.className = 'quiz-card';
        card.innerHTML = `
            <div>
                <h3>${escapeHTML(quiz.title)}</h3>
                <p>${quiz.questions.length} Objective Assessment Questions</p>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <button class="btn btn-primary start-quiz-action" data-id="${quiz.id}" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Run Matrix</button>
                <button class="btn btn-danger delete-quiz-action" data-id="${quiz.id}" style="padding: 0.5rem 1rem; font-size: 0.9rem; margin-left: auto;">Delete</button>
            </div>
        `;
        targetGrid.appendChild(card);
    });

    // Wire Up Action Handlers dynamically inside runtime bubble
    targetGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('start-quiz-action')) {
            const id = e.target.getAttribute('data-id');
            window.location.href = `take-quiz.html?quizId=${id}`;
        }
        if (e.target.classList.contains('delete-quiz-action')) {
            const id = e.target.getAttribute('data-id');
            if (confirm('Are you absolute sure you want to permanently delete this testing framework element instance?')) {
                const updatedQuizzes = allQuizzes.filter(q => q.id !== id);
                localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
                showToast('Quiz successfully unlinked.');
                window.location.reload();
            }
        }
    });
});

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}