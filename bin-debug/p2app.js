var P2App = (function () {
    function P2App(container) {
        this.world = P2App.world;
        this.factor = 50;
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.container = container;
        P2App.world.sleepMode = p2.World.BODY_SLEEPING;
        this.createGround();
        this.loop();
    }
    var d = __define,c=P2App,p=c.prototype;
    p.createDurex = function (displayName) {
        var display = this.createBitmapByName(displayName);
        display.x = Math.random() * (this.stageWidth - 84);
        display.y = 0;
        var body = new p2.Body({
            mass: 100 * Math.random(),
            position: [display.x / this.factor, display.y / this.factor],
            // angle:180*Math.random()-360,
            velocity: [0, Math.random() * 50 - 100],
            force: [0, -1000],
            // gravityScale:1*Math.random(),
            density: 10 * Math.random()
        });
        body.addShape(new p2.Box({
            width: 84 / this.factor,
            height: 180 / this.factor
        }));
        body.userData = display;
        this.world.addBody(body);
        this.container.addChild(display);
    };
    p.createGround = function () {
        var planeShape = new p2.Plane({});
        var planeBody = new p2.Body({
            position: [0, 1]
        });
        planeBody.addShape(planeShape);
        this.world.addBody(planeBody);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.loop = function () {
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
            this.createDurex('tt3_png');
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
            egret.Ticker.getInstance().unregister(frame, null);
        }, this);
        timer.start();
    };
    P2App.world = new p2.World({
        gravity: [0, 0.6]
    });
    return P2App;
}());
egret.registerClass(P2App,'P2App');
//# sourceMappingURL=p2app.js.map