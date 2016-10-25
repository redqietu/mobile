var P3Scene = (function () {
    function P3Scene(scene, stage) {
        this.cst(scene, stage);
        this.init();
        this.createView();
        this.bindEvent();
    }
    var d = __define,c=P3Scene,p=c.prototype;
    P3Scene.getInstance = function (scene, stage) {
        return P3Scene.instance ? P3Scene.instance : new P3Scene(scene, stage);
    };
    p.cst = function (scene, stage) {
        this.scene = scene;
        this.stage = stage;
        this.stageWidth = this.stage.stageWidth;
        this.stageHeight = this.stage.stageHeight;
    };
    p.init = function () {
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
        this.stage.addChild(this.scene);
    };
    p.createView = function () {
        var bg0 = this.createBitmapByName('bk-sanshe_png');
        var bg1 = this.createBitmapByName('bk-dian_png');
        var bg2 = new egret.Shape;
        bg2.graphics.beginFill(0xffda0e, 1);
        bg2.graphics.drawRect(0, 0, this.stageWidth, this.stageHeight);
        bg2.graphics.endFill();
        this.scene.addChild(bg2);
        this.scene.addChild(bg0);
        this.scene.addChild(bg1);
        var xinzhi = this.createBitmapByName('xinzhi_png');
        this.scene.addChild(xinzhi);
        xinzhi.y = 28;
        xinzhi.x = 29;
        var logo = this.createBitmapByName('icon-emao_png');
        this.scene.addChild(logo);
        logo.y = 22;
        logo.x = 29;
        this.logo = logo;
        var tts = this.createBitmapByName('tts_png');
        this.scene.addChild(tts);
        tts.y = 279;
        tts.x = 64;
        var xinfeng = this.createBitmapByName('xinfeng_png');
        this.scene.addChild(xinfeng);
        xinfeng.y = 866;
        xinfeng.x = 0;
        var btn1 = this.createBitmapByName('btn-1_png');
        this.scene.addChild(btn1);
        btn1.y = 940;
        btn1.x = 64;
        this.btn1 = btn1;
        var btn2 = this.createBitmapByName('btn-2_png');
        this.scene.addChild(btn2);
        btn2.y = 940;
        btn2.x = 350;
        this.btn2 = btn2;
        var btn3 = this.createBitmapByName('btn-3_png');
        this.scene.addChild(btn3);
        btn3.y = 1041;
        btn3.x = 350;
        this.btn3 = btn3;
        var leftHand = this.createBitmapByName('shou--left_png');
        this.scene.addChild(leftHand);
        leftHand.y = 963;
        leftHand.x = 0;
        var rightHand = this.createBitmapByName('shou--right_png');
        this.scene.addChild(rightHand);
        rightHand.y = 963;
        rightHand.x = 639;
    };
    p.bindEvent = function () {
        this.btn1.touchEnabled = true;
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            btn1();
        }, this);
        this.btn2.touchEnabled = true;
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var _this = this;
            this.stage.removeChildren();
            this.stage.addChild(this.scene);
            P2Scene.deadline = P2Scene.TIME;
            P2Scene.scene = new egret.DisplayObjectContainer;
            new P2Scene(P2Scene.scene, this.stage);
            this.scene.x = 0;
            this.scene.y = 0;
            TweenMax.to(this.scene, 0.6, {
                y: 0,
                x: 0,
                rotation: 100,
                alpha: 0,
                onComplete: function () { return _this.stage.removeChild(_this.scene); },
                ease: Back.easeInOut,
            });
        }, this);
        this.btn3.touchEnabled = true;
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            btn3();
        }, this);
        this.logo.touchEnabled = true;
        this.logo.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            window.location.href = 'http://m.emao.com';
        }, this, true);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    P3Scene.scene = new egret.DisplayObjectContainer;
    return P3Scene;
}());
egret.registerClass(P3Scene,'P3Scene');
//# sourceMappingURL=p3Scene.js.map