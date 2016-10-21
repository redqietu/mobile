var P2Scene = (function () {
    function P2Scene(container, stage) {
        this.bodyType = p2.Body.DYNAMIC;
        this.world = P2Scene.world;
        this.factor = 50;
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.scoreLabel = new egret.TextField;
        this.deadlineLabel = new egret.TextField;
        this.container = container;
        this.stage = stage;
        P2Scene.world.sleepMode = p2.World.BODY_SLEEPING;
        this.createScore();
        this.createDeadline();
        this.createGround();
        this.loop();
    }
    var d = __define,c=P2Scene,p=c.prototype;
    p.createScore = function () {
        this.container.addChild(this.scoreLabel);
        this.setScore(P2Scene.score = 0);
        this.scoreLabel.x = this.stageWidth - 200;
        this.scoreLabel.y = 30;
        this.scoreLabel.textColor = 0xe01717;
    };
    p.createDeadline = function () {
        this.container.addChild(this.deadlineLabel);
        this.setDeadline(this.deadline = 60);
        this.deadlineLabel.x = this.stageWidth / 2 - 100;
        this.deadlineLabel.textColor = 0xffffff;
        this.deadlineLabel.size = 60;
    };
    p.setScore = function (score) {
        this.scoreLabel.text = "Score:" + score;
    };
    p.setDeadline = function (time) {
        if (time == 60) {
            this.deadlineLabel.text = '01:00';
        }
        else {
            if (time <= 9) {
                time = '0' + time;
            }
            this.deadlineLabel.text = "00:" + time;
        }
    };
    P2Scene.getInstance = function (scene, stage) {
        return P2Scene.instance ? P2Scene.instance : new P2Scene(scene, stage);
    };
    p.createDurex = function (event, displayName, another) {
        var display = this.createBitmapByName(displayName, another);
        display.x = Math.random() * (this.stageWidth - 120);
        display.y = Math.random() * (this.stageHeight - 1000);
        // display.y=0;
        var body = new p2.Body({
            mass: 100 * Math.random(),
            // position:[display.x/this.factor,display.y/this.factor],
            position: [display.x / this.factor, display.y / this.factor],
            angle: (180 * Math.random() - 360) * 0.01,
            // velocity: [ 0, Math.random()*50-100],
            // velocity: [ 0, 100],
            force: [0, -100],
            // gravityScale:1*Math.random(),
            density: 10 * Math.random(),
            damping: P2Scene.damping,
            angularVelocity: 10,
            type: this.bodyType,
        });
        body.addShape(new p2.Box({
            width: 84 / this.factor,
            height: 180 / this.factor
        }));
        body.userData = display;
        display.__body = body;
        display.addEventListener(egret.TouchEvent.TOUCH_TAP, event, {
            display: display,
            P2Scene: this
        });
        display.touchEnabled = true;
        this.world.addBody(body);
        this.container.addChild(display);
    };
    p.createGround = function () {
        var planeShape = new p2.Plane({});
        var planeBody = new p2.Body({
            mass: 100,
            position: [0, (this.stageHeight - 100) / this.factor],
            angle: Math.PI
        });
        // planeBody.angle=Math.PI;
        planeBody.addShape(planeShape);
        this.world.addBody(planeBody);
    };
    p.createBitmapByName = function (name, another) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.__textureName = name;
        another && (result.__anotherTextureName = another);
        return result;
    };
    p.loop = function () {
        var i = 0;
        var onTap = function (e) {
            this.display.__body.userData = this.P2Scene.createBitmapByName(this.display.__anotherTextureName);
            this.P2Scene.container.removeChild(this.display);
            this.P2Scene.container.addChild(this.display.__body.userData);
            this.P2Scene.setScore(++P2Scene.score);
        };
        var frame = function (dt) {
            var world = P2Scene.world;
            world.step(dt / 1000);
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            world.bodies.forEach(function (x) {
                var box = x.userData;
                if (box) {
                    box.x = x.position[0] * this.factor;
                    box.y = x.position[1] * this.factor;
                    box.rotation = x.angle;
                }
            }, this);
        };
        egret.Ticker.getInstance().register(frame, this);
        var timer = new egret.Timer(200, 300);
        timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            var n = this.random(1, 3);
            i++;
            if (i % 5 === 0) {
                this.setDeadline(--P2Scene.deadline);
            }
            this.createDurex(onTap, "tt" + n + "_png", "xtt" + n + "_png");
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
            var _this = this;
            egret.Ticker.getInstance().unregister(frame, null);
            TweenMax.to(this.container, 1, {
                x: -1000,
                y: -1000,
                scale: 0,
                opacity: 0,
                rotation: -100,
                ease: Back.easeInOut,
                onComplete: function () {
                    new P3Scene(P3Scene.scene, _this.stage);
                }
            });
        }, this);
        timer.start();
    };
    p.random = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    };
    P2Scene.damping = 0.5;
    P2Scene.gravity = [0, 9];
    P2Scene.world = new p2.World({
        gravity: P2Scene.gravity
    });
    P2Scene.scene = new egret.DisplayObjectContainer;
    P2Scene.score = 0;
    P2Scene.deadline = 60;
    return P2Scene;
}());
egret.registerClass(P2Scene,'P2Scene');
//# sourceMappingURL=p2scene.js.map