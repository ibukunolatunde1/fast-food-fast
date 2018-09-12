const registerController = (() => {

    return {
        validateInput: (input) => {
            const errors = {};
            const errorMessage = [
                'Name is required to be only letters and greater than 2 letters',
                'Enter a valid Email Address',
                'Password is required to be only letters and greater than 2 letters',
                'Tel No is required'
            ];
            let status;
            Object.keys(input).forEach( key => {
                switch(key) {
                    case 'firstName':
                        status = !(/^[a-zA-Z]{2,}/.test(input.firstName));
                        if(status) errors.name = errorMessage[0];
                        break;
                    case 'lastName':
                        status = !(/^[a-zA-Z]{2,}/.test(input.firstName));
                        if(status) errors.name = errorMessage[0];
                        break;
                    case 'email':
                        status = !(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input.email));
                        if(status) errors.email = errorMessage[1];
                        break;
                    case 'tel':
                        status = !(/^[0-9]{11}/.test(input.tel));
                        if(status) errors.tel = errorMessage[3];
                        break;
                    case 'password':
                        if ( input.password.length < 8 ) errors.password = errorMessage[2];
                        break;
                }
            });
            return errors;
        }
    }

})();

const UIController = (() => {
    const DOMstrings = {
        hamburger: '.hamburger',
        backdrop: '.backdrop',
        mobileNav: '.mobile-nav',
        firstName: '#firstName',
        lastName: '#lastName',
        email: '#email',
        tel: '#tel',
        password: '#password',
        repeatPassword: '#repeatPassword',
        registerBtn: '#sign-up__button',
        errorContainer: '.errors-container'
    }

    const clearInput = () => {
        document.querySelector(DOMstrings.firstName).value = '';
        document.querySelector(DOMstrings.lastName).value = '';
        document.querySelector(DOMstrings.email).value = '';
        document.querySelector(DOMstrings.tel).value = '';
        document.querySelector(DOMstrings.password).value = '';
        document.querySelector(DOMstrings.repeatPassword).value = '';
    }

    const clearAlert = () => {
        const alert = document.querySelector(DOMstrings.errorContainer);
        if(alert){
            alert.remove();
        }
    }

    return {
        getRegisterInput: () => {
            return {
                firstName: document.querySelector(DOMstrings.firstName).value,
                lastName: document.querySelector(DOMstrings.lastName).value,
                email: document.querySelector(DOMstrings.email).value,
                tel: document.querySelector(DOMstrings.tel).value,
                password: document.querySelector(DOMstrings.password).value,
                repeatPassword: document.querySelector(DOMstrings.repeatPassword).value
            }
        },
        getDOMStrings: () => {
            return DOMstrings;
        },
        toggleHamburger: () => {
            document.querySelector(DOMstrings.mobileNav).classList.add('open');
            document.querySelector(DOMstrings.backdrop).classList.add('open');
        },
        closeMobileNav: () => {
            document.querySelector(DOMstrings.mobileNav).classList.remove('open');
            document.querySelector(DOMstrings.backdrop).classList.remove('open');
        },
        notifyError: (errors) => {
            const div = document.createElement('div');
            div.className = 'errors-container';
            let html = '';
            Object.keys(errors).forEach( error => {
                html += `<p>${errors[error]}</p>`;
            });
            div.innerHTML = html;
            const container = document.querySelector('.signup-form__container');
            const form = document.querySelector('.signup-form');
            container.insertAdjacentElement('afterbegin', div);

            // Remove the message after like 3 seconds
            setTimeout(() => clearAlert(), 3000);

            // Then Clear fields
            // clearInput();
        },
        redirect: (url) => {
            window.location = url;
        }
    }
})();

const controller = ((regCtrl, UICtrl) => {
    const DOM = UICtrl.getDOMStrings();
    const ctrlAddUser = () => {
        // 1. Get User Input
        const input = UICtrl.getRegisterInput();
        
        // 2. Validate User Input
        const error = regCtrl.validateInput(input);
        
        // 3. If Error in input, return back to user
        if( Object.keys(error).length !== 0 ){
            UICtrl.notifyError(error);
        } else {
            // 4. Else, store in local storage and direct user to the dashboard
            UICtrl.redirect('user-dashboard.html');
        }
        
    }
    const setupEventListeners = () => {
        document.querySelector(DOM.hamburger).addEventListener('click', UICtrl.toggleHamburger);
        document.querySelector(DOM.backdrop).addEventListener('click', UICtrl.closeMobileNav);
        document.querySelector(DOM.registerBtn).addEventListener('click', ctrlAddUser);
    }
    return {
        init: () => {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(registerController, UIController);

controller.init();