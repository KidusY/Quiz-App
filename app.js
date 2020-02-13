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
                
                
        </div>   
    </form> `,
                questionNumber: index
            }

        }

    );


}

function audio(audio) {
    SFX.src = audio;
    SFX.play();
}

function appendElements() {

    for (let stores of store) {
        $('.questions').append(stores.renderedHTML);
        $('form').hide();
    }

}

function getInput() {

    let input = $('input');
    let selectedVal = '';
    for (let i = 0; i < input.length; i++) {

        if (input[i].checked == true) {
            selectedVal = input[i].value
        }
    }
    if (selectedVal) {
        return selectedVal;
    } else {
        alert("Error");
    }


}

function checkAnswer(currentInput) {
    SFX.muted = false;
    console.log(questions[counter - 1].correctAnswer);

    if (currentInput == questions[counter - 1].correctAnswer) {
        score++;
        return true;
    } else if (currentInput != questions[counter - 1].correctAnswer) {
        audio('/SFX/14192_1459953012.mp3');
        renderIncorrect();
        return false;
    }
}

function renderHomeScreen() {
    const homeScreen = `<h1> Welcome</h1>
        <button class="Start">Start</button>`


    storesQuestionsandAnswers();

    $('header').append(homeScreen);

    $('header').on('click', '.Start', () => {
        $('header').slideUp(() => {
            $('header').hide();
        });


        setTimeout(() => {
            renderHtml();
        }, 500);






    })
}

function renderResults() {
    SFX.muted = false;
    if (score < 3) {
        $('.results img').remove();
        $('.results .imgContainer').append(` <img src="image/hiclipart.com (44).png" alt="Wrong Answer"/>`)
        $('.results h1').text(` Your Score is ${score} / 5...Come on you can do better`);
        $('.results h2').text(`Read an book or something!!!... `);
        audio('/SFX/18577_1464796417.mp3');
    } else if (score >= 3) {
        $('.results img').remove();
        audio('/SFX/11143_1393964019.mp3');
        $('.results h1').text(` Well done!!!! Your Score is ${score}/5`);
        $('.results .imgContainer').append(` <img src="image/hiclipart.com (42).png" alt="Wrong Answer"/>`)
    }

    $('.results').show();
}

function renderIncorrect() {
    $('.wrongAnswer h1').text(` Sorry the answer is wrong, the correct answer is... ${questions[counter-1].correctAnswer}`);
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
        console.log(counter);
        //feedback

        if (counter < 5) {
            console.log("hey");

            if (checkAnswer(input)) {
                SFX.muted = false;
                audio('/SFX/17937_1464203358.mp3');

                $(parent).slideUp(() => parent.hide());

                storesQuestionsandAnswers();
                $('.score').text(`Score: ${score} of 5 `);
                renderHtml();
            }

        } else {
            renderResults();
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
        SFX.muted = true;
        storesQuestionsandAnswers();
        renderHtml();
    })




}


$(main);