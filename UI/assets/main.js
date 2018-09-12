const UIController = (() => {
    const DOMstrings = {
        hamburger: '.hamburger',
        backdrop: '.backdrop',
        mobileNav: '.mobile-nav',
        tabs: '.tab-content',
        pizza: '#pizza',
        pastries: '#pastries',
        meals: '#meals',
        drinks: '#drinks',
        pizzaBtn: '#pizza-btn',
        pastriesBtn: '#pastries-btn',
        mealsBtn: '#meals-btn',
        drinksBtn: '#drinks-btn',
        signUpBtn: '.sign-up__cta'
    }

    return {
        toggleHamburger: () => {
            document.querySelector(DOMstrings.mobileNav).classList.add('open');
            document.querySelector(DOMstrings.backdrop).classList.add('open');
        },
        getDOMStrings: () => {
            return DOMstrings;
        },
        closeMobileNav: () => {
            document.querySelector(DOMstrings.mobileNav).classList.remove('open');
            document.querySelector(DOMstrings.backdrop).classList.remove('open');
        },
        openTabContent: (tabId) => {
            document.querySelectorAll(DOMstrings.tabs).forEach(tab => tab.style.display = 'none');
            document.querySelector(tabId).style.display = 'block';
        },
        redirect: (url) => {
            window.location = url;
        }
    }
})();

const controller = ((UICtrl) => {
    const DOM = UICtrl.getDOMStrings();
    const setupEventListeners = () => {
        document.querySelector(DOM.hamburger).addEventListener('click', UICtrl.toggleHamburger);
        document.querySelector(DOM.backdrop).addEventListener('click', UICtrl.closeMobileNav);
        document.querySelector(DOM.pastriesBtn).addEventListener('click', UICtrl.openTabContent.bind(null, DOM.pastries));
        // document.querySelector(DOM.pizzaBtn).addEventListener('click', UICtrl.openTabContent.bind(null, DOM.pizza));
        document.querySelector(DOM.drinksBtn).addEventListener('click', UICtrl.openTabContent.bind(null, DOM.drinks));
        document.querySelector(DOM.mealsBtn).addEventListener('click', UICtrl.openTabContent.bind(null, DOM.meals));
        document.querySelectorAll(DOM.signUpBtn).forEach(btn => btn.addEventListener('click', UICtrl.redirect.bind(null, 'UI/register.html')));
    }
    return {
        init: () => {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(UIController);

controller.init();