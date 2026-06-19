# 📝 QuizMaster — Modern Online Quiz Maker

QuizMaster is an elegant, high-performance, responsive Online Quiz Maker web application crafted natively using **HTML5, CSS3 (Modern Glassmorphic UI)**, and **Vanilla JavaScript**. Designed with zero external dependencies, frameworks, or backend servers, this application leverages the browser's native **Local Storage** engine to manage persistent states, user access control sessions, and quiz databases.

---

## 👤 Developer
* **Developed by:** Katari Anil

---

## ✨ Features & Functionality

### 🌟 1. Home / Landing Experience
* **Modern Hero Section:** Visually striking entrance built with an adaptive gradient color mesh layout.
* **Intuitive Navigation Framework:** Smart, structural navigation bar that dynamically alters displayed routing matrices based on the user's live authentication token status.
* **Contextual Call to Actions:** Seamless redirection points allowing unhindered pathways to explore quizzes or design custom testing templates.

### 🔒 2. Identity Management & Security Wall
* **Local Storage User Map Registry:** Full account registration system checking for username or email collisions natively inside local key/value sets.
* **Session Management Token Layer:** Protects the quiz creation interface from unauthorized modifications by instantly bouncing guest sessions back to the login gateway.
* **Graceful Session Termination:** Smooth logout mechanics that scrub active session headers instantly while retaining global data integrity.

### 🛠️ 3. Dynamic Visual Form Builder (Quiz Creation)
* **Unlimited Scale Additions:** Programmatic UI generation nodes allowing authors to stack unlimited questions dynamically.
* **Intuitive Validation Setup:** Interactive option configurations providing space for 4 multiple-choice items alongside radio selectors to bind the precise true-key mapping matrix.
* **Sanitization Integrity Wrapper:** Escapes unsafe text input sequences, protecting output nodes from HTML breaking anomalies.

### 🔍 4. Centralized Quiz Exploration Hub
* **Live Search Filtering Engine:** Instant substring matching against quiz titles as the user types—no page refreshes or latency.
* **Descriptive Status Cards:** Displays detailed quiz breakdowns, counting underlying assessment points and authorship credits.
* **Clean Flex/Grid Architecture:** Responsive breakpoints perfectly aligning layout patterns across mobile phones, tablets, and wide monitors.

### 🧠 5. Active Quiz Execution Runtime
* **Linear Presentation Model:** Shows exactly one question objective at a time to prevent overload and maintain strong focus.
* **Persistent Visual Progress Fill:** Tracks the exact percentage of completing the current testing sequence.
* **Boundary Control Interlocks:** Disables skipping steps by strictly validation-locking navigation to the next target block until an option selection is committed.
* **Interactive Selection Highlighting:** Polished highlight cues providing instant visual feedback on active selections.

### 📊 6. Post-Assessment Analytics Log
* **High-Impact Score Analytics UI:** Displays your score via a sleek, percentage-calculated circular status visual.
* **Detailed Mistake Breakdown Log:** Side-by-side answer comparisons, rendering correct keys in soft emerald tones and highlighting user errors in desaturated ruby tones.
* **Session Re-entry Vectors:** Instant routing paths allowing candidates to loop back and restart an evaluation, or head directly to the exploration registry[cite: 1].

---

## 📂 Project Architecture Layout

Ensure your GitHub repository mirrors this clean, production-ready directory structure[cite: 1]:

```text
QuizMaster/
│
├── index.html              # Core application landing entry path
├── login.html              # Account validation authentication panel
├── register.html           # Database registration signup panel
├── dashboard.html          # User control metrics and creation directory
├── create-quiz.html        # Dynamic form quiz compiling interface
├── quizzes.html            # Global list collection and search panel
├── take-quiz.html          # Live question runtime tracker engine
├── results.html            # Core score performance summary review
│
├── css/
│   └── style.css           # Comprehensive glassmorphism component stylesheet
│
└── js/
    ├── auth.js             # Global interceptor, shared session, and navigation injector
    ├── dashboard.js        # Personal quiz engine isolate and deletion router
    ├── createQuiz.js       # Dynamic form builder schema compiler
    ├── quizList.js         # Core query lookup listing filtering engine
    ├── takeQuiz.js         # Active execution step-manager runner state machine
    └── results.js          # Analytics engine performance log calculator