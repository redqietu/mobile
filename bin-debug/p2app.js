var P2App = (function () {
    function P2App(container) {
        this.bodyType = p2.Body.DYNAMIC;
        this.world = P2App.world;
        this.factor = 50;
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.scoreLabel = new egret.TextField;
        this.deadlineLabel = new egret.TextField;
        this.container = container;
        P2App.world.sleepMode = p2.World.BODY_SLEEPING;
        this.createScore();
        this.createDeadline();
        this.createGround();
        this.loop();
    }
    var d = __define,c=P2App,p=c.prototype;
    p.createScore = function () {
        this.container.addChild(this.scoreLabel);
        this.setScore(P2App.score = 0);
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
    P2App.getInstance = function (scene) {
        return P2App.instance ? P2App.instance : new P2App(scene);
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
            damping: P2App.damping,
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
            p2app: this
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
            this.display.__body.userData = this.p2app.createBitmapByName(this.display.__anotherTextureName);
            this.p2app.container.removeChild(this.display);
            this.p2app.container.addChild(this.display.__body.userData);
            this.p2app.setScore(++P2App.score);
        };
        var frame = function (dt) {
            var world = P2App.world;
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
                this.setDeadline(--P2App.deadline);
            }
            this.createDurex(onTap, "tt" + n + "_png", "xtt" + n + "_png");
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
            egret.Ticker.getInstance().unregister(frame, null);
            // this.setDeadline(--P2App.deadline);
        }, this);
        timer.start();
    };
    p.random = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    };
    P2App.damping = 0.5;
    P2App.gravity = [0, 9];
    P2App.world = new p2.World({
        gravity: P2App.gravity
    });
    P2App.score = 0;
    P2App.deadline = 60;
    return P2App;
}());
egret.registerClass(P2App,'P2App');
//# sourceMappingURL=p2app.js.map