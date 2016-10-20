class P3Scene{
    constructor(scene:egret.DisplayObjectContainer,stage:egret.DisplayObjectContainer){
        this.cst(scene,stage);
        this.init();
        this.createView();
    }
    private cst(scene:egret.DisplayObjectContainer,stage:egret.DisplayObjectContainer){
        this.scene=scene;
        this.stage=stage;
        this.stageWidth=this.stage.stageWidth;
        this.stageHeight=this.stage.stageHeight;
    }
    private init(){
        this.stage.addChild(this.scene);
    }
    static scene:egret.DisplayObjectContainer=new egret.DisplayObjectContainer;
    private scene;
    private stage;
    private stageWidth;
    private stageHeight;

    private createView(){
        var bg0:egret.Bitmap=this.createBitmapByName('bk-sanshe_png');
        var bg1:egret.Bitmap=this.createBitmapByName('bk-dian_png');
        
        var bg2:egret.Shape=new egret.Shape;
        bg2.graphics.beginFill(0xffda0e,1);
        bg2.graphics.drawRect(0,0,this.stageWidth,this.stageHeight);
        bg2.graphics.endFill();

        this.scene.addChild(bg2);
        
        this.scene.addChild(bg0);
        this.scene.addChild(bg1);

    }
    
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}