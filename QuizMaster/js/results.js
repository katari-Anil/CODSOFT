/**
 * Metrics Analytical Evaluator Performance Logging Parser
 */
document.addEventListener('DOMContentLoaded', () => {
    checkAuthRequired();

    const processingSessionResults = JSON.parse(localStorage.getItem('active_session_results'));
    const allQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    if (!processingSessionResults) {
        window.location.href = 'quizzes.html';
        return;
    }

    const targetedAssessmentScope = allQuizzes.find(q => q.id === processingSessionResults.quizId);
    
    if (!targetedAssessmentScope) {
        alert('Structural source reference parameters tracking this evaluation block mismatch.');
        window.location.href = 'quizzes.html';
        return;
    }

    let absoluteRightAnswersCounter = 0;
    const validationMapArray = targetedAssessmentScope.questions;
    const targetingReviewWrapperNode = document.getElementById('detailed-review-append-target');

    targetingReviewWrapperNode.innerHTML = "";

    validationMapArray.forEach((questionObj, index) => {
        const userPickedSelectedIdx = processingSessionResults.answersMap[index];
        const absoluteCorrectIdx = questionObj.correctIndex;
        
        const absoluteCorrectFlag = (userPickedSelectedIdx === absoluteCorrectIdx);
        if (absoluteCorrectFlag) absoluteRightAnswersCounter++;

        const reviewBlockNode = document.createElement('div');
        reviewBlockNode.className = `review-item ${absoluteCorrectFlag ? 'correct' : 'incorrect'}`;

        let interactiveOptionsStructuralListHTML = "";
        questionObj.options.forEach((optStr, subIdx) => {
            let colorModifierClass = "";
            let metadataIndicator = "";

            if (subIdx === absoluteCorrectIdx) {
                colorModifierClass = "text-success";
                metadataIndicator = " [Correct Key]";
            } else if (subIdx === userPickedSelectedIdx && !absoluteCorrectFlag) {
                colorModifierClass = "text-danger";
                metadataIndicator = " [Your Incorrect Choice]";
            }

            interactiveOptionsStructuralListHTML += `
                <div class="review-opt ${colorModifierClass}">
                    <strong>${String.fromCharCode(65 + subIdx)}.</strong> ${escapeHTMLValue(optStr)}${metadataIndicator}
                </div>
            `;
        });

        reviewBlockNode.innerHTML = `
            <p style="font-weight: 600;">Question Statement ${index + 1}: ${escapeHTMLValue(questionObj.questionText)}</p>
            <div class="review-options">
                ${interactiveOptionsStructuralListHTML}
            </div>
        `;
        targetingReviewWrapperNode.appendChild(reviewBlockNode);
    });

    // Compile high level statistics calculation ratios
    const totalQuestionsCount = validationMapArray.length;
    const finalCalculatedPercentageRatio = Math.round((absoluteRightAnswersCounter / totalQuestionsCount) * 100);

    document.getElementById('score-percentage-text').innerText = `${finalCalculatedPercentageRatio}%`;
    document.getElementById('raw-score-ratio').innerText = `${absoluteRightAnswersCounter} / ${totalQuestionsCount} Score Matrix`;
    
    // Wire Restart Event Vector Module Binding Context
    document.getElementById('restart-quiz-btn').addEventListener('click', () => {
        window.location.href = `take-quiz.html?quizId=${targetedAssessmentScope.id}`;
    });
});

function escapeHTMLValue(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}