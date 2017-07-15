window.onload = function () {

    window.loader = new Loader();

    loader.preload(["img/spaceship.png", "img/shoot.png"], function () {




        // creates renderer
        window.renderer = new Renderer();

        //creates keyboardManager
        window.keyboardManager = new KeyboardManager();

        // starts render loop
        renderer.animate(0);

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

    });
};

