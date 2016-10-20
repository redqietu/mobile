//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        this.createGameScene1();
    }

    private createGameScene1():void{
        var scene:egret.DisplayObjectContainer=new egret.DisplayObjectContainer; 
        var bg0:egret.Shape=new egret.Shape;
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        bg0.graphics.beginFill(0xffda0e,1);
        bg0.graphics.drawRect(0,0,stageW,stageH);
        bg0.graphics.endFill();
        scene.addChild(bg0);
        var bg1:egret.Bitmap = this.createBitmapByName("bk-sanshe_png");
        scene.addChild(bg1);
        var bg2:egret.Bitmap = this.createBitmapByName("bk-dian_png");
        scene.addChild(bg2);
        var bg3:egret.Bitmap = this.createBitmapByName("bk-p1_png");
        scene.addChild(bg3);

        var bgL:egret.Bitmap=this.createBitmapByName('left_png');
        var bgR:egret.Bitmap=this.createBitmapByName('right_png');
        bgL.x=0;
        bgL.y=658;
        scene.addChild(bgL);
        bgR.x=stageW-141;
        bgR.y=658;
        scene.addChild(bgR);
        var logo:egret.Bitmap=this.createBitmapByName('icon-emao_png');
        scene.addChild(logo);

        var btn:egret.Bitmap=this.createBitmapByName('btn-lijixiaheishou_png');
        scene.addChild(btn);
        btn.x=82;
        btn.y=995;
        this.addChild(scene);
        btn.touchEnabled=true;
        btn.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                TweenMax.to(scene,1,{
                    x:-1000,
                    y:-1000,
                    scale:0,
                    opacity:0,
                    rotation:-100,
                    ease: Back.easeInOut,
                    onComplete:()=>{
                        this.removeChild(scene);
                    }
                });
                this.createGameScene2();
                this.setChildIndex(scene,scene.numChildren-1);
            }, this,true);
    }

    private createGameScene2(){
        var scene:egret.DisplayObjectContainer=new egret.DisplayObjectContainer;
        var bg:egret.Bitmap=this.createBitmapByName('bk-p2_png');
        scene.addChild(bg);
        var timeline=new TimelineMax({
            onComplete: ()=>{
                P2App.getInstance(scene);
            },
        });
        scene.anchorOffsetX=this.stage.width/2;
        scene.anchorOffsetY=this.stage.height/2;
        timeline.fromTo(scene,1.4,{
            x: 0,
            y: 0,
            alpha: 0,
            // rotation: 100,
            ease: Back.easeOut,
            scaleX:9,
            scaleY:9
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
        });
        this.addChild(scene);

    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


