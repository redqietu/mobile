class P2Scene{
    private static instance:P2Scene;
    private static damping:number=0.5;
    private static gravity:[number,number]=[0,9];
    private static world:p2.World=new p2.World({
            gravity:P2Scene.gravity
        });
    private stage;
    static scene=new egret.DisplayObjectContainer;
    private scene=P2Scene.scene;
    static score:number=0;
    static TIME:number=2;
    static deadline:number=P2Scene.TIME;
    private bodyType=p2.Body.DYNAMIC;
    private world=P2Scene.world;    
    private container:egret.DisplayObjectContainer;
    private factor:number=50;
    private stageWidth=egret.MainContext.instance.stage.stageWidth;
    private stageHeight=egret.MainContext.instance.stage.stageHeight;
    private scoreLabel=new egret.TextField;
    private deadlineLabel=new egret.TextField;
    private car;
    private mask;
    private djs1;
    private djs2;
    private djs3;
    private dialog;
    private btn_queding;
    private flag=false;

    constructor(container:egret.DisplayObjectContainer,stage){
        this.container=container;
        this.stage=stage;
        this.createScene();
        var bodies=[...P2Scene.world.bodies];
        bodies.forEach((x)=>{
            P2Scene.world.removeBody(x);
        })
        P2Scene.world.sleepMode = p2.World.BODY_SLEEPING;
        this.createScore();
        this.show(()=>this.loop());
        this.createDeadline();
        this.createGround();
    }
    private createScore(){
        
        this.container.addChild(this.scoreLabel);
        this.setScore(P2Scene.score=0);
        this.scoreLabel.x=this.stageWidth-60;
        this.scoreLabel.y=30;
        this.scoreLabel.textColor=0xe01717;
    }
    private createDeadline(){
        this.container.addChild(this.deadlineLabel);
        this.setDeadline(this.deadline=P2Scene.TIME);
        this.deadlineLabel.x=this.stageWidth/2-80;
        this.deadlineLabel.textColor=0xffffff;
        this.deadlineLabel.size=60;
    }
    setScore(score){
        this.scoreLabel.text=`${score}`;
    }
    setDeadline(time){
        if(time%60==0){
            this.deadlineLabel.text=`0${Math.floor(time/60)}:00`;
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

        var planeShape2:p2.Plane = new p2.Box({
            width:1,
            height:1000000
        });
        var planeBody2:p2.Body = new p2.Body({
            mass:10000,
            position:[0,0],
            type:this.bodyType
        });
        planeBody2.addShape(planeShape2);
        this.world.addBody(planeBody2);

        
        var planeShape3:p2.Plane = new p2.Box({
            width:1,
            height:1000000
        });
        var planeBody3:p2.Body = new p2.Body({
            mass:10000,
            position:[(this.stageWidth)/this.factor,0],
            type:this.bodyType
        });
        planeBody3.addShape(planeShape3);
        this.world.addBody(planeBody3);

        
        var planeShape:p2.Plane = new p2.Plane({
        });
        var planeBody:p2.Body = new p2.Body({
            mass:0,
            position:[0,(this.stageHeight+1000)/this.factor],
            angle:Math.PI
        });
        planeBody.angle=Math.PI;
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
        var that=this
        let onTap=function (e){
            if(that.flag)return;
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
        var timer=new  egret.Timer(200,P2Scene.TIME*5);
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
            this.alert(P2Scene.score);
        },this);
        timer.start();
    }

    private random(Min,Max){   
        var Range = Max - Min;   
        var Rand = Math.random();   
        return(Min + Math.round(Rand * Range));   
    }

    private alert(n=0){
        this.flag=true;
        var container=new egret.DisplayObjectContainer;
        this.dialog=this.createBitmapByName('dialog_png');
        container.addChild(this.dialog);
        this.dialog.x=27;
        this.dialog.y=370;
        let text1=new egret.TextField;
        text1.text=`恭喜，您成功扎破了${n}个套`;
        let text2=new egret.TextField;
        text2.text='让他们喜当爹';
        text1.textAlign='center';
        text2.textAlign='center';
        text1.width=686;
        text2.width=686;
        text1.size=50;
        text2.size=50;
        text1.textColor=0x000;
        text2.textColor=0x000;
        text1.y=445;
        text2.y=503;
        text1.x=32;
        text2.x=32;
        this.btn_queding=this.createBitmapByName('btn-queding_png');
        this.btn_queding.y=616;
        this.btn_queding.x=136;
        container.addChild(this.btn_queding);
        this.btn_queding.touchEnabled=true;
        this.btn_queding.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            TweenMax.to(container,1,{
                    x:-1000,
                    y:-1000,
                    scale:0,
                    opacity:0,
                    rotation:-100,
                    ease: Back.easeInOut,
                    onComplete:()=>{
                        // this.removeChildren();
                        new P3Scene(P3Scene.scene,this.stage);
                        P3Scene.scene.x=0;
                        P3Scene.scene.y=0;
                        P3Scene.scene.alpha=1;
                        P3Scene.scene.rotation=0;
                        TweenMax.from(P3Scene.scene,0.8,{
                            x:-100,
                            y:-100,
                            scale:0.4,
                            alpha:0,
                            rotation:-100,
                            ease: Back.easeInOut,
                            yoyo:true
                        })
                    }
            });
        });
        container.addChild(text1);
        container.addChild(text2);
        this.scene.addChild(container);
        container.x=0;
        container.y=0;
        TweenMax.from(container,1,{
            y:100,
            alpha:0
        })
    }

    private createScene(){
        
        // this.stage.removeChild(scene);
        // P2Scene.scene=new egret.DisplayObjectContainer;
        var scene:egret.DisplayObjectContainer=P2Scene.scene;
        scene.removeChildren();
        scene.x=0;
        scene.y=0;
        var bg:egret.Bitmap=this.createBitmapByName('bk-p2_png');
        var car:egret.Bitmap=this.createBitmapByName('car_png');
        var mask:egret.Shape=new egret.Shape();
        var [djs1,djs2,djs3]=[
            this.createBitmapByName('n3_png'),
            this.createBitmapByName('n2_png'),
            this.createBitmapByName('n1_png'),
        ];
        djs1.x=370;
        djs1.y=499;
        djs2.x=370;
        djs2.y=499;
        djs3.x=370;
        djs3.y=499;
        djs1.anchorOffsetX=43;
        djs1.anchorOffsetY=43;
        djs2.anchorOffsetX=43;
        djs2.anchorOffsetY=43;
        djs3.anchorOffsetX=43;
        djs3.anchorOffsetY=43;
        
        
        mask.graphics.beginFill(0x000,1);
        mask.graphics.drawRect(0,0,this.stage.width,this.stage.height);
        mask.graphics.endFill();
        scene.addChild(bg);
        scene.addChild(car);
        scene.addChild(mask);
        scene.addChild(djs1);
        scene.addChild(djs2);
        scene.addChild(djs3);

        this.stage.addChild(scene);
        this.car=car;
        this.mask=mask;
        this.djs1=djs1;
        this.djs2=djs2;
        this.djs3=djs3;

    }

    private show(onComplete){
        var scene=this.scene;
        var car=this.car;
        var mask=this.mask;
        var djs1=this.djs1;
        var djs2=this.djs2;
        var djs3=this.djs3;
        var timeline=new TimelineMax({
            onComplete: ()=>{
                onComplete();
            },
        });
        scene.anchorOffsetX=this.stage.width/2;
        scene.anchorOffsetY=this.stage.height/2;

        timeline.fromTo(scene,0.8,{
            x: 0,
            y: 0,
            alpha: 0.1,
            // rotation: 100,
            ease: Back.easeOut,
            scaleX:9,
            scaleY:9,
        },{
            x: 0,
            y: 0,
            // rotation: 0,
            alpha: 1,
            // ease: SlowMo.ease.config(0.1, 0.9)
            ease: Back.easeInOut,
            scaleX:9,
            scaleY:9,
        }).fromTo(scene,1,{
            scaleX:9,
            scaleY:9,
        },{
            scaleX:1,
            scaleY:1,
            anchorOffsetX:0,
            anchorOffsetY:0,
        }).fromTo(car,1,{
            x:-400,
            y:40
        },{
           x:0,
           y:0 
        }).fromTo(mask,0.2,{
            alpha:0
        },{
            alpha:0.7
        }).staggerFromTo([djs1,djs2,djs3],1,{
            alpha:0,
            scaleX:1.6,
            scaleY:1.6,
            ease:Power4.easeInOut
        },{
            alpha:1,
            scaleX:0.6,
            scaleY:0.6,
            ease:Power4.easeInOut, 
            onComplete: function() {
                TweenMax.to(this.target, 0.2, {
                    alpha:0,
                    onComplete:function(){
                        scene.removeChild(this.target);
                    }
                });
            },
        },1);
    }
}