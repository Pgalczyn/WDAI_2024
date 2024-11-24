
const buttonGenerate = document.getElementById('buttonGenerate')
buttonGenerate.addEventListener('click',generate)
const resultPass = document.getElementById('resultPass')



function generate(){
    const minLength =parseInt(document.getElementById('minLength').value)
    const maxLength = parseInt(document.getElementById('maxLength').value)
    const bigLetters = document.getElementById('bigLetters')
    const specialSigns = document.getElementById('specialSigns')

    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
    let result = ''
    if (bigLetters.checked && specialSigns.checked){

        for(let i=0;i<length;i++){

            const asciiSign = Math.floor(Math.random() * (126 - 33 + 1)) + 33
            result += String.fromCharCode(asciiSign)
        }

    }

    if (bigLetters.checked && !specialSigns.checked){

        for(let i=0;i<length;i++){

            const asciiSign = Math.floor(Math.random() * (122 - 33 + 1)) + 33
            
            if ((asciiSign >= 65 && asciiSign <= 90) || (asciiSign >= 97 && asciiSign <= 122)){
                result += String.fromCharCode(asciiSign)
            }
            else{
                i--
            }
        }
    }
    else if (!bigLetters.checked && specialSigns.checked) {
        for (let i = 0; i < length; i++) {
        
            const asciiSign = Math.floor(Math.random() * (126 - 33 + 1)) + 33;
    
            
            if ((asciiSign >= 33 && asciiSign <= 47) || 
                (asciiSign >= 58 && asciiSign <= 64) || 
                (asciiSign >= 91 && asciiSign <= 96) || 
                (asciiSign >= 123 && asciiSign <= 126)) { 
                result += String.fromCharCode(asciiSign);
            } else {
                
                i--;
            }
        }
    }
    
    else {

        for(let i=0;i<length;i++){

            const asciiSign = Math.floor(Math.random() * (122 - 97 + 1)) + 97
            
            result += String.fromCharCode(asciiSign)
        }
    }
    alert(result)
}

