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
        Pp2.world.addBody(body);
        this.container.addChild(display);
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
}