class P2App{
    static world:p2.World=new p2.World({
            gravity:[0,0.6]
        });
    world=P2App.world;    
    container:egret.DisplayObjectContainer;
    factor:number=50;
    stageWidth=egret.MainContext.instance.stage.stageWidth;
    stageHeight=egret.MainContext.instance.stage.stageHeight;
    constructor(container:egret.DisplayObjectContainer){
        this.container=container;
        P2App.world.sleepMode = p2.World.BODY_SLEEPING;
        this.createGround();
        this.loop();
    }
    createDurex(displayName){
        var display=this.createBitmapByName(displayName);
        
        display.x=Math.random()*(this.stageWidth-84);
        display.y=0;
        var body=new p2.Body({ 
            mass:100*Math.random(),
            position:[display.x/this.factor,display.y/this.factor],
            // angle:180*Math.random()-360,
            velocity: [ 0, Math.random()*50-100],
            force:[0,-1000],
            // gravityScale:1*Math.random(),
            density:10*Math.random()
        });
        body.addShape(new p2.Box({
            width:84/this.factor,
            height:180/this.factor
        }));
        body.userData=display;
        this.world.addBody(body);
        this.container.addChild(display);
    }
    createGround(){
        var planeShape:p2.Plane = new p2.Plane({
        });
        var planeBody:p2.Body = new p2.Body({
            
            position:[0,1]
        });
        planeBody.addShape(planeShape);
        this.world.addBody(planeBody);
    }
    createBitmapByName(name){
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;        
    }
    loop(){
        let frame=function(dt) {
            let world=P2App.world;
            world.step(dt / 1000);

            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            world.bodies.forEach(function(x:p2.Body){
                var box: egret.DisplayObject = x.userData;
                if (box) {
                    box.x = x.position[0]*this.factor;
                    box.y = x.position[1]*this.factor;
                    box.rotation=x.angle;
                }
            },this);
        };
       egret.Ticker.getInstance().register(frame, this); 
        var timer=new  egret.Timer(200,300);
        timer.addEventListener(egret.TimerEvent.TIMER,function(e){
            this.createDurex('tt3_png');
        },this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(e){
            egret.Ticker.getInstance().unregister(frame,null);
        },this);
        timer.start();
    }
}