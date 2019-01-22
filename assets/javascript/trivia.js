// create object with all trivia questions and answers
const triviaBank = {
  1: {
    question: "In the game ‘Metal Gear Solid’,who is the twin brother of Solid Snake?",
    correct: "Liquid Snake",
    answers: ["Mario", "Kerrigan", "Cortana", "Liquid Snake"],
    image: "assets/images/metalgearsolid.jpg"
  },
  2: {
    question: "What is the name of the princess whom Mario repeatedly stops Bowser from kidnapping?",
    correct: "Princess Peach",
    answers: ["Zelda", "Princess Peach", "Toad", "Cortana"],
    image: "assets/images/mario.png"
  },
  3: {
    question: "What is the name of the fictional English archaeologist in the game ‘Tomb Raider’?",
    correct: "Lara Croft",
    answers: ["Lara Croft", "Zelda", "Indiana Jones", "Sonic the Hedgehog"],
    image: "assets/images/tombraider.jpg"
  },
  4: {
    question: "What colour is Pac-Man?",
    correct: "Yellow",
    answers: ["White", "Green", "Yellow", "Pink"],
    image: "assets/images/pacman.jpg"
  },
  5: {
    question: "The Covenant are fictional military alien races in which game series?",
    correct: "Halo",
    answers: ["Call of Duty", "Halo", "Medal of Honor", "Pacman"],
    image: "assets/images/halo.jpg"
  },
  6: {
    question: "‘Black Ops’ is the subtitle of which game?",
    correct: "Call of Duty",
    answers: ["Battlefield", "Sonic the Hedgehog", "Call of Duty", "Pokemon"],
    image: "assets/images/blackops.jpg"
  },
  7: {
    question: "Which 1986 Nintendo game is set in the fantasy land of Hyrule, and centres on a boy named Link?",
    correct: "The Legend of Zelda",
    answers: ["The Brady Bunch", "Civilization IV", "Megaman", "The Legend of Zelda"],
    image: "assets/images/link.jpg"
  },
  8: {
    question: "Pikachu is one of the species of creatures in which series of games?",
    correct: "Pokemon",
    answers: ["Pokemon", "Digimon", "Yugioh", "Animal Crossing"],
    image: "assets/images/pikachu.jpg"
  },
  9: {
    question: "What does NES stand for?",
    correct: "Nintendo Entertainment System",
    answers: ["New England Style", "Nintendo Entertainment System", "Never Eat Soup", "Nerds Explain Stuff"],
    image: "assets/images/nintendo.png"
  },
  10: {
    question: "What is the highest grossing game of all time?",
    correct: "World of Warcraft",
    answers: ["League of Legends", "Dota 2", "World of Warcraft", "Rocket League"],
    image: "assets/images/wow.jpg"
  }
};

// initiate all necessary variables
let time;
let intervalId;
let timeout;
let currentQuestion;
let questionIndex = 1;
let corGuesses = 0;
let incGuesses = 0;
let listLength = 0;

// figure out how many questions are in the list
for (var key in triviaBank) {
  listLength++;
}

// timer update function
const countdown = () => {
  time--;
  $("#timer").html("<h2>" + time + " Seconds Remaining!</h2>");
};

// setup screen to show correct answer, and count to 3 before going to the next question
const answerScreen = (ans, actual) => {
  clearInterval(intervalId);
  clearTimeout(timeout);
  $("#timer").text("");
  $("#currentQuestion").text("");
  $("#answers").text("");

  // determine if answer was right, wrong, or a timeout, display info accordingly
  if (ans === "timeout") {
    $("#currentQuestion").text("You ran out of time!");
    $("#answers").text(`The correct answer was: ${actual}`);
    timeout = setTimeout(() => {
      nextQuestion("incorrect");
    }, 3000);
  } else if (ans === "correct") {
    $("#currentQuestion").text("You got it correct!");
    timeout = setTimeout(() => {
      nextQuestion(ans);
    }, 3000);
  } else if (ans === "incorrect") {
    $("#currentQuestion").text("You got it incorrect!");
    $("#answers").text(`The correct answer was: ${actual}`);
    timeout = setTimeout(() => {
      nextQuestion(ans);
    }, 3000);
  }
};

const render = () => {
  // deal with timers
  time = 30;
  $("#timer").html("<h2>" + time + " Seconds Remaining!</h2>");
  clearInterval(intervalId);
  clearTimeout(timeout);
  intervalId = setInterval(countdown, 1000);
  timeout = setTimeout(() => {
    answerScreen("timeout", currentQuestion.correct);
  }, 30000);

  // render current question and possible answers
  $("#answers").html("");
  currentQuestion = triviaBank[questionIndex];
  $(".qimage").attr("src", currentQuestion.image)
  $("#currentQuestion").text(currentQuestion.question);
  currentQuestion.answers.forEach(ans => {
    let answerButton = $("<button class='answer btn btn-primary'></button><br><br>").text(ans);
    $("#answers").append(answerButton);
  });

  // handle button press and determine if answer is right or wrong
  $(".answer").click(function() {
    if ($(this).text() === currentQuestion.correct) {
      answerScreen("correct", currentQuestion.correct);
    } else {
      answerScreen("incorrect", currentQuestion.correct);
    }
  });
};

// end game and display score
const gameOver = (cor, incor) => {
  console.log(cor, incor);
  corGuesses = 0;
  incGuesses = 0;
  questionIndex = 1;
  clearInterval(intervalId);
  clearTimeout(timeout);
  $("#timer").text(`You got ${cor} correct, and ${incor} incorrect!`);
  $("#currentQuestion").html("");
  $("#answers").html("");
  $(".start").text("Play Again!");
  $(".start").css("visibility", "visible");
  $(".instructions").text(
    'Press "Play Again!" to restart the quiz. You will have 30 seconds to answer each question. The Trivia is ________ themed. Good luck!'
  );
  $(".instructions").css("visibility", "visible");
};

// iterate through question list
const nextQuestion = q => {
  // clear timers
  clearInterval(intervalId);
  clearTimeout(timeout);
  // if this is the last question go to end game screen
  if (questionIndex >= listLength) {
    if (q === "correct") {
      corGuesses++;
      gameOver(corGuesses, incGuesses);
    } else {
      incGuesses++;
      gameOver(corGuesses, incGuesses);
    }
    // if it's not the last question just go to next question
  } else {
    if (q === "correct") {
      corGuesses++;
      questionIndex++;
      render();
    } else {
      incGuesses++;
      questionIndex++;
      render();
    }
  }
};

// start game button
$(".start").click(function() {
  $(this).css("visibility", "hidden");
  $(".instructions").css("visibility", "hidden");
  render();
});
