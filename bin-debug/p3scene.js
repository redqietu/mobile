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
        // this.stage.scaleMode=egret.StageScaleMode.EXACT_FIT;
        this.stage.addChild(this.scene);
    };
    p.createLayer = function (e) {
        var _this = this;
        var ct = new egret.DisplayObjectContainer;
        this.stage.addChild(ct);
        var shape = new egret.Shape;
        shape.graphics.beginFill(0x000, 1);
        shape.graphics.drawRect(0, 0, this.stageWidth, this.stageHeight);
        shape.graphics.endFill();
        shape.alpha = 0.8;
        ct.addChild(shape);
        ct.touchEnabled = true;
        ct.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, ct, false);
        var share = this.createBitmapByName('layer-share_png');
        share.x = 0;
        share.y = 0;
        var close = this.createBitmapByName('btn-close_png');
        close.x = 23;
        close.y = 22;
        ct.addChild(close);
        ct.addChild(share);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.stage.removeChild(ct);
        }, ct, false);
    };
    p.createView = function () {
        var bg1 = this.createBitmapByName('bk-dian_png');
        var bg2 = new egret.Shape;
        bg2.graphics.beginFill(0x89c6ee, 1);
        bg2.graphics.drawRect(0, 0, this.stageWidth, this.stageHeight);
        bg2.graphics.endFill();
        this.scene.addChild(bg2);
        this.scene.addChild(bg1);
        var xinzhi = this.createBitmapByName('xinzhi_png');
        this.scene.addChild(xinzhi);
        var logo = this.createBitmapByName('icon-emao_png');
        // this.scene.addChild(logo);
        logo.y = 22;
        logo.x = 29;
        this.logo = logo;
        var ad = this.createBitmapByName('ad_png');
        this.ad = ad;
        window.__height = window.__height || this.stage.height;
        ad.x = 0;
        ad.y = window.__height - 240;
        ad.width = 750;
        ad.height = 240;
        this.scene.addChild(ad);
        var tts = this.createBitmapByName('tts_png');
        this.scene.addChild(tts);
        tts.y = 290;
        tts.x = 64;
        tts.height = 620;
        var xinfeng = this.createBitmapByName('xinfeng_png');
        this.scene.addChild(xinfeng);
        xinfeng.y = 866;
        xinfeng.x = 0;
        var btn1 = this.createBitmapByName('btn-1_png');
        this.scene.addChild(btn1);
        btn1.y = 870;
        btn1.x = 84;
        this.btn1 = btn1;
        var btn2 = this.createBitmapByName('btn-2_png');
        this.scene.addChild(btn2);
        btn2.y = 870;
        btn2.x = 429;
        this.btn2 = btn2;
        var btn3 = this.createBitmapByName('btn-3_png');
        this.scene.addChild(btn3);
        btn3.y = 959;
        btn3.x = 263;
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
            this.createLayer();
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
            btn2();
        }, this);
        this.btn3.touchEnabled = true;
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            btn3();
            document.location.href = 'http://zt.m.emao.com/bachelor';
        }, this);
        this.logo.touchEnabled = true;
        this.logo.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // window.location.href='http://m.emao.com';
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