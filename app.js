/*
    Author : Kidus Kinfe
    Date: 02/13/2020

*/


const questions = [{
        question: "What colour jersey is worn by the winners of each stage of the Tour De France?",
        answers: ['Yellow', 'Green', 'Red', 'Pink'],
        correctAnswer: 'Yellow'

    },
    {
        question: "Name the only heavyweight boxing champion to finish his career of 49 fights without ever having been defeated?",
        answers: ['Kidus Kinfe', 'Rocky Marciano', 'Mark Davidson', 'Sean Audian'],
        correctAnswer: 'Rocky Marciano'
    },
    {
        question: "Which sport does Constantino Rocca play?",
        answers: ['Golf', 'Basketball', 'Football', 'Tennis'],
        correctAnswer: 'Golf'
    },
    {
        question: "Name the country where you would find the Cresta Run?",
        answers: ['Ethiopia', 'England', 'USA', 'Switzerland'],
        correctAnswer: 'Switzerland'
    },
    {
        question: "How many times was the Men's Tennis Singles at Wimbledon won by Bjorn Borg?",
        answers: ['Nine', 'Two', 'Three', 'One'],
        correctAnswer: 'One'
    }
]
let store = [];
let counter = 0;
let score = 0;
let forms;
let SFX = new Audio();

/*
This function renders and stores an  object that contains the questions inside an array.
The questions are stored inside an objects, the object consists of the questions and the questions index 
the questions are generated form the questions array and mapped into Stores array
 */
function storesQuestionsandAnswers() {
    store = questions.map((elements, index) => {
            return {
                renderedHTML: `  <form data-set = '${index}'>
        <div class="question">${elements.question} </div>
        <div class ="answers">
            <div class="input"> <input type="radio" name ="answers" id="${elements.answers[0]}" value ='${elements.answers[0]}'>
            <label for ="${elements.answers[0]}">${elements.answers[0]}</label></div>
            <div class="input"> <input type="radio" name ="answers"  id="${elements.answers[1]}" value = '${elements.answers[1]}'><label for="${elements.answers[1]}">${elements.answers[1]}<br></label></div>
            <div class="input"> <input type="radio" name ="answers"  id="${elements.answers[2]}" value = '${elements.answers[2]}'><label for="${elements.answers[2]}">${elements.answers[2]}<br></label> </div>
            <div class="input"><input type="radio" name ="answers" id="${elements.answers[3]}" value = '${elements.answers[3]}'><label for="${elements.answers[3]}">${elements.answers[3]}<br> </label> </div>     
       </div>
        <button type ="submit" class="btn-submit">Submit</button><br>
        <div class = "formFooter">
          <div class="questionNumber">Question: ${index + 1} of 5 </div>
          <div class="score">Score: 0 of 5  </div> 
        </div>
       
        <div class="wrongAnswer">
         <div class="imgContainer"> <img src="image/hiclipart.com (42) down.png" alt="Wrong Answer"/> </div>
                <h1></h1>
                <button class = 'next-btn'> Next </button>
                <button class = 'TryAgain-btn'> Try Again </button>
                
                
        </div>   
    </form> `,
                questionNumber: index
            }

        }

    );


}


/*appends or renders the questions on the screen,
 however the hide method is called so it wouldn't show the whole thing */
function appendElements() {

    for (let stores of store) {
        $('.questions').append(stores.renderedHTML);
        $('form').hide();
    }

}

/*This function ger the input form the user through the radio button and validates whether or not
the user has selected an answer /* whether or not the answer entered is correct or not */
function getInput() {

    let input = $('input');
    let selectedVal = '';
    for (let i = 0; i < input.length; i++) {

        if (input[i].checked == true) {
            selectedVal = input[i].value
            input[i].checked = false;
        }
    }


    if (selectedVal) {
        return selectedVal;
    } else {
        tryAgain();
    }


}

