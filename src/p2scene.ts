class P2Scene{
    private static instance:P2Scene;
    private static damping:number=0.5;
    private static gravity:[number,number]=[0,-2];
    private static world:p2.World=new p2.World({
            gravity:P2Scene.gravity
        });
    private stage;
    static scene=new egret.DisplayObjectContainer;
    private scene=P2Scene.scene;
    static score:number=0;
    static TIME:number=30;
    static deadline:number=P2Scene.TIME;
    private bodyType=p2.Body.DYNAMIC;
    private world=P2Scene.world;    
    private container:egret.DisplayObjectContainer;
    private factor:number=50;
    private stageWidth=egret.MainContext.instance.stage.stageWidth;
    private stageHeight=egret.MainContext.instance.stage.stageHeight;
    static stageWidth;
    static stageHeight;
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
        P2Scene.stageHeight=egret.MainContext.instance.stage.$stageHeight;
        P2Scene.stageWidth=egret.MainContext.instance.stage.$stageWidth;
    }
    private createScore(){
        
        this.container.addChild(this.scoreLabel);
        this.setScore(P2Scene.score=0);
        this.scoreLabel.x=this.stageWidth-140;
        this.scoreLabel.y=50;
        this.scoreLabel.textColor=0xffffff;
    }
    private createDeadline(){
        this.container.addChild(this.deadlineLabel);
        this.setDeadline(this.deadline=P2Scene.TIME);
        this.deadlineLabel.x=this.stageWidth/2-80;
        this.deadlineLabel.y=30;
        this.deadlineLabel.textColor=0xffffff;
        this.deadlineLabel.size=60;
    }
    setScore(score){
        this.scoreLabel.text=`击中：${score}`;
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
        display.x=Math.random()*(this.stageWidth)-77;
        // display.y=Math.random()*(this.stageHeight-1000);
        display.y=-215;
        // console.log(this.factor)
        var body=new p2.Body({ 
            mass:100,
            // position:[display.x/this.factor,display.y/this.factor],
            position:[display.x/this.factor,(this.stageHeight-display.y)/this.factor],
            angle:(180*Math.random()-180)*0.03,
            // velocity: [ 0, Math.random()*50-100],
            // velocity: [ 0, 100],
            velocity:[0,-Math.random()*40],
            // gravityScale:1*Math.random(),
            // density:10*Math.random(),
            fixedX:true,
            // damping:P2Scene.damping,
            // angularVelocity:Math.random()*50-25,
            type:this.bodyType,
        });
        body.addShape(new p2.Box({
            width:77/this.factor,
            height:215/this.factor
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
        this.container.swapChildren(display,this.ad);
    }

    private createGround(){        
        var planeShape:p2.Plane = new p2.Plane({
        });
        var planeBody:p2.Body = new p2.Body({
            mass:0,
            position:[0,-1000],
            // angle:Math.PI
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
        var that=this
        let onTap=function (e){
            if(that.flag)return;
            this.display.__body.userData=this.P2Scene.createBitmapByName(this.display.__anotherTextureName);
            this.P2Scene.container.removeChild(this.display);
            this.P2Scene.container.addChild(this.display.__body.userData);
            this.P2Scene.setScore(++P2Scene.score);
        }
        let frame=function(dt) {
            if(that.flag)return;
            let world=P2Scene.world;
            world.step(dt / 1000);
            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            world.bodies.forEach(function(x:p2.Body){
                var box: egret.DisplayObject = x.userData;
                if (box) {
                    box.x = x.position[0]*this.factor;
                    box.y = P2Scene.stageHeight-x.position[1]*this.factor;
                    box.rotation=x.angle;
                }
            },this);
        };
       var ti=egret.Ticker.getInstance();
       ti.register(frame, this); 
       var timer=new  egret.Timer(200,P2Scene.TIME*5);
       timer.addEventListener(egret.TimerEvent.TIMER,function(e){
            let n=this.random(1,3);
            i++;
            if(i%5===0){
                this.setDeadline(--P2Scene.deadline);
            }
            this.createDurex(onTap,`tt1_png`,`xtt1_png`);
       },this);
       timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(e){
            document.querySelector('title').innerHTML=`恭喜，您共摘到${P2Scene.score}朵桃花，看来要走桃花运～_一猫汽车网`;
            ti.unregister(frame,null);
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
        this.dialog.x=95;
        this.dialog.y=338;
        let text1=new egret.TextField;
        text1.text=`恭喜您摘到${n}朵桃花`;
        let text2=new egret.TextField;
        text2.text='看来您要走桃花运~';
        text1.textAlign='center';
        text2.textAlign='center';
        text1.width=686;
        text2.width=686;
        text1.size=50;
        text2.size=50;
        text1.textColor=0xffbdcf;
        text2.textColor=0xffbdcf;
        text1.y=430;
        text2.y=490;
        text1.x=32;
        text2.x=32;
        this.btn_queding=this.createBitmapByName('btn-queding_png');
        this.btn_queding.y=560;
        this.btn_queding.x=288;
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
        var ad:egret.Bitmap=this.createBitmapByName('ad_png');
        this.ad=ad;
        bg.x=0;
        bg.y=0;
        window.__height=window.__height||this.stage.height;
        bg.height=window.__height-240;

        ad.x=0;
        ad.y=window.__height-240;
        ad.width=750;
        ad.height=240;
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
        mask.graphics.drawRect(0,0,this.stage.width,window.__height-240);
        mask.graphics.endFill();
        scene.addChild(bg);
        scene.addChild(ad);
        scene.addChild(mask);
        scene.swapChildren(mask,this.ad);
        scene.addChild(djs1);
        scene.addChild(djs2);
        scene.addChild(djs3);

        this.stage.addChild(scene);
        this.stage.setChildIndex(scene, scene.numChildren-3);
        this.mask=mask;
        this.djs1=djs1;
        this.djs2=djs2;
        this.djs3=djs3;

    }

    private show(onComplete){
        var scene=this.scene;
        var mask=this.mask;
        var djs1=this.djs1;
        var djs2=this.djs2;
        var djs3=this.djs3;
        var timeline=new TimelineMax({
            onComplete: ()=>{
                onComplete();
            },
        });

        timeline.fromTo(mask,0.2,{
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