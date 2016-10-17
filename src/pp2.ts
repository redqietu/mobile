class Pp2{
    static world:p2.World=new p2.World({
            gravity:[0,-9.82]
        });
    container:egret.DisplayObjectContainer;
    constructor(container:egret.DisplayObjectContainer){
        this.container=container;
        Pp2.world.sleepMode = p2.World.BODY_SLEEPING;
        var display=this.createBitmapByName('tt3_png');
        var body=this.createRect(display);
        var planeShape:p2.Plane = new p2.Plane();
        var planeBody:p2.Body = new p2.Body();
        planeBody.addShape(planeShape);
        Pp2.world.addBody(planeBody);
        planeBody.displays=[];
        planeBody.position=[100,100]
        Pp2.world.addBody(body);
        Pp2.world.addBody(body);
        display.x=0;
        display.y=0;
        this.container.addChild(display);
        this.loop();
    }
    createRect(display){
        var body=new p2.Body({ mass: 1,
             position:[0,10]
        });
        body.addShape(new p2.Box({
            width:3,
            height:3
        }));
        body.displays=[display];
        return body;
    }
    createBitmapByName(name){
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;        
    }
    loop(){
       egret.Ticker.getInstance().register(function(dt) {
           let factor=40;
           let world=Pp2.world;
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            world.step(dt / 1000);

            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            for (var i: number = 0; i < l; i++) {
                var boxBody: p2.Body = world.bodies[i];
                var box: egret.Bitmap = boxBody.displays[0];
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
    }
}