/* checks whether or not the user entered the answer  correctly */
function checkAnswer(currentInput) {

    //if the user entered the answer correctly score is added
    if (currentInput == questions[counter - 1].correctAnswer) {
        score++;
        return true;
    }
    //if the answer is not correct renderIncorrect will be called 
    else if (currentInput != questions[counter - 1].correctAnswer) {

        renderIncorrect();
        return false;
    }



}
//This functions simply renders the home screen
function renderHomeScreen() {
    $('.logoImg').hide();
    const homeScreen = `<h1> Welcome</h1>
        <button class="Start">Start</button>`

    //afer render the home screen storeQuestionsansAnswer is called 
    storesQuestionsandAnswers();
    //render home screen
    $('header').append(homeScreen);

    //when the start btn is clicked the home screen disappears 
    $('header').on('click', '.Start', () => {
        $('header').slideUp(() => {
            $('header').hide();
        })


        $('.logoImg').slideDown(1000, () => $('.logoImg').show());



        //sets a time out so that the questions appear after 500 milliseconds 
        setTimeout(() => {
            renderHtml();
        }, 500);






    })
}

//This function renders the results depending on the results it gives different feedback 
function renderResults() {

    if (score < 3) {
        $('.results img').remove();
        $('.results .imgContainer').append(` <img src="image/hiclipart.com (44).png" alt="Wrong Answer"/>`)
        $('.results h1').text(`Score: ${score} / 5`);
        $('.results h3').text(`Come on you can do better`);
        $('.results h2').text(`Read an book or something!!!`);

    } else if (score >= 3) {
        $('.results img').remove();
        $('.results h1').text(`Score: ${score} / 5`);
        $('.results h2').text(`Well done!!!!`);
        $('.results h3').text(`You are actually good at something after all`);
        $('.results .imgContainer').append(` <img src="image/hiclipart.com (42).png" alt="Wrong Answer"/>`)
    }

    $('.results').show();
}

function renderIncorrect() {
    $('.wrongAnswer h1').text(`Sorry the answer is wrong, the correct answer is... ${questions[counter-1].correctAnswer}`);
    $('.TryAgain-btn').hide();
    $('.next-btn').show();
    $('.wrongAnswer').show();
}

function restart() {
    counter = 0;
    score = 0;
    SFX.muted = true;
    $('body').append(`<header></header>`);
    $('form').remove();
    storesQuestionsandAnswers();
    appendElements();
    renderHomeScreen();

}

function tryAgain() {
    $('.wrongAnswer h1').text(`Please guess, this is a game!!!`);
    $('.next-btn').hide();
    $('.wrongAnswer').show();
    $('.TryAgain-btn').show();



}





function renderHtml() {
    forms = $('form');
    if (counter < 5) {
        $(forms[counter]).show()
        counter++;
    } else {
        counter = 0;
    }


}





function main() {
    renderHomeScreen();
    appendElements();

    $('main').on('click', '.btn-submit', function (e) {
        e.preventDefault();
        let parent = $(this).closest('form');

        let input = getInput()

        //feedback

        if (counter < 5) {

            if (!input) {
                tryAgain();
            } else if (checkAnswer(input)) {
                $(parent).slideUp(() => parent.hide());
                storesQuestionsandAnswers();
                $('.score').text(`Score: ${score} of 5 `);
                renderHtml();
            }

        } else {
            if (input) {
                renderResults();
            }

        }



    });


    $('.restart-btn').click(() => {
        restart();
        $('.results').hide();

    })

    $('main').on('click', '.next-btn', function (e) {
        e.preventDefault();
        let parent = $(this).closest('form');
        $('.wrongAnswer').slideUp(() => $('.wrongAnswer').hide());
        $(parent).slideUp(500, () => parent.hide());

        storesQuestionsandAnswers();
        renderHtml();
    })

    $('main').on('click', '.TryAgain-btn', function (e) {
        e.preventDefault();
        $('.wrongAnswer').hide()
    })




}


$(main);