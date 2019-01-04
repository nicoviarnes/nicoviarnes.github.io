//create list of valid inputs
const letterBank = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

//create list of possible answers
const gameList = ["Zelda", "Mario", "Pokemon", "Halo", "Sonic", "Megaman"];

//variable to store # of wins
let wins = 0;

//variable to store # of losses
let losses = 0;

//variable to track how many turns are remaining
let remaining = 5;

//empty array to store guessed letters in
let guesses = [];

//empty array for blanks on gameboard: '_ _ _ _ _'
let wordBlanks = [];

//create variable to determine gamestate
let gameStarted = false;

//variable to set the game word to
let currentWord;

//wait for document to be loaded before executing script
$(document).ready(function() {
  //listen for a keypress
  $(document).keyup(function(event) {
    if(letterBank.indexOf(event.key) !== -1) {
      //if game hasnt started then hide instructions, set gameStarted to true, and write the game text to the DOM
      if (!gameStarted) {
        //select random answer from lis of possible answers
        currentWord = gameList[Math.floor(Math.random() * gameList.length)];        
        gameStarted = true;
        $("#instructions").hide();
        $("#wordLabel").text("Guess The Game");

        //push '_' to wordBlanks once for every letter in the answer. Eg: Zelda -> _ _ _ _ _
        for (let i = 0; i < currentWord.length; i++) {
          wordBlanks.push("_");
        }

        //write wordBlanks to the DOM
        $("#current-word").text(wordBlanks.join(" "));

        //if game has started, check to see if input is part of the current word, if it is display it
      } else {
        for (let i = 0; i < currentWord.length; i++) {
          if (event.key === currentWord[i].toLowerCase()) {
            wordBlanks[i] = event.key;
            $("#current-word").text(wordBlanks.join(" "));
          }
        }

        //if input isn't a correct guess, subtract 1 from total guess, and add key to incorrect guesses array
        if (wordBlanks.indexOf(event.key) === -1) {
          if(guesses.indexOf(event.key) === -1) {
            remaining--;
            guesses.push(event.key);
          }
          $("#remaining").text(remaining);
          $("#history").text(guesses.join(", "));
        }

        //if there are no more blanks in the word, you have won, update all stats
        if (wordBlanks.indexOf("_") === -1) {
          gameStarted = false;
          remaining = 5;
          guesses = [];
          wordBlanks = [];
          console.log(remaining)
          console.log('about to add a win')
          wins++;
          $("#wordLabel").text("");
          $("#current-word").text("");
          $("#instructions").show();
          $("#remaining").text(remaining);
          $("#history").text(guesses.join(", "));
          $("#wins").text(wins);
        }

        //if no more lives are remaining, end the game and reset
        if (remaining === 0) {
          gameStarted = false;
          remaining = 5;
          guesses = [];
          wordBlanks = [];
          console.log(remaining)
          console.log('about to add a loss ')
          losses++;
          $("#wordLabel").text("");
          $("#current-word").text("");
          $("#instructions").show();
          $("#remaining").text(remaining);
          $("#history").text(guesses.join(", "));
          $("#losses").text(losses);
        }
      }
    } else {
      alert("Press a key from A-Z");
    }
  });
});
