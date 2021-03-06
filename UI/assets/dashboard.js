const UIController = (() => {
    const DOMstrings = {
        hamburger: '.hamburger',
        backdrop: '.backdrop',
        mobileNav: '.mobile-nav',
        tabs: '.tab-content',
        menu: '.menu-content__container',
        pizza: '#pizza-tab',
        pastries: '#pastries-tab',
        meals: '#meals-tab',
        drinks: '#drinks-tab',
        specials: '#specials-tab',
        pizzaBtn: '#Pizza',
        pastriesBtn: '#Pastries',
        specialsBtn: '#Specials',
        mealsBtn: '#Meals',
        drinksBtn: '#Drinks',
        signUpBtn: '.sign-up__cta',
        shopOrdersBtn: '.shopping-cart__container',
        modal: '.modal'
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
            console.log('clicked');
            document.querySelectorAll(DOMstrings.menu).forEach(tab => tab.style.display = 'none');
            document.querySelector(tabId).style.display = 'flex';
        }
    }
})();

const controller = ((UICtrl) => {
    const DOM = UICtrl.getDOMStrings();
    const shopOrders = () => {
        document.querySelector(DOM.backdrop).classList.add('open');
        document.querySelector(DOM.modal).classList.add('open');
    }
    const setupEventListeners = () => {
        document.querySelector(DOM.hamburger).addEventListener('click', UICtrl.toggleHamburger);
        document.querySelector(DOM.backdrop).addEventListener('click', UICtrl.closeMobileNav);
        document.querySelector(DOM.pastriesBtn).addEventListener('click', UICtrl.openTabContent.bind(null, DOM.pastries));
        document.querySelector(DOM.pizzaBtn).addEventListener('click', UICtrl.openTabContent.bind(null, DOM.pizza));
        document.querySelector(DOM.drinksBtn).addEventListener('click', UICtrl.openTabContent.bind(null, DOM.drinks));
        document.querySelector(DOM.mealsBtn).addEventListener('click', UICtrl.openTabContent.bind(null, DOM.meals));
        document.querySelector(DOM.specialsBtn).addEventListener('click', UICtrl.openTabContent.bind(null, DOM.specials));
        document.querySelector(DOM.shopOrdersBtn).addEventListener('click', shopOrders);
    }
    return {
        init: () => {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(UIController);

controller.init();