window.onload =  function () {

    window.loader = new Loader();
    loader.preload([/* add your images here*/], function(){

        // creates renderer
        window.renderer = new Renderer();

        //creates keyboardManager
        window.keyboardManager = new KeyboardManager();

        // starts render loop
        renderer.animate(0);

        /**
         * Entry point of a game.
         *
         * Here you can add your game logic.
         *
         */
    });
};