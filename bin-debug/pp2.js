var Pp2 = (function () {
    function Pp2(container) {
        this.container = container;
        Pp2.world.sleepMode = p2.World.BODY_SLEEPING;
        var display = this.createBitmapByName('tt3_png');
        var body = this.createRect(display);
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body();
        planeBody.addShape(planeShape);
        Pp2.world.addBody(planeBody);
        planeBody.displays = [];
        planeBody.position = [100, 100];
        Pp2.world.addBody(body);
        Pp2.world.addBody(body);
        display.x = 0;
        display.y = 0;
        this.container.addChild(display);
        this.loop();
    }
    var d = __define,c=Pp2,p=c.prototype;
    p.createRect = function (display) {
        var body = new p2.Body({ mass: 1,
            position: [0, 10]
        });
        body.addShape(new p2.Box({
            width: 3,
            height: 3
        }));
        body.displays = [display];
        return body;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.loop = function () {
        egret.Ticker.getInstance().register(function (dt) {
            var factor = 40;
            var world = Pp2.world;
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            world.step(dt / 1000);
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            for (var i = 0; i < l; i++) {
                var boxBody = world.bodies[i];
                var box = boxBody.displays[0];
                if (box) {
                    box.x = boxBody.position[0] * factor;
                    box.y = boxBody.position[1];
                    box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
                    if (boxBody.sleepState == p2.Body.SLEEPING) {
                        box.alpha = 0.5;
                    }
                    else {
                        box.alpha = 1;
                    }
                }
            }
        }, this);
    };
    Pp2.world = new p2.World({
        gravity: [0, -9.82]
    });
    return Pp2;
}());
egret.registerClass(Pp2,'Pp2');
//# sourceMappingURL=pp2.js.map