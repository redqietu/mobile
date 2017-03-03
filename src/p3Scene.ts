class P3Scene{
    private static instance:P3Scene;
    static getInstance(scene,stage){
        return P3Scene.instance?P3Scene.instance:new P3Scene(scene,stage);
    }
    constructor(scene:egret.DisplayObjectContainer,stage:egret.DisplayObjectContainer){
        this.cst(scene,stage);
        this.init();
        this.createView();
        this.bindEvent();
    }
    private cst(scene:egret.DisplayObjectContainer,stage:egret.DisplayObjectContainer){
        this.scene=scene;
        this.stage=stage;
        this.stageWidth=this.stage.stageWidth;
        this.stageHeight=this.stage.stageHeight;
    }
    private init(){
        // this.stage.scaleMode=egret.StageScaleMode.EXACT_FIT;
        this.stage.addChild(this.scene);

        
    }
    static scene:egret.DisplayObjectContainer=new egret.DisplayObjectContainer;
    private scene;
    private stage;
    private stageWidth;
    private stageHeight;

    private btn1;
    private btn2;
    private btn3;
    private logo;
    private createLayer(e){
        var ct=new egret.DisplayObjectContainer;
        this.stage.addChild(ct);
        var shape=new egret.Shape;
        shape.graphics.beginFill(0x000,1);
        shape.graphics.drawRect(0,0,this.stageWidth,this.stageHeight);
        shape.graphics.endFill();
        shape.alpha=0.8;
        ct.addChild(shape);
        ct.touchEnabled=true;
        ct.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            
        },ct,false);

        var share=this.createBitmapByName('layer-share_png');
        share.x=0;
        share.y=0;

        var close=this.createBitmapByName('btn-close_png');
        close.x=23;
        close.y=22;
        ct.addChild(close);
        ct.addChild(share);

        
        close.touchEnabled=true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            this.stage.removeChild(ct);
        },ct,false);
    }

    private createView(){
        
        var bg1:egret.Bitmap=this.createBitmapByName('bk-dian_png');
        
        var bg2:egret.Shape=new egret.Shape;
        bg2.graphics.beginFill(0x89c6ee,1);
        bg2.graphics.drawRect(0,0,this.stageWidth,this.stageHeight);
        bg2.graphics.endFill();

        this.scene.addChild(bg2);
        

        this.scene.addChild(bg1);

        var xinzhi:egret.Bitmap=this.createBitmapByName('xinzhi_png');
        this.scene.addChild(xinzhi);

        var logo:egret.Bitmap=this.createBitmapByName('icon-emao_png');
        // this.scene.addChild(logo);
        logo.y=22;
        logo.x=29;
        this.logo=logo;

        
        var ad:egret.Bitmap=this.createBitmapByName('ad_png');
        this.ad=ad;
        window.__height=window.__height||this.stage.height;
        

        ad.x=0;
        ad.y=window.__height-240;
        ad.width=750;
        ad.height=240;
        this.scene.addChild(ad);

        var tts:egret.Bitmap=this.createBitmapByName('tts_png');
        this.scene.addChild(tts);
        tts.y=290;
        tts.x=64;
        tts.height=620;

        var xinfeng:egret.Bitmap=this.createBitmapByName('xinfeng_png');
        this.scene.addChild(xinfeng);
        xinfeng.y=866;
        xinfeng.x=0;

        var btn1:egret.Bitmap=this.createBitmapByName('btn-1_png');
        this.scene.addChild(btn1);
        btn1.y=870;
        btn1.x=84;
        this.btn1=btn1;

        var btn2:egret.Bitmap=this.createBitmapByName('btn-2_png');
        this.scene.addChild(btn2);
        btn2.y=870;
        btn2.x=429;
        this.btn2=btn2;

        var btn3:egret.Bitmap=this.createBitmapByName('btn-3_png');
        this.scene.addChild(btn3);
        btn3.y=959;
        btn3.x=263;
        this.btn3=btn3;

        var leftHand:egret.Bitmap=this.createBitmapByName('shou--left_png');
        this.scene.addChild(leftHand);
        leftHand.y=963;
        leftHand.x=0;

        var rightHand:egret.Bitmap=this.createBitmapByName('shou--right_png');
        this.scene.addChild(rightHand);
        rightHand.y=963;
        rightHand.x=639;

    }

    private bindEvent(){
        this.btn1.touchEnabled=true;
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            btn1();
            this.createLayer();
        },this);
        this.ad.touchEnabled=true;
        this.ad.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            btn4();
            document.location.href='http://yuehui.m.emao.com';
        },this);
        this.btn2.touchEnabled=true;
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            this.stage.removeChildren();
            this.stage.addChild(this.scene);
            P2Scene.deadline=P2Scene.TIME;
            P2Scene.scene=new egret.DisplayObjectContainer;
            new P2Scene(P2Scene.scene,this.stage);
            this.scene.x=0;
            this.scene.y=0;
            TweenMax.to(this.scene,0.6,{
                y:0,
                x:0,
                rotation:100,
                alpha:0,
                onComplete:()=>this.stage.removeChild(this.scene),
                ease: Back.easeInOut,
            });
            btn2();
        },this);
        this.btn3.touchEnabled=true;
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            btn3();
            document.location.href='http://zt.m.emao.com/bachelor';
        },this);

        
            
        this.logo.touchEnabled=true;
        this.logo.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                // window.location.href='http://m.emao.com';
            }, this,true);
    }
    
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}