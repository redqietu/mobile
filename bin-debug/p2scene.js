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
        this.flag = false;
        this.container = container;
        this.stage = stage;
        this.createScene();
        var bodies = P2Scene.world.bodies.slice();
        bodies.forEach(function (x) {
            P2Scene.world.removeBody(x);
        });
        P2Scene.world.sleepMode = p2.World.BODY_SLEEPING;
        this.createScore();
        this.show(function () { return _this.loop(); });
        this.createDeadline();
        this.createGround();
        P2Scene.stageHeight = egret.MainContext.instance.stage.$stageHeight;
        P2Scene.stageWidth = egret.MainContext.instance.stage.$stageWidth;
    }
    var d = __define,c=P2Scene,p=c.prototype;
    p.createScore = function () {
        this.container.addChild(this.scoreLabel);
        this.setScore(P2Scene.score = 0);
        this.scoreLabel.x = this.stageWidth - 140;
        this.scoreLabel.y = 50;
        this.scoreLabel.textColor = 0xffffff;
    };
    p.createDeadline = function () {
        this.container.addChild(this.deadlineLabel);
        this.setDeadline(this.deadline = P2Scene.TIME);
        this.deadlineLabel.x = this.stageWidth / 2 - 80;
        this.deadlineLabel.y = 30;
        this.deadlineLabel.textColor = 0xffffff;
        this.deadlineLabel.size = 60;
    };
    p.setScore = function (score) {
        this.scoreLabel.text = "\u51FB\u4E2D\uFF1A" + score;
    };
    p.setDeadline = function (time) {
        if (time % 60 == 0) {
            this.deadlineLabel.text = "0" + Math.floor(time / 60) + ":00";
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
        display.x = Math.random() * (this.stageWidth) - 77;
        // display.y=Math.random()*(this.stageHeight-1000);
        display.y = -215;
        // console.log(this.factor)
        var body = new p2.Body({
            mass: 100,
            // position:[display.x/this.factor,display.y/this.factor],
            position: [display.x / this.factor, (this.stageHeight - display.y) / this.factor],
            angle: (180 * Math.random() - 180) * 0.03,
            // velocity: [ 0, Math.random()*50-100],
            // velocity: [ 0, 100],
            velocity: [0, -Math.random() * 40],
            // gravityScale:1*Math.random(),
            // density:10*Math.random(),
            fixedX: true,
            // damping:P2Scene.damping,
            // angularVelocity:Math.random()*50-25,
            type: this.bodyType,
        });
        body.addShape(new p2.Box({
            width: 77 / this.factor,
            height: 215 / this.factor
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
        this.container.swapChildren(display, this.ad);
    };
    p.createGround = function () {
        var planeShape = new p2.Plane({});
        var planeBody = new p2.Body({
            mass: 0,
            position: [0, -1000],
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
        var that = this;
        var onTap = function (e) {
            if (that.flag)
                return;
            this.display.__body.userData = this.P2Scene.createBitmapByName(this.display.__anotherTextureName);
            this.P2Scene.container.removeChild(this.display);
            this.P2Scene.container.addChild(this.display.__body.userData);
            this.P2Scene.setScore(++P2Scene.score);
        };
        var frame = function (dt) {
            if (that.flag)
                return;
            var world = P2Scene.world;
            world.step(dt / 1000);
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            world.bodies.forEach(function (x) {
                var box = x.userData;
                if (box) {
                    box.x = x.position[0] * this.factor;
                    box.y = P2Scene.stageHeight - x.position[1] * this.factor;
                    box.rotation = x.angle;
                }
            }, this);
        };
        var ti = egret.Ticker.getInstance();
        ti.register(frame, this);
        var timer = new egret.Timer(200, P2Scene.TIME * 5);
        timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            var n = this.random(1, 3);
            i++;
            if (i % 5 === 0) {
                this.setDeadline(--P2Scene.deadline);
            }
            this.createDurex(onTap, "tt1_png", "xtt1_png");
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
            document.querySelector('title').innerHTML = "\u606D\u559C\uFF0C\u60A8\u5171\u6458\u5230" + P2Scene.score + "\u6735\u6843\u82B1\uFF0C\u770B\u6765\u8981\u8D70\u6843\u82B1\u8FD0\uFF5E_\u4E00\u732B\u6C7D\u8F66\u7F51";
            ti.unregister(frame, null);
            this.alert(P2Scene.score);
        }, this);
        timer.start();
    };
    p.random = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    };
    p.alert = function (n) {
        var _this = this;
        if (n === void 0) { n = 0; }
        this.flag = true;
        var container = new egret.DisplayObjectContainer;
        this.dialog = this.createBitmapByName('dialog_png');
        container.addChild(this.dialog);
        this.dialog.x = 95;
        this.dialog.y = 338;
        var text1 = new egret.TextField;
        text1.text = "\u606D\u559C\u60A8\u6458\u5230" + n + "\u6735\u6843\u82B1";
        var text2 = new egret.TextField;
        text2.text = '看来您要走桃花运~';
        text1.textAlign = 'center';
        text2.textAlign = 'center';
        text1.width = 686;
        text2.width = 686;
        text1.size = 50;
        text2.size = 50;
        text1.textColor = 0x3fe4db;
        text2.textColor = 0x3fe4db;
        text1.y = 430;
        text2.y = 490;
        text1.x = 32;
        text2.x = 32;
        this.btn_queding = this.createBitmapByName('btn-queding_png');
        this.btn_queding.y = 560;
        this.btn_queding.x = 288;
        container.addChild(this.btn_queding);
        this.btn_queding.touchEnabled = true;
        this.btn_queding.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            TweenMax.to(container, 1, {
                x: -1000,
                y: -1000,
                scale: 0,
                opacity: 0,
                rotation: -100,
                ease: Back.easeInOut,
                onComplete: function () {
                    // this.removeChildren();
                    new P3Scene(P3Scene.scene, _this.stage);
                    P3Scene.scene.x = 0;
                    P3Scene.scene.y = 0;
                    P3Scene.scene.alpha = 1;
                    P3Scene.scene.rotation = 0;
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
        });
        container.addChild(text1);
        container.addChild(text2);
        this.scene.addChild(container);
        container.x = 0;
        container.y = 0;
        TweenMax.from(container, 1, {
            y: 100,
            alpha: 0
        });
    };
    p.createScene = function () {
        // this.stage.removeChild(scene);
        // P2Scene.scene=new egret.DisplayObjectContainer;
        var scene = P2Scene.scene;
        scene.removeChildren();
        scene.x = 0;
        scene.y = 0;
        var bg = this.createBitmapByName('bk-p2_png');
        var ad = this.createBitmapByName('ad_png');
        this.ad = ad;
        bg.x = 0;
        bg.y = 0;
        window.__height = window.__height || this.stage.height;
        bg.height = window.__height - 240;
        ad.x = 0;
        ad.y = window.__height - 240;
        ad.width = 750;
        ad.height = 240;
        this.ad.touchEnabled = true;
        this.ad.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            btn4();
            document.location.href = 'http://yuehui.m.emao.com';
        }, this);
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
        mask.graphics.drawRect(0, 0, this.stage.width, window.__height - 240);
        mask.graphics.endFill();
        scene.addChild(bg);
        scene.addChild(ad);
        scene.addChild(mask);
        scene.swapChildren(mask, this.ad);
        scene.addChild(djs1);
        scene.addChild(djs2);
        scene.addChild(djs3);
        this.stage.addChild(scene);
        this.stage.setChildIndex(scene, scene.numChildren - 3);
        this.mask = mask;
        this.djs1 = djs1;
        this.djs2 = djs2;
        this.djs3 = djs3;
    };
    p.show = function (onComplete) {
        var scene = this.scene;
        var mask = this.mask;
        var djs1 = this.djs1;
        var djs2 = this.djs2;
        var djs3 = this.djs3;
        var timeline = new TimelineMax({
            onComplete: function () {
                onComplete();
            },
        });
        timeline.fromTo(mask, 0.2, {
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
    P2Scene.gravity = [0, -2];
    P2Scene.world = new p2.World({
        gravity: P2Scene.gravity
    });
    P2Scene.scene = new egret.DisplayObjectContainer;
    P2Scene.score = 0;
    P2Scene.TIME = 30;
    P2Scene.deadline = P2Scene.TIME;
    return P2Scene;
}());
egret.registerClass(P2Scene,'P2Scene');
//# sourceMappingURL=p2scene.js.map