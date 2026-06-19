/**
 * Dynamic Session Assessment Run State Machine Matrix
 */
document.addEventListener('DOMContentLoaded', () => {
    checkAuthRequired();

    const locationQueryStringParams = new URLSearchParams(window.location.search);
    const contextQuizId = locationQueryStringParams.get('quizId');

    const globalQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const operatingActiveQuizObj = globalQuizzes.find(q => q.id === contextQuizId);

    if (!operatingActiveQuizObj || !operatingActiveQuizObj.questions.length) {
        alert('Target evaluation framework initialization mapping structure not resolved or empty.');
        window.location.href = 'quizzes.html';
        return;
    }

    let pointerIdx = 0;
    // Map data vector to retain user option tracking state
    let memoryUserSelectionsMap = {};

    const headerTitle = document.getElementById('active-quiz-title-header');
    const counterDisplay = document.getElementById('tracker-digit-display');
    const dynamicProgressBarFill = document.getElementById('runtime-progress-fill');
    const questionTextArea = document.getElementById('current-question-text');
    const dynamicOptionsContainer = document.getElementById('options-interactive-container');

    const prevBtn = document.getElementById('prev-question-trigger');
    const nextBtn = document.getElementById('next-question-trigger');

    headerTitle.innerText = operatingActiveQuizObj.title;

    function structuralRenderStep() {
        const structuralQuestionModel = operatingActiveQuizObj.questions[pointerIdx];
        
        // Set metrics status markers tracking active state
        counterDisplay.innerText = `Question ${pointerIdx + 1} of ${operatingActiveQuizObj.questions.length}`;
        const ratioFill = ((pointerIdx + 1) / operatingActiveQuizObj.questions.length) * 100;
        dynamicProgressBarFill.style.width = `${ratioFill}%`;

        questionTextArea.innerText = structuralQuestionModel.questionText;
        dynamicOptionsContainer.innerHTML = "";

        // Dynamically inject custom elements processing option metrics loops
        structuralQuestionModel.options.forEach((optText, optionIndex) => {
            const elementRowDiv = document.createElement('div');
            elementRowDiv.className = 'quiz-option-item';
            if (memoryUserSelectionsMap[pointerIdx] === optionIndex) {
                elementRowDiv.classList.add('selected');
            }
            elementRowDiv.innerText = optText;

            elementRowDiv.addEventListener('click', () => {
                const currentSelected = dynamicOptionsContainer.querySelector('.quiz-option-item.selected');
                if (currentSelected) currentSelected.classList.remove('selected');
                
                elementRowDiv.classList.add('selected');
                memoryUserSelectionsMap[pointerIdx] = optionIndex;
            });

            dynamicOptionsContainer.appendChild(elementRowDiv);
        });

        // Toggle context parameters for boundary steps navigation metrics control
        prevBtn.style.visibility = (pointerIdx === 0) ? 'hidden' : 'visible';
        
        if (pointerIdx === operatingActiveQuizObj.questions.length - 1) {
            nextBtn.innerText = "Complete Assessment";
            nextBtn.classList.add('btn-success');
        } else {
            nextBtn.innerText = "Next Step";
            nextBtn.classList.remove('btn-success');
        }
    }

    prevBtn.addEventListener('click', () => {
        if (pointerIdx > 0) {
            pointerIdx--;
            structuralRenderStep();
        }
    });

    nextBtn.addEventListener('click', () => {
        // Enforce structural restriction checking option assignment bounds
        if (memoryUserSelectionsMap[pointerIdx] === undefined) {
            alert('Selection required: Please check an option alternative sequence map before tracking forward.');
            return;
        }

        if (pointerIdx < operatingActiveQuizObj.questions.length - 1) {
            pointerIdx++;
            structuralRenderStep();
        } else {
            // Lock down finalized payload mapping results back into storage mechanisms bound
            const executionSummaryOutputPayload = {
                quizId: contextQuizId,
                answersMap: memoryUserSelectionsMap
            };
            localStorage.setItem('active_session_results', JSON.stringify(executionSummaryOutputPayload));
            window.location.href = 'results.html';
        }
    });

    // Run active dynamic visualization initializer tracking setup instance
    structuralRenderStep();
});