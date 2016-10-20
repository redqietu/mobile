var P3Scene = (function () {
    function P3Scene(scene, stage) {
        this.cst(scene, stage);
        this.init();
        this.createView();
    }
    var d = __define,c=P3Scene,p=c.prototype;
    p.cst = function (scene, stage) {
        this.scene = scene;
        this.stage = stage;
        this.stageWidth = this.stage.stageWidth;
        this.stageHeight = this.stage.stageHeight;
    };
    p.init = function () {
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
//# sourceMappingURL=p3scene.js.map