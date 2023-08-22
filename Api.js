let uri="https://localhost:7080/api/AnsweandWins"
$( document ).ready(function() {
   
    
    GetQuestion();
   
    
});
const questions = []
function GetQuestion(){
    $("#t-bloodtype").empty();
  //  $("#Add-modal-Product").modal("hide");

    var $list = $("#t-bloodtype");
    
      $.ajax({  
        url: uri,  
        type: 'GET',  
        dataType: 'json',  
        
        success: function (data ) {  
            //console.log(data);
         
            $.each(data, function(idx , item){
               
                console.log(item);
                
             const question =  {
                    question: item.question,
                    answers: [item.option1, item.option2, item.option3, item.option4],
                    correctAnswer: item.correctAnswer
                    }
                    questions.push(question)

            })  
        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  };
