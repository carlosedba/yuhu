var Cordova = 0

// Web Components
var YuhuApp = document.registerElement('yuhu-app', { prototype: Object.create(HTMLElement.prototype) });
var YuhuNav = document.registerElement('yuhu-nav', { prototype: Object.create(HTMLElement.prototype) });
var YuhuExplore = document.registerElement('yuhu-explore', { prototype: Object.create(HTMLElement.prototype) });

var Yuhu = {
    
    // Application Constructor
    initialize: function() {
        
        if (Cordova) {
            this.bindEvents();
        }
    },
    
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        Yuhu.receivedEvent('deviceready');
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

Yuhu.initialize();
/*

var Yuhu = (function () {
	'use strict';
    
    // API
    var API = {
        boot: boot
    };
    
    function initialize () {
        bindEvents();
    }
    
    function bindEvents () {
        document.addEventListener('deviceready', onDeviceReady, false);
    }
    
    function onDeviceReady () {
        receivedEvent('deviceready');
    }
    
    function receivedEvent (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    
    // Initialization sequence
    function boot () {
        //extend(config, options);
        initialize();
    }

	// Return the API
	return API;
});

*/