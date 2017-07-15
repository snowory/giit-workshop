window.onload = function () {

    window.loader = new Loader();

    loader.preload(["img/spaceship.png", "img/shoot.png", "img/enemy1.png", "img/enemy.png"], function () {


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

        /**
         * Entry point of a game.
         *
         * Here you can add your game logic.
         *
         */

        // create new Pixi Sprite with Pixi Texture from Loader
        var spaceship = new PIXI.Sprite(loader.getTexture("img/spaceship.png"));
        var bullet = new PIXI.Sprite(loader.getTexture("img/shoot.png"));

        //Set sprite scale
        spaceship.scale.set(0.245);
        spaceship.position.set(400, 550);
        //Set sprite anchor: x=0.5 and y=0.5
        spaceship.anchor.set(0.5, 0.5);
        spaceship.rotation += 3.1415926536;

        bullet.visible = false;
        bullet.scale.set(0.245);
        bullet.isShooting = false;
        bullet.anchor.set(0.5, 0.5);


        //Create new instance of KeyboardManager
        var kMen = new KeyboardManager();

        //Subcribe to "spaceDown" event
        kMen.subscribe("spaceDown", function () {
            if (!bullet.isShooting) {
                bullet.visible = true;
                bullet.position.x = spaceship.position.x;
                bullet.position.y = spaceship.position.y;
                bullet.isShooting = true;
            }
        });


        //Subcribe to "leftArrowDown" event
        kMen.subscribe("leftArrowDown", function () {
            spaceship.position.x -= 15;
            bullet.position.x -= 15;
        });

        //Subcribe to "rightArrowDown" event
        kMen.subscribe("rightArrowDown", function () {
            spaceship.position.x += 15;
            bullet.position.x += 15;
        });


        //Create update function: moving spaceship with defined speed by selected angle
        spaceship.update = function (dT) {
            if (bullet.isShooting) {
                // detect collision
                var enemies = enemyContainer.children;
                for (var i = 0; i < enemies.length(); i++) {
                    var enemy = enemyContainer.getChildAt(i);
                    console.log(enemy.x);
                    if ((bullet.position.x >= enemy.position.x)
                        && (bullet.position.y >= enemy.position.y)
                        && (bullet.position.x <= (enemy.position.x + enemy.x))
                        && (bullet.position.y <= (enemy.position.y + enemy.y))) {
                        enemy.visible = false;
                    }
                }

                // dT - millisecond, 5ms == 0.005 sec
                //Define moving object speed
                var pixelsPerDt = 200;
                var speed = pixelsPerDt / 1000 * dT; // 20 / 5 = 4 pixels per one two hundred's of a second (5ms)

                //Update sprite position
                bullet.position.y -= speed;
            }
        };

        renderer.addToRenderLoop(spaceship);
        renderer.addToUpdateLoop(spaceship);
        renderer.addToRenderLoop(bullet);
        renderer.addToUpdateLoop(bullet);
        renderer.addToRenderLoop(enemyContainer);
        renderer.addToUpdateLoop(enemyContainer);
    });
};

