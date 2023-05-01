var scoresheet = document.getElementById("scoresheet");                         // Retrieve html element scoresheet
var backtoQuiz = document.getElementById("backtoQuiz");                         // Retrieve html element backtoQuiz

function onBackToQuiz() {                                                       // Call index.html on click button
    window.location.href = 'index.html';
}

for (var i=0; i < localStorage.length; i++) {                                   // Loop until length of items in storage

    var initials = localStorage.key(i);                                         // Pull initials from current iteration number of list in storage
    var score = localStorage.getItem(initials);                                 // Get score corresponding to initials

    var result = document.createElement("div");                                 // Add div to display result
    result.classList.add('result');                                             // Add class result to div element

    result.innerHTML = '<div class="score-item">' + initials + '</div>' +       // Create html to display current initials and score in score-item class
                   '<div class="score-item">' + score + '</div>';

    scoresheet.appendChild(result);                                             // Append the div element to the scoresheet element on the html page
}

backtoQuiz.addEventListener("click", onBackToQuiz);                             // Event listener for back to quiz button