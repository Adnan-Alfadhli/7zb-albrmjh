// create questions here
function startQuiz() {
  const grid = document.getElementById("grid");
  grid.classList.remove("hide");

  const startButton = document.getElementById("start");
  startButton.classList.add("hide");

  setInterval(() => {
    let timer = document.getElementById("timer");
    timer.innerHTML = `Timer: ${Date.now() - quiz.startTime}`;
  }, Math.floor(Math.random() * 150));

  var questions = [
    new Question(
      "ما المطلوب للتجربه",
      ["JavaScript", "XHTML", "CSS", "HTML"].sort(() => Math.random() - 0.5),
      "HTML"
    ),
    new Question(
      "تست",
      ["HTML", "JQuery", "CSS", "XML"].sort(() => Math.random() - 0.5),
      "CSS"
    ),
    new Question(
      "تست?",
      ["Python Script", "JQuery", "Django", "NodeJS"].sort(
        () => Math.random() - 0.5
      ),
      "Django"
    ),
    new Question(
      "اقوى لغه",
      ["PHP", "HTML", "JS", "All"].sort(() => Math.random() - 0.5),
      "PHP"
    ),
    new Question(
      "تست",
      ["Web Design", "Graphic Design", "SEO & Development", "All"].sort(
        () => Math.random() - 0.5
      ),
      "All"
    ),
  ];

  var shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    this.answering = [];
    this.startTime = Date.now();
  }

  Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
  };

  Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
      playCorrect();
    } else playFalse();

    this.answering.push({
      answer: answer,
      correctAnswer: this.getQuestionIndex().getCorrectAnswer(),
      time: Date.now() - this.startTime,
    });

    this.startTime = Date.now();
    this.questionIndex++;
  };

  Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
  };

  function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
  };

  Question.prototype.getCorrectAnswer = function () {
    return this.answer;
  };

  function populate() {
    if (quiz.isEnded()) {
      submitScores();
      var button = document.getElementById("submit");
      button.onclick = function () {
        showScores();
      };
    } else {
      // show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;

      // show options
      var choices = quiz.getQuestionIndex().choices;
      for (var i = 0; i < choices.length; i++) {
        var element = document.getElementById("choice" + i);
        element.innerHTML = choices[i];
        guess("btn" + i, choices[i]);
      }

      showProgress();
    }
  }

  function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
      quiz.guess(guess);
      populate();
    };
  }

  function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML =
      "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  }

  function submitScores() {
    var gameOverHTML = "<h1>Submit?</h1>";
    gameOverHTML += `<button id="submit" type="button">Submit Quiz</button>`;
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
  }

  function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += `
        <h2 id='score'> Your Score: ${quiz.score} </h2>
        <h2 id='correctAnswers'> Correct Answers</h2>
        ${
          !quiz.answering.filter((m) => m.answer === m.correctAnswer).length
            ? '<p id="correct">No Correct Answers</p>'
            : quiz.answering
                .filter((m) => m.answer === m.correctAnswer)
                .map(
                  (m) =>
                    `<p id="correct">${m.answer} (Time: ${
                      m.time / 1000
                    } seconds)</p>`
                )
        }
        <h2 id='wrongAnswers'> Wrong Answers</h2>
        ${
          !quiz.answering.filter((m) => m.answer !== m.correctAnswer).length
            ? '<p id="false">No Wrong Answers</p>'
            : quiz.answering
                .filter((m) => m.answer !== m.correctAnswer)
                .map(
                  (m) =>
                    `<p id="false">${m.answer} (Time: ${
                      m.time / 1000
                    } seconds)</p>`
                )
        }
        `;

    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
  }

  function playCorrect() {
    new Audio("true.mp3").play();
  }

  function playFalse() {
    new Audio("false.mp3").play();
  }

  // create quiz

  var quiz = new Quiz(shuffledQuestions);

  // display quiz
  populate();
}
