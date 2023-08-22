let uri="https://localhost:7080/api/AnsweandWins"
$( document ).ready(function() {
   
    
  GetQuestion();
   
    
});
const questions = []

function GetQuestion(){
   


   
    
      $.ajax({  
        url: uri,  
        type: 'GET',  
        dataType: 'json',  
        
        success: function (data ) {  
           
         
            $.each(data, function(idx , item){
               
                console.log(item);
                
             const question =  {
                    question: item.question,
                    answers: [item.option1, item.option2, item.option3, item.option4],
                    correctAnswer: item.correctAnswer
                    }
                    questions.push(question)

            })  
            updateQuestion()
        },  

        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  };


// const questions = [
//     {
//     question: "What is 2 + 2?",
//     answers: ["4", "6", "8", "10"],
//     correctAnswer: "4"
//     },
//     {
//     question: "What is the capital of France?",
//     answers: ["London", "Paris", "Madrid", "Rome"],
//     correctAnswer: "Paris"
//     },
//     {
//       question: "What is 12% of 50?",
//       answers: ["4", "5", "8", "6"],
//       correctAnswer: "6"
//     },
    
//     {
//     question: "What is the currency used in Japan?",
//     answers: ["Euro", "Yen", "Dollar", "Franc"],
//     correctAnswer: "Yen"
//     }
//     ];
    let currentQuestion = 0;
    let score = 0;
    let price =0;

function updateQuestion() {

    
    
  $("#question-text").text(questions[currentQuestion].question);
  $("#answer-1").text(questions[currentQuestion].answers[0]);
  $("#answer-2").text(questions[currentQuestion].answers[1]);
  $("#answer-3").text(questions[currentQuestion].answers[2]);
  $("#answer-4").text(questions[currentQuestion].answers[3]);
}

$(".answer").click(function() {
  if ($(this).text() === questions[currentQuestion].correctAnswer) {
    score++;
    

   
    
    updatePrice(score)

    currentQuestion++;

    if (currentQuestion < questions.length) {
        updateQuestion();
    } 
    else {
      var audio = new Audio('./assets/clap2.mp3');
      audio.play();
    
      const fire= document.getElementById('fire1').classList
      fire.add('firework')
      const fire2= document.getElementById('fire2').classList
      fire2.add('firework')
      const fire3= document.getElementById('fire3').classList
      fire3.add('firework')
        swal({ title: "Congratulations !",
          text: `You have won $ ${price} `,
          type: "success"}).then(okay => {
            if (okay) {
                window.location.replace("./index.html")
           }
         });

    }

    }else{
    
    
        var audio = new Audio('./assets/wrong.mp3');
        audio.play();

        swal({ title: "Incorrect !",
          text: "Sorry but you are out of the show!",
          type: "error"}).then(okay => {
            if (okay) {
             window.location.replace("./index.html")
           }
         });

    }

  
});




function updatePrice(id){
    let add = parseFloat($("#price-"+id).html())
    price=add
    $("#total").html(price)
    $("#price-"+id).css('color', 'Green');
    $("#price-"+(id-1)).css('color', 'white');

    

    if(price === 7000){
      var audio = new Audio('./assets/claps.mp3');
      audio.play();
      $("#youmade").html(`you made $ ${price}`)
      $("#modalPush").modal("show")
        const list = document.getElementById("page").classList;
       
        list.add("blurr");
       
    }
    else if(price === 65000){
      
      var audio = new Audio('./assets/claps.mp3');
      audio.play();
      $("#youmade").html(`you made $ ${price}`)
      $("#modalPush").modal("show")
        const list = document.getElementById("page").classList;
       
        list.add("blurr");
       
    }
    else{
      var audio = new Audio('./assets/right.mp3');
    audio.play();
      swal({ title: " Correct Answer !",
          text: `so far you made $ ${price} `,
          type: "success"}).then(okay => {
            if (okay) {
             
               
           }
         });
    }


}

$("#steal").on('click',function (){
    // var audio = new Audio('./assets/background.mp3');
    // audio.s();

    var audio = new Audio('./assets/right.mp3');
    audio.play();
    swal({ title: "Steal !",
          text: `You have taken $ ${price} `,
          type: "success"}).then(okay => {
            if (okay) {
                window.location.replace("./index.html")
           }
         });
})


$("#btn-con").on('click',function (){
  const list = document.getElementById("page").classList;
       
  list.remove("blurr");
 
})

$("#help").on('click',function (){
  const list = document.getElementById("help").classList;
       
  list.add("dip");
 
})


swal({ title: "Ready",
          text: "10 Questions to win $ 1,000,000",
          type: "info"}).then(okay => {
            if (okay) {
              timer()
                var audio = new Audio('./assets/background.mp3');
                audio.play();
           }
         });


         $("#fivty").on('click',function () {
          
  
          $("#question-text").text(questions[currentQuestion].question);
          let corect = questions[currentQuestion].correctAnswer
          let ans = [questions[currentQuestion].answers[0],questions[currentQuestion].answers[1],questions[currentQuestion].answers[2],questions[currentQuestion].answers[3]]
        
          let newA = [];
        
          for (let i = 0; i < ans.length; i++) {
            if(ans[i] != corect){
              newA.push(ans[i])
            }
            
          }
          $("#answer-1").text(corect);
          $("#answer-2").text(newA[1]);
          $("#answer-3").text("----------");
          $("#answer-4").text("-----------");
          const btnfifity = document.getElementById("fivty").classList;
          btnfifity.add('dip');

        })


        // timer
        function timer(){

          var timeleft = 3*60;
          var downloadTimer = setInterval(function(){
           
            if(timeleft <= 0){
              clearInterval(downloadTimer);
              swal({ title: "Time is up ⏲️ !",
              text: "Sorry but you are out of the show!",
              type: "error"}).then(okay => {
                if (okay) {
                 window.location.replace("./index.html")
               }
             });
        
            }
            document.getElementById("progressBar").value =  3*60 - timeleft;
            timeleft -= 1;
          }, 1000);
        
        
        }

