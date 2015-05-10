// file nmae : draft.js
// author : Albin
// created at : Fri May  8 23:08:34 2015
// Copyright © Icee.cn

function Draft(canvasID, isHor, fontH) {
    this.canvas = $("#"+canvasID)[0];
    this.isHor = isHor;
    this.context = this.canvas.getContext('2d');
    this.col = 0;
    this.row = 0;
    this.fw = fontH * 0.6;
    this.fh = fontH;
    this.maxCols = Math.floor(this.canvas.width / this.fw);
}

Draft.prototype.draw = function(c) {
    this.maxCols = Math.floor(this.canvas.width / this.fw);
    this.col += this.fw;
    if(this.col >=  this.maxCols * this.fw) {
	this.col = 0;
	// 1.5倍行高
	this.row += this.fh;
    }

    this.context.drawImage(c, (c.width - this.rect[0]) / 2 , (c.height - this.rect[0]) / 2, this.rect[0], this.rect[0], this.col, this.row, this.fw, this.fh);
}

Draft.prototype.clear = function() {
    var c = this.canvas;
    this.context.clearRect( 0, 0, c.width, c.height );
    this.col = this.row = 0;
}

Draft.prototype.del = function() {
    if(this.col >0) {
	this.context.clearRect(this.col, this.row, this.fw, this.fh);
	this.col-= this.fw;
    }
    else if(this.row > 0) {
	this.context.clearRect(this.col, this.row, this.fw, this.fh);
	this.row -= this.fh;
	this.col = (this.maxCols - 1) * this.fw;
    }
}

Draft.prototype.toDataURL = function() {
    var dataString = this.canvas.toDataURL("image/png");
    return dataString;
}

Draft.prototype.nextLine = function() {
    this.row += this.fh;
    this.col = 0;
}

Draft.prototype.space = function() {
    this.col += this.fw;
     if(this.col >=  this.maxCols * this.fw) {
	this.col = 0;
	// 1.5倍行高
	this.row += this.fh;
    }
}

Draft.prototype.drawLines = function() {
    cxt = this.context;
    cxt.lineWidth = 1;
    var w = this.canvas.width;
    var h = this.canvas.height;

    w = w / 2;
    o = w / 5;
    cxt.lineWidth = 3;
    cxt.strokeStyle = 'rgba(128, 0, 0, 20)';
   

    // cxt.moveTo(0, (h - w) / 2);
    // cxt.lineTo(w, (h - w) / 2);
    // cxt.lineTo(w, (h - w) / 2 + w);
    // cxt.lineTo(0, (h - w) / 2 + w);
    // cxt.lineTo(0, (h - w) / 2);

    cxt.moveTo(o, (h - w) / 2 + o);
    cxt.lineTo(w - o, (h - w) / 2 + o);
    cxt.lineTo(w - o, (h - w) / 2 + w - o);
    cxt.lineTo(o, (h - w) / 2 + w - o);
    cxt.lineTo(o, (h - w) / 2 + o);

    // cxt.moveTo(w, (h - w) / 2);
    // cxt.lineTo(w + w, (h - w) / 2);
    // cxt.lineTo(w + w, (h - w) / 2 + w);
    // cxt.lineTo(w, (h - w) / 2 + w);
    // cxt.lineTo(w, (h - w) / 2);

    cxt.moveTo(o + w, (h - w) / 2 + o);
    cxt.lineTo(w + w - o, (h - w) / 2 + o);
    cxt.lineTo(w + w - o, (h - w) / 2 + w - o);
    cxt.lineTo(o + w, (h - w) / 2 + w - o);
    cxt.lineTo(o + w, (h - w) / 2 + o);
    cxt.stroke();

    return [w, o];
}
