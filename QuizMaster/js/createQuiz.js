/**
 * Dynamic Dynamic Schema Array Form Compiler Engine
 */
document.addEventListener('DOMContentLoaded', () => {
    checkAuthRequired();

    const wrapper = document.getElementById('questions-wrapper-container');
    const addBtn = document.getElementById('add-question-trigger');
    const form = document.getElementById('quiz-builder-form');
    
    let counterIndex = 0;

    function appendQuestionBlock() {
        counterIndex++;
        const uniqueId = `q_${Date.now()}_${counterIndex}`;
        
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.id = uniqueId;
        
        questionBlock.innerHTML = `
            <button type="button" class="btn btn-danger remove-question-btn" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">Remove</button>
            <div class="form-group">
                <label>Question Objective Statement #${counterIndex}</label>
                <input type="text" class="form-control question-text-input" placeholder="Type core target question content here..." required>
            </div>
            <div class="options-builder">
                <div class="option-input-group">
                    <input type="radio" name="correct_ans_${uniqueId}" value="0" checked>
                    <input type="text" class="form-control option-alternative" placeholder="Alternative Option A" required>
                </div>
                <div class="option-input-group">
                    <input type="radio" name="correct_ans_${uniqueId}" value="1">
                    <input type="text" class="form-control option-alternative" placeholder="Alternative Option B" required>
                </div>
                <div class="option-input-group">
                    <input type="radio" name="correct_ans_${uniqueId}" value="2">
                    <input type="text" class="form-control option-alternative" placeholder="Alternative Option C" required>
                </div>
                <div class="option-input-group">
                    <input type="radio" name="correct_ans_${uniqueId}" value="3">
                    <input type="text" class="form-control option-alternative" placeholder="Alternative Option D" required>
                </div>
            </div>
            <p style="font-size: 0.8rem; color: var(--success); margin-top: 0.5rem; font-weight:500;">* Check the selector option circle above to mark that answer alternative as the true correct baseline key.</p>
        `;
        
        // Setup internal extraction handling targeting instance element unlinks
        questionBlock.querySelector('.remove-question-btn').addEventListener('click', () => {
            if(wrapper.querySelectorAll('.question-block').length <= 1) {
                alert('An operational assessment block configuration structure requires down matching parameters comprising at least 1 core objective statement.');
                return;
            }
            questionBlock.remove();
            reindexLabels();
        });

        wrapper.appendChild(questionBlock);
    }

    function reindexLabels() {
        let items = wrapper.querySelectorAll('.question-block');
        items.forEach((block, idx) => {
            block.querySelector('label').innerText = `Question Objective Statement #${idx + 1}`;
        });
    }

    // Default initialization cycle payload setup
    appendQuestionBlock();

    addBtn.addEventListener('click', appendQuestionBlock);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titleValue = document.getElementById('quiz-title').value.trim();
        const blockNodes = wrapper.querySelectorAll('.question-block');
        
        const runtimeQuestionsCollectedList = [];

        blockNodes.forEach(node => {
            const textStr = node.querySelector('.question-text-input').value.trim();
            const optionInputs = node.querySelectorAll('.option-alternative');
            const checkedRadio = node.querySelector(`input[type="radio"]:checked`);
            
            const optionsArray = Array.from(optionInputs).map(inp => inp.value.trim());
            const indexCorrectValue = parseInt(checkedRadio.value, 10);

            runtimeQuestionsCollectedList.push({
                questionText: textStr,
                options: optionsArray,
                correctIndex: indexCorrectValue
            });
        });

        const activeStoreList = JSON.parse(localStorage.getItem('quizzes')) || [];
        
        const structuralQuizPayload = {
            id: 'quiz_' + Date.now(),
            author: getCurrentUser().username,
            title: titleValue,
            questions: runtimeQuestionsCollectedList
        };

        activeStoreList.push(structuralQuizPayload);
        localStorage.setItem('quizzes', JSON.stringify(activeStoreList));

        alert('Quiz compiled successfully and committed directly to structural local storage engine map!');
        window.location.href = 'dashboard.html';
    });
});