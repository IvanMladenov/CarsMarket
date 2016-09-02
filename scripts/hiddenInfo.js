(function configureInfoPopups() {
    var aboutInfo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    var contact = 'Telephone: +359 88796416489; 02 166432 32164; Email: gosho@muelosho.com';

    $('#contact').magnificPopup({
        items:{
            src: $('<div class="white-popup">').text(contact)
        },
        type: 'inline'
    });
    $('#about-us').magnificPopup({
        items:{
            src: $('<div class="white-popup">').text(aboutInfo)
        },
        type: 'inline'
    });
})();
