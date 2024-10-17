// Example starter JavaScript for disabling form submissions if there are invalid fields
// test
(function () {
    'use strict'
    console.log('x');
    var mypass = document.getElementById("password");

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //var forms = document.querySelectorAll('.needs-validation');
    let form = document.querySelector(`#acctForm`);
    const pw1 = "password";
    const pw2 = "retype";
    const first = document.querySelector(`#first`), firstHelp = first.nextElementSibling;
    const last = document.querySelector(`#last`), lastHelp = last.nextElementSibling;
    const username = document.querySelector(`#username`);
    const usernameFeedback = document.querySelector(`#usernameHelp`);
    const password = document.querySelector(`#${pw1}`);
    const retype = document.querySelector(`#${pw2}`);
    const email = document.querySelector(`#email`);
    const emailFeedback = document.querySelector(`#emailHelp`);
    const ssn = document.querySelector(`#ssn`), ssnHelp = ssn.nextElementSibling;
    const dob = document.querySelector(`#dob`);
    const dobFeedback = document.querySelector(`#dobHelp`);
    const phone = document.querySelector(`#phone`);
    const monthly = document.querySelector(`#monthly`);
    const cardType = document.querySelectorAll(`[name='type']`);
    const ccName = document.querySelector(`#ccName`);
    const ccNum = document.querySelector(`#ccNum`);
    const ccNumHelp = document.querySelector(`#ccNumHelp`);
    const month = document.querySelector(`#month`);
    const year = document.querySelector(`#year`);
    const globalMsg = document.querySelector(`#globalMsg`);
    const errorRegion = document.querySelector(`#errorRegion`);
    const details = document.querySelector(`#details`);
    const errors = document.querySelector(`#errorsList`);
    const paymentInfo = document.querySelector(`#paymentInfo`);
    const cardInfo = document.querySelector(`#cardInfo`);
    const cardFormats = {
        Visa: "e.g. 4111 1111 1111 1111",
        MasterCard: "e.g. 5500 0000 0000 0004",
        Discover: "e.g. 6011 0000 0000 0004"
    };
    
    const validateCardNumber = number => {
        //Check if the number contains only numeric value  
        //and is of between 13 to 19 digits
        const regex = new RegExp("^[0-9]{13,19}$");
        if (!regex.test(number)){
            return false;
        }
      
        return luhnCheck(number);
    }
    
    const luhnCheck = val => {
        let checksum = 0; // running checksum total
        let j = 1; // takes value of 1 or 2
    
        // Process each digit one by one starting from the last
        for (let i = val.length - 1; i >= 0; i--) {
          let calc = 0;
          // Extract the next digit and multiply by 1 or 2 on alternative digits.
          calc = Number(val.charAt(i)) * j;
    
          // If the result is in two digits add 1 to the checksum total
          if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
          }
    
          // Add the units element to the checksum total
          checksum = checksum + calc;
    
          // Switch the value of j
          if (j == 1) {
            j = 2;
          } else {
            j = 1;
          }
        }
      
        //Check if it is divisible by 10 or not.
        return (checksum % 10) == 0;
    }

    const checkCreditCard = cardnumber => {
  
        //Error messages
        const ccErrors = [];
        ccErrors [0] = "Unknown card type";
        ccErrors [1] = "No card number provided";
        ccErrors [2] = "Credit card number is in invalid format";
        ccErrors [3] = "Credit card number is invalid";
        ccErrors [4] = "Credit card number has an inappropriate number of digits";
        ccErrors [5] = "Warning! This credit card number is associated with a scam attempt";
        
        //Response format
        const response = (success, message = null, type = null) => ({
          message,
          success,
          type
        });
           
        // Define the cards we support. You may add additional card types as follows.
        
        //  Name:         As in the selection box of the form - must be same as user's
        //  Length:       List of possible valid lengths of the card number for the card
        //  prefixes:     List of possible prefixes for the card
        //  checkdigit:   Boolean to say whether there is a check digit
        const cards = [];
        cards [0] = {name: "Visa", 
                     length: "13,16", 
                     prefixes: "4",
                     checkdigit: true};
        cards [1] = {name: "MasterCard", 
                     length: "16", 
                     prefixes: "51,52,53,54,55",
                     checkdigit: true};
        cards [2] = {name: "Discover", 
                    length: "16", 
                    prefixes: "6011,622,64,65",
                    checkdigit: true};
         
        // Ensure that the user has provided a credit card number
        if (cardnumber.length == 0)  {
           return response(false, ccErrors[1]);
        }
          
        // Now remove any spaces from the credit card number
        // Update this if there are any other special characters like -
        cardnumber = cardnumber.replace (/\s/g, "");
        
        // Validate the format of the credit card
        // luhn's algorithm
        if(!validateCardNumber(cardnumber)){
          return response(false, ccErrors[2]);
        }
       
        // Check it's not a spam number
        if (cardnumber == '5490997771092064') { 
          return response(false, ccErrors[5]);
        }
      
        // The following are the card-specific checks we undertake.
        let lengthValid = false;
        let prefixValid = false; 
        let cardCompany = "";
        
        // Check if card belongs to any organization
        for(let i = 0; i < cards.length; i++){
          const prefix = cards[i].prefixes.split(",");
          
          for (let j = 0; j < prefix.length; j++) {
            const exp = new RegExp ("^" + prefix[j]);
            if (exp.test (cardnumber)) {
              prefixValid = true;
            }
          }
          
          if(prefixValid){
            const lengths = cards[i].length.split(",");
            // Now see if its of valid length;
            for (let j=0; j < lengths.length; j++) {
              if (cardnumber.length == lengths[j]) {
                lengthValid = true;
              }
            }
          }
          
          if(lengthValid && prefixValid){
            cardCompany = cards[i].name;
            return response(true, null, cardCompany);
          }  
        }
        
        // If it isn't a valid prefix there's no point at looking at the length
        if (!prefixValid) {
           return response(false, ccErrors[3]);
        }
        
        // See if all is OK by seeing if the length was valid
        if (!lengthValid) {
           return response(false, ccErrors[4]);
        };   
        
        // The credit card is in the required format.
        return response(true, null, cardCompany);
      }


    let status = document.getElementById('status');
    let validated = false;

    document.querySelectorAll('[data-hint]').forEach(item => {
        let help = item.nextElementSibling;
        help.innerHTML = item.getAttribute('data-hint');
    });

    // const checkRequired = () => {
    //     let help = this.nextElementSibling;
    //     help.innerHTML = item.getAttribute('data-required');
    // }
    function checkFirst() {
        let help = first.nextElementSibling;
        if (!first.checkValidity()) {
            firstHelp.innerHTML = first.getAttribute('data-invalid');
        } else {
            firstHelp.innerHTML = "";
        }
    }
    function checkLast() {
        let help = last.nextElementSibling;
        if (!last.checkValidity()) {
            lastHelp.innerHTML = last.getAttribute('data-invalid');
        } else {
            lastHelp.innerHTML = "";
        }
    }

    const checkDOB = function () {
        let err;
        // First check for the pattern
        const dateString = dob.value;
        if (dateString !== '') {
            if(!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)){
                err = "Must be in the format DD/MM/YYYY";
            } else {
                let parts, day, month, year;
                // Parse the date parts to integers
                parts = dateString.split("/");
                day = parseInt(parts[1], 10);
                month = parseInt(parts[0], 10);
                year = parseInt(parts[2], 10);

                if (month == 0 || month > 12) {
                    err = "Month must be between 01 and 12";
                } else {

                    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
            
                    // Adjust for leap years
                    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                        monthLength[1] = 29;
            
                    // Check the range of the day
                    const numDays = monthLength[month - 1];
                    const validDay = (day > 0 && day <= numDays);
                    if (!validDay) {
                        err = `There are only ${numDays} days in the month`;
                    } else {
                        const now = new Date();
                        const currentYear = now.getFullYear();
                        // Check the year
                        if(year < 1900){
                            err = `Year must be at least 1900`;
                        } else {
                            const dateObj = new Date(`${year}/${month}/${day}`);
                            const atLeastToday = (dateObj <= now);
                            if (!atLeastToday) {
                                err = "Date cannot be in the future"
                            }
                        }
                    }
                }
            }
        }
        if ((dateString === '') || (typeof err === "undefined")) {
            dob.setCustomValidity('');
            dobFeedback.classList.remove('invalid-help');
            dobFeedback.innerHTML = "";
            if (dob.getAttribute('data-hint')) {
                dobFeedback.innerHTML = dob.getAttribute('data-hint');
            }
        } else {
            dobFeedback.classList.add('invalid-help');
            dobFeedback.innerHTML = err;
            dob.setCustomValidity(err);
        }
        updateErrorsList();
    }

    // const checkUsername = function () {

    //     if (!username.checkValidity()) {
    //         usernameFeedback.classList.add('invalid-help');
    //         if (username.value) {
    //             usernameFeedback.innerHTML = "Contains a character that isn't a letter or number. Only alphanumeric characters allowed.";
    //         } else {
    //             usernameFeedback.innerHTML = "Username cannot be empty.";
    //         }
    //     } else {
    //         usernameFeedback.classList.remove('invalid-help');
    //         usernameFeedback.innerHTML = "";
    //         if (username.getAttribute('data-hint')) {
    //             usernameFeedback.innerHTML = username.getAttribute('data-hint');
    //         }
    //     }
    // }

    const checkUsername = function () {

        if (!username.checkValidity()) {
            usernameFeedback.classList.add('invalid-help');
            if (username.value) {
                usernameFeedback.innerHTML = "Contains a character that isn't a letter or number. Only alphanumeric characters allowed.";
            } else {
                usernameFeedback.innerHTML = "Username cannot be empty.";
            }
        } else {
            usernameFeedback.classList.remove('invalid-help');
            usernameFeedback.innerHTML = "";
            if (username.getAttribute('data-hint')) {
                usernameFeedback.innerHTML = username.getAttribute('data-hint');
            }
        }
    }
    const checkPasswords = function () {
        let passwordFeedback = document.querySelector(`#${pw1}Help`);
        let retypeFeedback = document.querySelector(`#${pw2}Help`);
        let pMsg = [], rMsg = [];
        let missing = `Password missing.`;
        let different = `Passwords do not match.`

        if (password.validity.valueMissing) {
            pMsg.push(missing);
        }
        if (retype.validity.valueMissing) {
            rMsg.push(missing);
        }
        if (password.value !== retype.value) {
            pMsg.push(different);
            rMsg.push(different);
        }
        passwordFeedback.innerHTML = pMsg.join(`<br>`);
        retypeFeedback.innerHTML = rMsg.join(`<br>`);
        password.setCustomValidity(pMsg.join(` and `));
        retype.setCustomValidity(rMsg.join(` and `));

        if (!password.checkValidity()) {
            passwordFeedback.classList.add('invalid-help');
        } else {
            passwordFeedback.classList.remove('invalid-help');
            if (retype.getAttribute('data-hint')) {
                retypeFeedback.innerHTML = retype.getAttribute('data-hint');
            }
        }

        if (!retype.checkValidity()) {
            retypeFeedback.classList.add('invalid-help');
        } else {
            retypeFeedback.classList.remove('invalid-help');
            if (password.getAttribute('data-hint')) {
                passwordFeedback.innerHTML = password.getAttribute('data-hint');
                console.log(password.getAttribute('data-hint'))
            }
        }

    }

    function checkSocial() {
        if (!ssn.checkValidity()) {
            ssnHelp.classList.add('invalid-help');
            ssnHelp.innerHTML = ssn.getAttribute('data-invalid');
        } else {
            ssnHelp.classList.remove('invalid-help');
            ssnHelp.innerHTML = ssn.getAttribute('data-hint');
        }
        updateErrorsList();
    }
    const checkEmail = function () {
        var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (email.value == 0) {
            emailFeedback.innerHTML = email.getAttribute('data-hint');
            email.setCustomValidity('');
            emailFeedback.classList.remove('invalid-help');
        } else {
            if (email.value.match(mailformat)) {
                email.setCustomValidity('');
                emailFeedback.classList.remove('invalid-help');
                if (email.getAttribute('data-hint')) {
                    emailFeedback.innerHTML = email.getAttribute('data-hint');
                }
            } else {
                emailFeedback.innerHTML = 'Invalid email address. An example of a valid email would be: user@domain.com';
                email.setCustomValidity('Invalid email address. An example of a valid email would be: user@domain.com');
                emailFeedback.classList.add('invalid-help');
            }
        }
    }

    const checkPhone = function () {
        var phoneformat = /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/;
        if (phone.value === '') {
            phone.setCustomValidity('');
        } else {
            if (phone.value.match(phoneformat)) {
                phone.setCustomValidity('');
            } else {
                phone.setCustomValidity('Invalid phone number. Parentheses and dashes optional.');
            }
        }
        updateErrorsList();
    }

    function checkCCName() {
        let help = ccName.nextElementSibling;
        if (!ccName.checkValidity()) {
            ccNameHelp.innerHTML = ccName.getAttribute('data-invalid');
        } else {
            ccNameHelp.innerHTML = "";
        }
    }
    const checkCCNum = function () {
        let help = ccNum.nextElementSibling;
        let resp = checkCreditCard(ccNum.value);
        let selType = document.querySelector('input[name="type"]:checked').value;
        //let err;
        if (resp.success) {
            if (selType != resp.type) {
                let err = `Not valid ${selType} number (appears to be ${resp.type}).`;
                ccNum.setCustomValidity(err);
                help.innerHTML = err;
                console.log(err);
            } else {
                ccNum.setCustomValidity('');
                help.innerHTML = '';
            }
        } else {
            ccNum.setCustomValidity(resp.message);
            help.innerHTML = resp.message;
        }
        // var ccformat = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
        // let help = ccNum.nextElementSibling;
        // if (ccNum.value == 0) {
        //     ccNum.setCustomValidity('');
        // } else {
        //     if (ccNum.value.match(ccformat)) {
        //         ccNum.setCustomValidity('');
        //         help.innerHTML = '';
        //     } else {
        //         const lettersRegEx = /[A-Za-z]*/;
        //         let hasLetters = lettersRegEx.test(ccNum.value);
        //         if (hasLetters) {
        //             let noLetters = 'Credit card number cannot have letters.';
        //             ccNum.setCustomValidity(noLetters);
        //             help.innerHTML = noLetters
        //         } else {
        //             let generic = 'Must be 16 digits. Space or hyphen between every 4 digits is optional.';
        //             ccNum.setCustomValidity(generic);
        //             help.innerHTML = generic;
        //         }
        //     }
        // }
    }
    function isValid_CVV_Number(CVV_Number) {
        // Regex to check valid
        // CVV_Number 
        let regex = new RegExp(/^[0-9]{3,4}$/);
     
        // if CVV_Number
        // is empty return false
        if (CVV_Number == null) {
            return "false";
        }
     
        // Return true if the CVV_Number
        // matched the ReGex
        if (regex.test(CVV_Number) == true) {
            return "true";
        }
        else {
            return "false";
        }
    }

    let checkDate = function () {

    }

    let togglePayment = function () {
        if (monthly.checked) {
            paymentInfo.classList.add("show");
            //cardInfo.removeAttribute('disabled');
            cardInfo.querySelectorAll('[data-toggle-required]').forEach(item => {
                item.setAttribute("required", true);
            });
            cardInfo.querySelectorAll('[data-toggle-pattern]').forEach(item => {
                item.setAttribute("pattern", item.getAttribute("data-toggle-pattern"));
            });
        } else {
            paymentInfo.classList.remove("show");
            cardInfo.querySelectorAll('[data-toggle-required]').forEach(item => {
                item.removeAttribute("required", true);
            });
            cardInfo.querySelectorAll('[data-toggle-pattern]').forEach(item => {
                item.removeAttribute("pattern", item.getAttribute("data-toggle-pattern"));
            });
            //cardInfo.setAttribute('diabled', true);
        }

        form.checkValidity();
        updateErrorsList();
    }

    togglePayment();
    var prev = null;
    for (var i = 0; i < cardType.length; i++) {
        cardType[i].addEventListener('change', function() {
            (prev) ? prev.value: null;
            if (this !== prev) {
                ccNumHelp.innerHTML = cardFormats[this.value];
                prev = this;
            }
        });
    }

    monthly.addEventListener('change', togglePayment);



    function updateErrorsList() {
        var inv = form.querySelectorAll(`:invalid:not(fieldset)`), numErrors = inv.length;
        let errs = "";
        for (var i = 0; i < numErrors; i++) {
            var controlId = inv[i].id;
            var label = document.getElementById(controlId);
            var labelText = accname.getAccessibleName(label);
            var msg = inv[i].nextElementSibling.innerHTML;
            errs += `<li id="${controlId}Item" class="list-group-item"><b><a href="#${controlId}">${labelText}</a>:</b><div>${msg}</div></li>`;
        }
        errors.innerHTML = errs;

        document.querySelector('.num-errors').innerHTML = numErrors;
    }

    // const validationAlert = function () {
    //     var inv = form.querySelectorAll(`:invalid:not(fieldset)`), numErrors = inv.length;
    //     status.innerHTML += `<div class="alert alert-danger"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="images/bootstrap-icons.svg#exclamation-triangle-fill"/></svg>${numErrors} invalid form entries</div>`;
    //     setTimeout(() => { removeMsg(status.querySelector('div:last-child')) }, 5000);
    // }
    // const removeMsg = function (msg) {
    //     status.removeChild(msg);
    // }
    // Loop over them and prevent submission

    function processForm(e) {
        if (e.preventDefault) e.preventDefault();
        //alert("Imagine this returns results.");
        checkFirst();
        checkLast();
        checkUsername();
        checkDOB();
        checkPasswords();
        checkSocial();
        checkEmail();
        checkPhone();
        checkCCName();
        checkCCNum();
        let isValid = form.checkValidity();
        var inv = form.querySelectorAll(`:invalid:not(fieldset)`), numErrors = inv.length;

        updateErrorsList();

        if (!validated) {
            form.classList.add('was-validated');
            first.addEventListener('input', checkFirst, false);
            first.addEventListener('input', checkLast, false);
            username.addEventListener('input', checkUsername, false);
            dob.addEventListener('input', checkDOB, false);
            password.addEventListener('input', checkPasswords, false);
            retype.addEventListener('input', checkPasswords, false);
            ssn.addEventListener('input', checkSocial, false);
            // dob.addEventListener('input', checkDate, false);
            email.addEventListener('input', checkEmail, false);
            phone.addEventListener('input', checkPhone, false);
            ccName.addEventListener('input', checkCCName, false);
            ccNum.addEventListener('input', checkCCNum, false);
            validated = true;
            // let errorRegion = form.querySelector("errorRegion");
        }

        console.log(isValid);
        if (!isValid) {
            //validationAlert();
            if (numErrors > 0) {
                errorRegion.classList.remove("d-none");
            } else {
                errorRegion.classList.add("d-none");
            }

            document.querySelector('.num-errors').innerHTML = numErrors;
            details.focus();

            return false;
            // event.preventDefault();
            // event.stopPropagation();
        } else {
            if (monthly.checked) {
                let retVal = confirm("You're committing to paying $19.99 per month for membership dues.  Is that alright?  If so, click OK to continue.");
                if (retVal == true) {
                    return true;
                } else {
                    return false;
                    // event.preventDefault();
                    // event.stopPropagation();
                }
            }
        }

    }

    if (form.attachEvent) {
        form.attachEvent("submit", processForm);
    } else {
        form.addEventListener("submit", processForm);
    }

    form.addEventListener('submit', function (event) {
        checkFirst();
        checkLast();
        checkUsername();
        checkDOB();
        checkPasswords();
        checkSocial();
        checkEmail();
        checkPhone();
        checkCCName();
        checkCCNum();
        let isValid = form.checkValidity();
        var inv = form.querySelectorAll(`:invalid:not(fieldset)`), numErrors = inv.length;

        updateErrorsList();

        if (!validated) {
            form.classList.add('was-validated');
            first.addEventListener('input', checkFirst, false);
            first.addEventListener('input', checkLast, false);
            username.addEventListener('input', checkUsername, false);
            dob.addEventListener('input', checkDOB, false);
            password.addEventListener('input', checkPasswords, false);
            retype.addEventListener('input', checkPasswords, false);
            ssn.addEventListener('input', checkSocial, false);
            // dob.addEventListener('input', checkDate, false);
            email.addEventListener('input', checkEmail, false);
            phone.addEventListener('input', checkPhone, false);
            ccName.addEventListener('input', checkCCName, false);
            ccNum.addEventListener('input', checkCCNum, false);
            validated = true;
            // let errorRegion = form.querySelector("errorRegion");
        }

        event.preventDefault();
        event.stopPropagation();
        return false;
        if (!isValid) {
            //validationAlert();
            if (numErrors > 0) {
                errorRegion.classList.remove("d-none");
            } else {
                errorRegion.classList.add("d-none");
            }

            document.querySelector('.num-errors').innerHTML = numErrors;
            errorsHeading.focus();

            event.preventDefault();
            event.stopPropagation();
        } else {
            if (monthly.checked) {
                let retVal = confirm("You're committing to paying $19.99 per month for membership dues.  Is that alright?  If so, click OK to continue.");
                if (retVal == true) {
                    return true;
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
    }, false);

})()