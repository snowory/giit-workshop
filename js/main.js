window.onload = function () {

    window.loader = new Loader();

    loader.preload(["img/enemy1.png", "img/enemy.png"], function () {

        // creates renderer
        window.renderer = new Renderer();

        //creates keyboardManager
        window.keyboardManager = new KeyboardManager();

        // starts render loop
        renderer.animate(0);

        // create new Pixi Sprite with Pixi Texture from Loader
        var enemyContainer = new PIXI.Container();

        for (var i = 0; i < 13; i++) {
          var enemy = new PIXI.Sprite(loader.getTexture("img/enemy.png"));
          var enemy1 = new PIXI.Sprite(loader.getTexture("img/enemy1.png"));
          var enemy2 = new PIXI.Sprite(loader.getTexture("img/enemy.png"));
          var enemy3 = new PIXI.Sprite(loader.getTexture("img/enemy1.png"));
          enemyContainer.addChild(enemy);
          enemyContainer.addChild(enemy1);
          enemyContainer.addChild(enemy2);
          enemyContainer.addChild(enemy3);

          enemy.scale.set(0.2);
          enemy.position.set(i * 50, 0);

          enemy1.scale.set(0.1);
          enemy1.position.set(i * 50, 50);

          enemy2.scale.set(0.2);
          enemy2.position.set(i * 50, 110);

          enemy3.scale.set(0.1);
          enemy3.position.set(i * 50, 160);
        }


        //Set sprite scale
        //enemy1.scale.set(0.1);

        //
        // enemy1.position.set(200, 200);
        // enemy1.anchor.set(0.5, 0.5);

        //Create update function: moving cat with defined speed by selected angle
      enemyContainer.update = function (dT) {
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
          enemy1.rotation -= 0.1;
        });

        //Subcribe to "rightArrowDown" event
        kMen.subscribe("rightArrowDown", function () {
          enemy1.rotation += 0.1;
        });

        //Add sprite to main stage - sprite becomes visible
        renderer.addToRenderLoop(enemyContainer);

        //Add sprite to UpdateLoop - sprites update() function will be called with dT parameter
        renderer.addToUpdateLoop(enemyContainer);


        /**
         * Entry point of a game.
         *
         * Here you can add your game logic.
         *
         */
    });
};

