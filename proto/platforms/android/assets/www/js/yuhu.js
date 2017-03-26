// *************************************************** //
// * Yuhu ClientWorks ******************************** //
// * Alpha Stage ************************************* //
// * Developed by ************************************ //
// * Carlos Eduardo (carlosed_almeida@Live.com) ****** //
// *************************************************** //

var Yuhu = (function () {
    'use strict';
    
    var lalala = 1,
        
        // Often used
        panel,
        drawer,
        drawerUser,
        drawerList,
        main,
        navbar,
        explore,
        favorites,
        myQuestions,
        newQuestion,
        cards,
        floatingButton,
        
        // Defaults
        hashHistory = [],
        
        config = {
            cordova: 1,
            page: 'index',
            navbar: 'with-logo', // 'with-logo' - 'normal-title' - 'medium-title',
            user: {
                name: "Carlos Eduardo",
                email: "carlosed_almeida@live.com",
                picture: "./img/hu2009.jpg"
            }
        },
        
        // API
        API = {
            boot: boot,
            config: config,
            hashHistory: hashHistory
        };
    
    // Setup the environment
    function registerElements () {
        document.registerElement('yuhu-stats', { prototype: Object.create(HTMLElement.prototype) });
        document.registerElement('yuhu-explore', { prototype: Object.create(HTMLElement.prototype) });
        document.registerElement('yuhu-my-questions', { prototype: Object.create(HTMLElement.prototype) });
        document.registerElement('yuhu-favorites', { prototype: Object.create(HTMLElement.prototype) });
    }
    
    //Checks if the number is an Integer or Floating Point
    function isInt (num) {
        if (num % 1 === 0) {
            return true;
        } else if (num % 1 !== 0) {
            return false;
        }
    }
    
    // Extend object a with the properties of object b.
    // If there's a conflict, object b takes precedence.
    // Thanks to Hakim El Hattab (@hakimel)
    function extend (a, b) {
        for( var i in b ) {
            a[i] = b[i];
        }
    }
    
    function utf8ToB64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    function b64ToUtf8(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }

    function loadJS(src, async, cb){
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = async;
        ref.parentNode.insertBefore( script, ref );
        if (cb && typeof(cb) === "function") {
            script.onload = cb;
        }
        return script;
    }
    
    function updateHistory (state, dontPush) {
		if (!dontPush) {
			var hash = '#' + state;
			if (window.history.pushState) {
				window.history.pushState(state, 'State: ' + state, (window.location.origin + window.location.pathname + hash));
			} else {
				window.location.replace(hash);
			}
            hashHistory.push(state);
		}
	}
    
    function popState (e) {
        if (e.state !== null) {
            if (e.state == 'explorar') {
                changeTab('Explorar');
            } else if (e.state == 'minhas-perguntas') {
                changeTab('Minhas Perguntas');
            } else if (e.state == 'nova-pergunta') {
                toggleNewQuestion();
            }
            e.preventDefault();
        } else {
            setTabByHash();
        }
        console.log('lalala');
    }
    
    function setTabByHash () {
        var tabs = document.querySelector('paper-tabs');
        var yuhuList = document.querySelector('yuhu-list');
        var hash = location.hash.substr(1);
        
        if (location.pathname === "/" || location.pathname === "/index.html") {
            if (location.hash !== "") {
                changeTab(hash);  
            } else {
                updateHistory('explorar');
                tabs.setAttribute('selected', '0');
                explore.classList.add('active');
                yuhuList.setAttribute('active', 'Explorar');
            }
        } else if (location.pathname === "/favoritos.html") {
            updateHistory('favoritos');
        }
    }
    
    function setSearch () {
        var search = navbar.querySelector('paper-input');
        if (config.navbar == 'normal-title') {
            search.style.width = (navbar.offsetWidth - 140) + 'px';
        } else if (config.navbar == 'with-logo') {
            search.style.width = (navbar.offsetWidth - 200) + 'px';
        }
    }
    
    function toggleSearch () {
        var search = navbar.querySelector('paper-input');
        
        if (config.navbar == 'normal-title') {
            var title = navbar.querySelector('.title');
            title.classList.toggle('title-hidden');
        } else if (config.navbar == 'with-logo') {
            var logo = navbar.querySelector('img');
            logo.classList.toggle('logo-hidden');
        }
        
        search.classList.toggle('pi-hidden');
    }
    
    function changeTab (tab) {
        var yuhuList = document.querySelector('yuhu-list');
        var tabs = document.querySelector('paper-tabs');
        
        if (tab == "Explorar" || tab === 'explorar') {
            updateHistory('explorar');
            tabs.setAttribute('selected', '0');
            myQuestions.classList.remove('active');
            explore.classList.add('active');
            yuhuList.setAttribute('active', 'Explorar');
        } else if (tab == "Minhas Perguntas" || tab === 'minhas-perguntas') {
            updateHistory('minhas-perguntas');
            tabs.setAttribute('selected', '1');
            explore.classList.remove('active');
            myQuestions.classList.add('active');
            yuhuList.setAttribute('active', 'Minhas Perguntas');
        }
    }
    
    function goToPage (page, samePage) {
        var spinner = document.createElement('paper-spinner');
        
        if (!samePage) {
            panel.classList.add('close');
            spinner.setAttribute('active', '');
            spinner.classList.add('spinner-showup');
            setTimeout(function () {
                document.body.appendChild(spinner);
                setTimeout(function () {
                    spinner.classList.toggle('spinner-showup');
                    spinner.classList.toggle('spinner');
                }, 250);
            }, 250);
        }
        
        if (page == 'Explorar') {
            if (samePage) {
                changeTab(page);
            } else {
                setTimeout(function () {
                    location.replace('index.html#explorar');
                }, 1000);
            }
        } else if (page == 'Favoritos') {
            setTimeout(function () {
                location.replace('favoritos.html#favoritos');
            }, 1000);
        } else if (page == 'Minhas Perguntas') {
            if (samePage) {
                changeTab(page);
            } else {
                setTimeout(function () {
                    location.replace('index.html#minhas-perguntas');
                }, 1000);
            }
        } else if (page == 'Assuntos do Momento') {
            console.log('lalala');
        } else if (page == 'Configurações') {
            setTimeout(function () {
                location.replace('configs.html');
            }, 1000);
        } else if (page == 'Ajuda e feedback') {
        }
    }
      
    function removeFavorite (e) {
        if (config.page == 'favoritos') {
            var cards = favorites.querySelectorAll('yuhu-card');
            console.log(e);
            console.log('Removed card index: ' + e.path[6].dataset.index);
            e.path[6].classList.add('favorite-remove');
            for (var i=parseInt(e.path[6].dataset.index); i<cards.length; i++) {
                cards[i].style.transform = 'translateY(-100%)';
            }
            
/*            for (var i=(parseInt(e.path[6].dataset.index)+1); i<cards.length; i++) {
                console.log('-100% - ' + i);
                cards[i].style.transform = 'translateY(-100%)';
            }
            setTimeout(function () {
                favorites.removeChild(e.path[6]);
                for (var i=(parseInt(e.path[6].dataset.index)+1); i<cards.length; i++) {
                    console.log('0 - ' + i);
                    cards[i].style.transform = 'translateY(0)';
                }
            }, 350);*/
        }
    }
    
    function generateCardsIndex () {
        if (config.page == 'index') {
            var exploreCards = explore.querySelectorAll('yuhu-card');
            var myCards = myQuestions.querySelectorAll('yuhu-card');
            
            for (var i=0; i<exploreCards.length; i++) {
                exploreCards[i].dataset.index = i+1;
            }
            for (var i=0; i<myCards.length; i++) {
                myCards[i].dataset.index = i+1;
            }
        } else if (config.page == 'favorites') {            
            for (var i=0; i<cards.length; i++) {
                cards[i].dataset.index = i+1;
            }
        }
    }
    
    function generateCardsByJSON () {
    }
    
    function setCards (gambi) {
        var innerCards = main.querySelectorAll('yuhu-card::shadow article');
        var mainWidth = main.offsetWidth;
        var width;
        
        if (config.page == 'index') {
            explore.style.width = (mainWidth - 20) + 'px';
            explore.style.height = 'auto';
            myQuestions.style.width = (mainWidth - 20) + 'px';
            myQuestions.style.height = 'auto';
            width = explore.offsetWidth;
        } else if (config.page == 'favoritos') {
            favorites.style.width = (mainWidth - 20) + 'px';
            favorites.style.height = 'auto';
            width = favorites.offsetWidth;
        }
        
        if (width < 640) {
            for (var i=0; i<innerCards.length; i++) {
                innerCards[i].style.width = (width - 15) + 'px';
                innerCards[i].style.height = 'auto';
                if (innerCards[i].attributes.mode.nodeValue == 'public' || innerCards[i].attributes.mode.nodeValue == 'favorite') {
                    innerCards[i].querySelector('.question').style.width = (width - 75) + 'px';
                    
                } else if (innerCards[i].attributes.mode.nodeValue == 'private') {
                    innerCards[i].querySelector('.question').style.width = (width - 15) + 'px';
                } else if (gambi) {
                    innerCards[i].querySelector('.question').style.width = (width - 15) + 'px';
                }
            }
            
        } else {
            for (var i=0; i<innerCards.length; i++) {
                innerCards[i].style.width = (width - 25) + '.px';
                innerCards[i].style.height = 'auto';
                innerCards[i].querySelector('.question').style.width = (width - 75) + 'px';
            }
            
        }
    }
    
    function setInitialRatingColor () {
        var ratings = main.querySelectorAll('yuhu-card::shadow article .number');
        for (var i=0; i<ratings.length; i++) {
            if (parseInt(ratings[i].innerHTML) < 0) {
                ratings[i].classList.add('disliked');
            } else {
                ratings[i].classList.add('liked');
            }
        }
    }
    
    function setRatingColor (number) {
        if (parseInt(number.innerHTML) < 0) {
            number.classList.remove('liked');
            number.classList.add('disliked');
        } else {
            number.classList.remove('disliked');
            number.classList.add('liked');
        }
    }
    
    function setRatingValue (e) {
        var ratings = main.querySelectorAll('yuhu-card::shadow article .number');
        var number = e.target.parentElement.querySelector('.number');
        if (e.target.attributes.icon.nodeValue == "expand-less") {
            number.innerHTML = parseInt(number.innerHTML) + 1;
        } else if (e.target.attributes.icon.nodeValue == "expand-more") {
            number.innerHTML = parseInt(number.innerHTML) - 1;
        }
        setRatingColor(number);
    }
    
    function createNewCard (e) {
        var newQuestionContainer = e.target.parentElement.parentElement;
        var pergunta = newQuestionContainer.querySelector('[label="Pergunta"] input').value;
        var hashtag = newQuestionContainer.querySelector('[label="Hashtag"] input').value;
        var descricao = newQuestionContainer.querySelector('textarea').value;
        var date = new Date();
        
        var card = document.createElement('yuhu-card');
        var firstCard = myQuestions.querySelectorAll('yuhu-card')[0];
        
        card.setAttribute('question', pergunta);
        card.setAttribute('hashtag', hashtag);
        card.setAttribute('author', config.user.name);
        card.setAttribute('mode', 'private');
        card.setAttribute('date', date.getUTCDay() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear());
        card.setAttribute('answers', '0');
        
        myQuestions.insertBefore(card, firstCard);
        
        toggleNewQuestion();
        changeTab('Minhas Perguntas');
        setCards(1);
        
    }
    
    function openCard (e) {
        var request = new XMLHttpRequest();
        var cards = 'cards.json';
        
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == '200') {
                var parsed = JSON.parse(request.responseText);
                doThisSShit(parsed, e);
            }
        }        
        
        request.open('GET', cards, true);
        request.send();
        
    }
    
    function doThisSShit (data, e) {
        console.log(data);
        console.log(e);
        
        var id = e.target.getAttribute('id');
        console.log(id);
    }
    
    function toggleOverlay () {
        var element = document.querySelector('yuhu-overlay');
        var overlay;
        if (element === null) {
            var node = document.createElement('yuhu-overlay');
            main.insertBefore(node, main.childNodes[0]);
            overlay = document.querySelector('yuhu-overlay /deep/ section');
            setTimeout(function () {
                overlay.classList.add('visible');
            }, 1);
            panel.attributes.disableSwipe = true;
        } else {
            overlay = document.querySelector('yuhu-overlay /deep/ section');
            overlay.classList.remove('visible');
            setTimeout(function () {
                main.removeChild(element);
            }, 350);
            panel.attributes.disableSwipe = false;
        }
    }
    
    function pageGoBack () {
        
    }
    
    function tabHandler (e)  {
        if (e.target.innerHTML == "Explorar") {
            changeTab('Explorar');
        } else {
            changeTab('Minhas Perguntas');
        }
    }
    
    function linkHandler (e) {
        console.log(e.target.parentElement);
        var eventLi = e.target.parentElement;
        if (eventLi.nodeName === "LI") {
            if (eventLi.classList != "active") {
                if ((location.pathname === "/" || location.pathname === "/index.html") && (eventLi.innerText == "Explorar" || eventLi.innerText == "Minhas Perguntas")) {
                    goToPage(eventLi.innerText, 1);
                } else {
                    goToPage(eventLi.innerText);
                }
            }
        } else if (e.target.icon_ === "star") {
            goToPage("Favoritos");
        }
    }
    
    function setNewQuestion () {
        var width = panel.offsetWidth;
        var height = panel.offsetHeight;
        
        if (width < 640) {
            newQuestion.style.width = width + 'px';
        } else {
            newQuestion.style.width = (width - 256) + 'px';
        }
        
        newQuestion.style.height = height + 'px';
        newQuestion.style.top = '0';
        //newQuestion.style.width = (width - 30) + 'px';
        //newQuestion.style.height = (height - 30) + 'px';
        //newQuestion.style.top = '15px';
        //newQuestion.style.left = '15px';
    }
    
    function toggleNewQuestionView () {
        newQuestion.classList.toggle('hidden');
        floatingButton.classList.toggle('fa-hidden');
    }
    
    function toggleNewQuestion (e) {
        if (floatingButton.classList == 'fa-hidden') {
            updateHistory(hashHistory[hashHistory.length-2]);
        } else {
            updateHistory('nova-pergunta');
        }
        toggleOverlay();
        toggleNewQuestionView();
    }
    
    function actionButton (e) {
        toggleOverlay();
        toggleNewQuestionView();
        updateHistory('nova-pergunta');
    }
    
    function onResize () {
        setCards();
        setNewQuestion();
        setSearch();
    }
    
    function polymerReady () {
        
        /*
        //  Core Drawer Panel
        */
        
        panel = document.querySelector('core-drawer-panel');
        
        /* Drawer */
        
        drawer = document.querySelectorAll('core-header-panel')[0];
        drawerUser = drawer.querySelector('yuhu-user');
        drawerList = drawer.querySelectorAll('yuhu-list /deep/ paper-ripple');
        
        /* Main */
        
        main = document.querySelectorAll('core-header-panel')[1];
        
        // Core Toolbar
        navbar = main.querySelector('core-toolbar');
        
        // Yuhu Content
        explore = main.querySelector('yuhu-explore');
        favorites = main.querySelector('yuhu-favorites');
        myQuestions = main.querySelector('yuhu-my-questions');
        newQuestion = main.querySelector('yuhu-new-question /deep/ article');
        cards = main.querySelectorAll('yuhu-card');
        floatingButton = main.querySelector('paper-fab');
            
            
        var rateUp = main.querySelectorAll('yuhu-card::shadow article [icon="expand-less"]');
        var rateDown = main.querySelectorAll('yuhu-card::shadow article [icon="expand-more"]');
        var tabs = navbar.querySelectorAll('paper-tab');
        var search = navbar.querySelector('[icon="search"]');
        var favoritesButton = navbar.querySelector('[icon="star"]');
        var favoritesGoBack = navbar.querySelector('[icon="arrow-back"]');
        var goBack = document.querySelector('yuhu-new-question::shadow header paper-icon-button[icon="arrow-back"]');
        var removeFavButton = main.querySelectorAll('yuhu-favorites yuhu-card /deep/ paper-icon-button[icon="star"]');
        var sendQuestion = newQuestion.querySelector('paper-button');
        
        if (config.page == 'index' || config.page == 'favoritos') {
            setInitialRatingColor();
            generateCardsIndex();
            setTabByHash();
            
            setCards();
            setNewQuestion();
            setSearch();
        }
        
        window.addEventListener('popstate', popState, false);
        //document.addEventListener("backbutton", backButton, false);
        
        if (config.page == 'index' || config.page == 'favoritos') {
            search.addEventListener('click', toggleSearch, false);
            floatingButton.addEventListener('click', toggleNewQuestion, false);
            goBack.addEventListener('click', toggleNewQuestion, false);
            sendQuestion.addEventListener('click', createNewCard, false);
        }
        
        if (config.page == "index") {
            favoritesButton.addEventListener('click', linkHandler, false);
        } else if (config.page == 'favoritos') {
            favoritesGoBack.addEventListener('click', pageGoBack, false);
        }
        
        for (var i=0; i<drawerList.length; i++) {
            drawerList[i].addEventListener('click', linkHandler, false);
        }
        
        for (var i=0; i<removeFavButton.length; i++) {
            removeFavButton[i].addEventListener('click', removeFavorite, false);
        }

        for (var i=0; i<rateUp.length; i++) {
            rateUp[i].addEventListener('click', setRatingValue, false);
            rateDown[i].addEventListener('click', setRatingValue, false);
        }
        
        for (var i=0; i<tabs.length; i++) {
            tabs[i].addEventListener('click', tabHandler, false);
        }
        
        for (var i=0; i<cards.length; i++) {
            cards[i].addEventListener('click', openCard, false);
        }
        
    }
    
    function deviceReady () {
        document.addEventListener('polymer-ready', polymerReady, false);
    }
    
    function eventListeners (cordova) {
        if (cordova) {
            document.addEventListener('deviceready', deviceReady, false);
        } else {
            document.addEventListener('polymer-ready', polymerReady, false);
        }
        
        window.addEventListener('resize', onResize, false);
    }
    
    // Initialization sequence
    function boot (options) {
        extend(config, options);
        registerElements();
        
        if (config.cordova) {
            eventListeners(config.cordova);
        } else {
            eventListeners();
        }
    }

	// Return the API
	return API;

})();