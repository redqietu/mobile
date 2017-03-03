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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;
        this.bg = new egret.Shape;
        this.bg.graphics.beginFill(0x91f9f2, 1);
        this.bg.graphics.drawRect(0, 0, width, height);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 500;
        this.textField.width = width;
        this.textField.height = 100;
        this.textField.textColor = 0x000;
        this.textField.textAlign = 'center';
        this.textfield = new egret.TextField();
        this.addChild(this.textfield);
        this.textfield.y = 532;
        this.textfield.width = width;
        this.textfield.height = 100;
        this.textfield.textColor = 0x000;
        this.textfield.textAlign = 'center';
    };
    p.setProgress = function (current, total) {
        this.textfield.text = "\u52A0\u8F7D\u4E86" + current + "\u4E2A,\u8FD8\u5269" + (total - current) + "\u4E2A";
        this.textField.text = "\u732B\u54E5\u6B63\u5728\u4E3A\u60A8\u62FC\u547D\u52A0\u8F7D\u6E38\u620F\u8D44\u6E90...";
    };
    return LoadingUI;
}(egret.Sprite));
egret.registerClass(LoadingUI,'LoadingUI');
//# sourceMappingURL=LoadingUI.js.map