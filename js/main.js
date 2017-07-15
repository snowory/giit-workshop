window.onload = function () {

    window.loader = new Loader();

    loader.preload(["img/cat.jpg"], function () {

        // creates renderer
        window.renderer = new Renderer();

        //creates keyboardManager
        window.keyboardManager = new KeyboardManager();

        // starts render loop
        renderer.animate(0);


        // create new Pixi Sprite with Pixi Texture from Loader
        var cat = new PIXI.Sprite(loader.getTexture("img/cat.jpg"));

        //Set sprite scale
        cat.scale.set(0.3);

        //Set sprite position: x=200 and y=200
        cat.position.set(200, 200);

        //Set sprite anchor: x=0.5 and y=0.5
        cat.anchor.set(0.5, 0.5);

        //Create update function: moving cat with defined speed by selected angle
        cat.update = function (dT) {
            //Define moving object speed
            var speed = 5 / 1000 * dT;

            //Update sprite position
            this.position.x += speed * Math.cos(this.rotation);
            this.position.y += speed * Math.sin(this.rotation);
        };

        //Create new instance of KeyboardManager
        var kMen = new KeyboardManager();

        //Subcribe to "leftArrowDown" event
        kMen.subscribe("leftArrowDown", function () {
            cat.rotation -= 0.1;
        });

        //Subcribe to "rightArrowDown" event
        kMen.subscribe("rightArrowDown", function () {
            cat.rotation += 0.1;
        });

        //Add sprite to main stage - sprite becomes visible
        renderer.addToRenderLoop(cat);

        //Add sprite to UpdateLoop - sprites update() function will be called with dT parameter
        renderer.addToUpdateLoop(cat);

        /**
         * Entry point of a game.
         *
         * Here you can add your game logic.
         *
         */
    });
};

