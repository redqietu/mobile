class P2Scene{
    private static instance:P2Scene;
    private static damping:number=0.5;
    private static gravity:[number,number]=[0,9];
    private static world:p2.World=new p2.World({
            gravity:P2Scene.gravity
        });
    private stage;
    static score:number=0;
    static deadline:number=60;
    private bodyType=p2.Body.DYNAMIC;
    private world=P2Scene.world;    
    private container:egret.DisplayObjectContainer;
    private factor:number=50;
    private stageWidth=egret.MainContext.instance.stage.stageWidth;
    private stageHeight=egret.MainContext.instance.stage.stageHeight;
    private scoreLabel=new egret.TextField;
    private deadlineLabel=new egret.TextField;

    constructor(container:egret.DisplayObjectContainer,stage){
        this.container=container;
        this.stage=stage;
        P2Scene.world.sleepMode = p2.World.BODY_SLEEPING;
        this.createScore();
        this.createDeadline();
        this.createGround();
        this.loop();
    }
    private createScore(){
        
        this.container.addChild(this.scoreLabel);
        this.setScore(P2Scene.score=0);
        this.scoreLabel.x=this.stageWidth-200;
        this.scoreLabel.y=30;
        this.scoreLabel.textColor=0xe01717;
    }
    private createDeadline(){
        this.container.addChild(this.deadlineLabel);
        this.setDeadline(this.deadline=60);
        this.deadlineLabel.x=this.stageWidth/2-100;
        this.deadlineLabel.textColor=0xffffff;
        this.deadlineLabel.size=60;
    }
    setScore(score){
        this.scoreLabel.text=`Score:${score}`;
    }
    setDeadline(time){
        if(time==60){
            this.deadlineLabel.text='01:00';
        }else{
            if(time<=9){
                time='0'+time;
            }
            this.deadlineLabel.text=`00:${time}`;
        }
    }
    static getInstance(scene,stage){
        return P2Scene.instance?P2Scene.instance:new P2Scene(scene,stage);
    }

    private createDurex(event,displayName,another){
        var display=this.createBitmapByName(displayName,another);
        display.x=Math.random()*(this.stageWidth-120);
        display.y=Math.random()*(this.stageHeight-1000);
        // display.y=0;
        var body=new p2.Body({ 
            mass:100*Math.random(),
            // position:[display.x/this.factor,display.y/this.factor],
            position:[display.x/this.factor,display.y/this.factor],
            angle:(180*Math.random()-360)*0.01,
            // velocity: [ 0, Math.random()*50-100],
            // velocity: [ 0, 100],
            force:[0,-100],
            // gravityScale:1*Math.random(),
            density:10*Math.random(),
            damping:P2Scene.damping,
            angularVelocity:10,
            type:this.bodyType,
        });
        body.addShape(new p2.Box({
            width:84/this.factor,
            height:180/this.factor
        }));
        body.userData=display;
        (<egret.Bitmap>display).__body=body;
        display.addEventListener(egret.TouchEvent.TOUCH_TAP,event,{
            display:display,
            P2Scene:this
        });
        display.touchEnabled=true;
        this.world.addBody(body);
        this.container.addChild(display);
    }

    private createGround(){
        var planeShape:p2.Plane = new p2.Plane({
        });
        var planeBody:p2.Body = new p2.Body({
            mass:100,
            position:[0,(this.stageHeight-100)/this.factor],
            angle:Math.PI
        });
        // planeBody.angle=Math.PI;
        planeBody.addShape(planeShape);
        this.world.addBody(planeBody);
    }

    private createBitmapByName(name,another?:any){
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.__textureName=name;
        another&&(result.__anotherTextureName=another);
        
        return result;        
    }

    private loop(){
        let i=0;
        let onTap=function (e){
            this.display.__body.userData=this.P2Scene.createBitmapByName(this.display.__anotherTextureName);
            this.P2Scene.container.removeChild(this.display);
            this.P2Scene.container.addChild(this.display.__body.userData);
            this.P2Scene.setScore(++P2Scene.score);
        }
        let frame=function(dt) {
            let world=P2Scene.world;
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
            let n=this.random(1,3);
            i++;
            if(i%5===0){
                this.setDeadline(--P2Scene.deadline);
            }
            this.createDurex(onTap,`tt${n}_png`,`xtt${n}_png`);
        },this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(e){
            egret.Ticker.getInstance().unregister(frame,null);
            TweenMax.to(this.container,1,{
                    x:-1000,
                    y:-1000,
                    scale:0,
                    opacity:0,
                    rotation:-100,
                    ease: Back.easeInOut,
                    onComplete:()=>{
                        new P3Scene(P3Scene.scene,this.stage);
                    }
                })
        },this);
        timer.start();
    }

    private random(Min,Max){   
        var Range = Max - Min;   
        var Rand = Math.random();   
        return(Min + Math.round(Rand * Range));   
    }
}