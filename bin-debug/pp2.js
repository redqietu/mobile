var Pp2 = (function () {
    function Pp2(container) {
        this.container = container;
        Pp2.world.sleepMode = p2.World.BODY_SLEEPING;
        var display = this.createBitmapByName('tt3_png');
        alert(3);
        var body = this.createRect(display);
        Pp2.world.addBody(body);
        this.container.addChild(display);
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
    Pp2.world = new p2.World({
        gravity: [0, -9.82]
    });
    return Pp2;
}());
egret.registerClass(Pp2,'Pp2');
//# sourceMappingURL=pp2.js.map