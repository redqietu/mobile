var P2Scene = (function () {
    function P2Scene(container, stage) {
        var _this = this;
        this.scene = P2Scene.scene;
        this.bodyType = p2.Body.DYNAMIC;
        this.world = P2Scene.world;
        this.factor = 50;
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.scoreLabel = new egret.TextField;
        this.deadlineLabel = new egret.TextField;
        this.container = container;
        this.stage = stage;
        this.createScene();
        P2Scene.world.sleepMode = p2.World.BODY_SLEEPING;
        this.createScore();
        this.show(function () { return _this.loop(); });
        this.createDeadline();
        this.createGround();
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
        this.setDeadline(this.deadline = P2Scene.TIME);
        this.deadlineLabel.x = this.stageWidth / 2 - 80;
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
        var timer = new egret.Timer(200, P2Scene.TIME * 5);
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
                    TweenMax.from(P3Scene.scene, 0.8, {
                        x: -100,
                        y: -100,
                        scale: 0.4,
                        alpha: 0,
                        rotation: -100,
                        ease: Back.easeInOut,
                        yoyo: true
                    });
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
    p.createScene = function () {
        // this.stage.removeChild(scene);
        // P2Scene.scene=new egret.DisplayObjectContainer;
        var scene = P2Scene.scene;
        scene.removeChildren();
        scene.x = 0;
        scene.y = 0;
        var bg = this.createBitmapByName('bk-p2_png');
        var car = this.createBitmapByName('car_png');
        var mask = new egret.Shape();
        var _a = [
            this.createBitmapByName('n3_png'),
            this.createBitmapByName('n2_png'),
            this.createBitmapByName('n1_png'),
        ], djs1 = _a[0], djs2 = _a[1], djs3 = _a[2];
        djs1.x = 370;
        djs1.y = 499;
        djs2.x = 370;
        djs2.y = 499;
        djs3.x = 370;
        djs3.y = 499;
        djs1.anchorOffsetX = 43;
        djs1.anchorOffsetY = 43;
        djs2.anchorOffsetX = 43;
        djs2.anchorOffsetY = 43;
        djs3.anchorOffsetX = 43;
        djs3.anchorOffsetY = 43;
        mask.graphics.beginFill(0x000, 1);
        mask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
        mask.graphics.endFill();
        scene.addChild(bg);
        scene.addChild(car);
        scene.addChild(mask);
        scene.addChild(djs1);
        scene.addChild(djs2);
        scene.addChild(djs3);
        this.stage.addChild(scene);
        this.car = car;
        this.mask = mask;
        this.djs1 = djs1;
        this.djs2 = djs2;
        this.djs3 = djs3;
    };
    p.show = function (onComplete) {
        var scene = this.scene;
        var car = this.car;
        var mask = this.mask;
        var djs1 = this.djs1;
        var djs2 = this.djs2;
        var djs3 = this.djs3;
        var timeline = new TimelineMax({
            onComplete: function () {
                onComplete();
            },
        });
        scene.anchorOffsetX = this.stage.width / 2;
        scene.anchorOffsetY = this.stage.height / 2;
        timeline.fromTo(scene, 1.4, {
            x: 0,
            y: 0,
            alpha: 0,
            // rotation: 100,
            ease: Back.easeOut,
            scaleX: 9,
            scaleY: 9
        }, {
            x: 0,
            y: 0,
            // rotation: 0,
            alpha: 1,
            // ease: SlowMo.ease.config(0.1, 0.9)
            ease: Back.easeInOut,
            scaleX: 9,
            scaleY: 9,
        }).fromTo(scene, 1, {
            scaleX: 9,
            scaleY: 9,
        }, {
            scaleX: 1,
            scaleY: 1,
            anchorOffsetX: 0,
            anchorOffsetY: 0,
        }).fromTo(car, 1, {
            x: -400,
            y: 40
        }, {
            x: 0,
            y: 0
        }).fromTo(mask, 0.2, {
            alpha: 0
        }, {
            alpha: 0.7
        }).staggerFromTo([djs1, djs2, djs3], 1, {
            alpha: 0,
            scaleX: 1.6,
            scaleY: 1.6,
            ease: Power4.easeInOut
        }, {
            alpha: 1,
            scaleX: 0.6,
            scaleY: 0.6,
            ease: Power4.easeInOut,
            onComplete: function () {
                TweenMax.to(this.target, 0.2, {
                    alpha: 0,
                    onComplete: function () {
                        scene.removeChild(this.target);
                    }
                });
            },
        }, 1);
    };
    P2Scene.damping = 0.5;
    P2Scene.gravity = [0, 9];
    P2Scene.world = new p2.World({
        gravity: P2Scene.gravity
    });
    P2Scene.scene = new egret.DisplayObjectContainer;
    P2Scene.score = 0;
    P2Scene.TIME = 2;
    P2Scene.deadline = P2Scene.TIME;
    return P2Scene;
}());
egret.registerClass(P2Scene,'P2Scene');
//# sourceMappingURL=p2scene.js.map