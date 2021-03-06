'use strict';

//constant values to use with password.
const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; //26 characters
const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //26 characters
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; //10 characters
const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')']; //10 Characters
const optionalCharacters = ['-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '\'', '\"', '<', '>', ',', '.', '?', '/', '|', '`', '~']; //21 Characters
const similarCharacters = ['o', 'O', '0', 'i', 'j', 'l', 'I', 'S', '$', '5', 'B', '8'];

//function to generate random password
function generatePassword(
  passwordLength,
  lower,
  lowerMin,
  upper,
  upperMin,
  numb,
  numbMin,
  special,
  specialMin,
  optional,
  optionalMin,
  firstLetter,
  repeat,
  noSimilar,
  noSequential
) {
  let generatedPassword = [];
  let parameters = [];

  //set lower case by default
  if (lower == false) {
    //do nothing
  } else if (lower == null || true) {
    parameters.push(lowerCase);
  };

  //set upper case by default
  if (upper == false) {
    //do nothing
  } else if (upper == null || true) {
    parameters.push(upperCase);
  };

  //set numbers case by default
  if (numb == false) {
    //do nothing
  } else if (numb == null || true) {
    parameters.push(numbers);
  };

  //enables special characters
  if (special == true) {
    parameters.push(specialCharacters);
  }

  //enables optional characters
  if (optional == true) {
    parameters.push(optionalCharacters);
  }

  for (let i = 0; i < passwordLength; i++) {
    let charSet = Math.floor(Math.random() * parameters.length);
    let charSel = Math.floor(Math.random() * parameters[charSet].length);

    //Checking password for speficied modifications

    if (repeat == true) {
      if (i == 0) {
        console.log('no duplicate characters selected.');
      }
      if (parameters[charSet][charSel] === generatedPassword[i - 1]) {
        console.log('duplicate character found and dropped');
        generatedPassword.pop();
        i--;
      }
    }

    generatedPassword.push(parameters[charSet][charSel]);

    // if enabled will make sure first character is a letter.
    if (firstLetter == true) {
      // need something to prevent selecting false on upper and lower case to cause crash.

      let first = false;
      if (i == 0) {
        console.log('first letter option selected.');
        for (let j = 0; j < lowerCase.length; j++) {
          if (generatedPassword[0] == lowerCase[j] || generatedPassword[0] == upperCase[j]) {
            first = true;
          }
        }
        if (first == false) {
          console.log('First character not a letter');
          generatedPassword.pop();
          i--;
        }
      }
    }

    // if enabled will not use similar looking characters.
    if (noSimilar == true) {
      if (i == 0) {
        console.log('no similar characters option selected.');
      }
      for (let k = 0; k < similarCharacters.length; k++) {
        if (generatedPassword[i] == similarCharacters[k]) {
          console.log('Found invalid character');
          generatedPassword.pop();
          i--;
        }
      }
    }

    // if enabled will not use sequential characters.
    if (noSequential == true) {
      if (i == 0) {
        console.log('no sequential characters option selected.');
      }
      if (i > 0) {
        if (generatedPassword[i - 1] === parameters[charSet][charSel - 1] || generatedPassword[i - 1] === parameters[charSet][charSel + 1]) {
          generatedPassword.pop();
          i--;
        }
      }
    }
  };

  // Sets minimum characters to be used.
  let meetsReqirements = true;
  if (lower == true && lowerMin > 1) {
    console.log('lower min grater than 0: ', lowerMin)
    let charTotal = 0;
    for (let m = 0; m < generatedPassword.length; m++) {
      for(let n = 0; n < lowerCase.length; n++){
        console.log('total: ', charTotal);
        // console.log('pass: ', generatedPassword[m], 'case: ', lowerCase[n])
        if (generatedPassword[m] === lowerCase[n]){
          console.log('lower case found')
          charTotal++;
        }
      } 
    };
    
    if (charTotal < lowerMin) {
      console.log('not enouhg lower case characters');
      console.log('charTotal: ', charTotal, 'lowerMin', lowerMin)
      meetsReqirements = false;
    }
  };

  if (upper == true && upperMin > 1) {
    console.log('upper min grater than 0: ', upperMin)
  };

  if (numb == true && numbMin > 1) {
    console.log('upper min grater than 0: ', numbMin)
  };

  if (special == true && specialMin > 1) {
    console.log('upper min grater than 0: ', specialMin)
  };

  if (optional == true && optionalMin > 1) {
    console.log('upper min grater than 0: ', optionalMin)
  };

  if (meetsReqirements == true){
    return generatedPassword.join('');
  } else {
    reRunPasswordGeneration() 
  };
};

function reRunPasswordGeneration() {
  generatePassword(passwordLength, lower, lowerMin, upper, upperMin, numb, numbMin, special, specialMin, optional, optionalMin, firstLetter, repeat, noSimilar, noSequential)
}