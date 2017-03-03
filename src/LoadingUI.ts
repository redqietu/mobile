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

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;
    private bg:egret.Shape;
    private textfield;

    private createView():void {
        var width=egret.MainContext.instance.stage.stageWidth;
        var height=egret.MainContext.instance.stage.stageHeight;
        this.bg=new egret.Shape;
        this.bg.graphics.beginFill(0x91f9f2,1);
        this.bg.graphics.drawRect(0,0,width,height);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 500;
        this.textField.width = width;
        this.textField.height = 100;
        this.textField.textColor=0x000;
        this.textField.textAlign='center';
        
        this.textfield = new egret.TextField();
        this.addChild(this.textfield);
        this.textfield.y = 532;
        this.textfield.width = width;
        this.textfield.height = 100;
        this.textfield.textColor=0x000;
        this.textfield.textAlign='center';
    }

    public setProgress(current:number, total:number):void {
        this.textfield.text = `加载了${current}个,还剩${total-current}个`;
        this.textField.text = `猫哥正在为您拼命加载游戏资源...`;
    }
}
