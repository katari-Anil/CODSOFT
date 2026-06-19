/**
 * Central Global Searchable Exploration Grid Core
 */
document.addEventListener('DOMContentLoaded', () => {
    const searchElement = document.getElementById('search-filter-input');
    const targetGrid = document.getElementById('global-quizzes-grid');
    
    const availableSystemQuizzesList = JSON.parse(localStorage.getItem('quizzes')) || [];

    function processRender(filteringTermStr = "") {
        targetGrid.innerHTML = "";
        
        const refinedSearchSet = availableSystemQuizzesList.filter(q => 
            q.title.toLowerCase().includes(filteringTermStr.toLowerCase())
        );

        if (refinedSearchSet.length === 0) {
            targetGrid.innerHTML = `
                <div class="glass-card" style="grid-column: 1/-1; text-align: center; padding: 2.5rem;">
                    <p style="color: var(--text-muted);">No matching quiz parameters or active modules found matching that sequence.</p>
                </div>
            `;
            return;
        }

        refinedSearchSet.forEach(quiz => {
            const card = document.createElement('div');
            card.className = 'quiz-card';
            card.innerHTML = `
                <div>
                    <h3>${escapeString(quiz.title)}</h3>
                    <p style="margin-bottom:0.5rem;">Total Questions: ${quiz.questions.length}</p>
                    <p style="font-size:0.8rem; font-style:italic;">Creator Host: ${quiz.author}</p>
                </div>
                <button class="btn btn-primary start-evaluation-trigger" data-id="${quiz.id}" style="width:100%; margin-top:1rem;">Start Quiz Matrix</button>
            `;
            targetGrid.appendChild(card);
        });
    }

    targetGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('start-evaluation-trigger')) {
            const currentSession = getCurrentUser();
            if (!currentSession) {
                alert('Authentication wall intercept: Please log in to take an evaluation quiz.');
                window.location.href = 'login.html';
                return;
            }
            const structuralTargetId = e.target.getAttribute('data-id');
            window.location.href = `take-quiz.html?quizId=${structuralTargetId}`;
        }
    });

    searchElement.addEventListener('input', (e) => {
        processRender(e.target.value);
    });

    // Fire default processing array mapping context sequence loop trace tracking initial run
    processRender();
});

function escapeString(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}