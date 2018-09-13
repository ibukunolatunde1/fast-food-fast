const UIController = (() => {
    const DOMstrings = {
        hamburger: '.hamburger',
        backdrop: '.backdrop',
        mobileNav: '.mobile-nav',
        email: '#email',
        password: '#password',
        signInBtn: '.sign-in__btn',
    }

    return {
        getLogInInput: () => {
            return {
                email: document.querySelector(DOMstrings.email).value,
                password: document.querySelector(DOMstrings.password).value,
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
            container.insertAdjacentElement('afterbegin', div);

            // Remove the message after like 3 seconds
            setTimeout(() => clearAlert(), 3000);

            // Then Clear fields
            clearInput();
        },
        redirect: (url) => {
            window.location = url;
        }
    }
})();

const controller = ((UICtrl) => {
    const DOM = UICtrl.getDOMStrings();
    
    const signInUser = () => {
        const input = UICtrl.getLogInInput();
        if( input.email.trim() === 'ibukun@olatunde.com' && input.password.trim() === 'ibukunolatunde') {
            UICtrl.redirect('admin-dashboard.html');
        } else {
            UICtrl.redirect('user-dashboard.html');
        }
    }

    const setupEventListeners = () => {
        document.querySelector(DOM.hamburger).addEventListener('click', UICtrl.toggleHamburger);
        document.querySelector(DOM.backdrop).addEventListener('click', UICtrl.closeMobileNav);
        document.querySelector(DOM.signInBtn).addEventListener('click', signInUser);
    }
    return {
        init: () => {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(UIController);

controller.init();