const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

for(let i = 0; i < buttons.length; i++){

    buttons[i].addEventListener("click", function(){

        let value = this.textContent;

        if(value === "C"){

            currentInput = "";
            display.value = "";

        }
        else if(value === "="){

            try{

                let result = eval(currentInput);

                display.value = result;
                currentInput = result.toString();

            }
            catch{

                display.value = "Error";
                currentInput = "";

            }

        }
        else{

            currentInput += value;
            display.value = currentInput;

        }

    });

}