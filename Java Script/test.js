/**
*
*  Crossbrowser Drag Handler
*  http://www.webtoolkit.info/
*
**/
 
var DragHandler = {
 
 
	// private property.
	_oElem : null,
 
 
	// public method. Attach drag handler to an element.
	attach : function(oElem) {
		oElem.onmousedown = DragHandler._dragBegin;
 
		// callbacks
		oElem.dragBegin = new Function();
		oElem.drag = new Function();
		oElem.dragEnd = new Function();
 
		return oElem;
	},
 
 
	// private method. Begin drag process.
	_dragBegin : function(e) {
		var oElem = DragHandler._oElem = this;
 
		if (isNaN(parseInt(oElem.style.left))) { oElem.style.left = '0px'; }
		if (isNaN(parseInt(oElem.style.top))) { oElem.style.top = '0px'; }
 
		var x = parseInt(oElem.style.left);
		var y = parseInt(oElem.style.top);
 
		e = e ? e : window.event;
		oElem.mouseX = e.clientX;
		oElem.mouseY = e.clientY;
 
		oElem.dragBegin(oElem, x, y);

		oElem.style.left = x;
		oElem.style.top = y;
		document.onmousemove = DragHandler._drag;
		document.onmouseup = DragHandler._dragEnd;
		return false;
	},
 
 
	// private method. Drag (move) element.
	_drag : function(e) {
		var oElem = DragHandler._oElem;
 
		var x = parseInt(oElem.style.left);
		var y = parseInt(oElem.style.top);
 
		e = e ? e : window.event;
		oElem.style.left = x + (e.clientX - oElem.mouseX) + 'px';
		oElem.style.top = y + (e.clientY - oElem.mouseY) + 'px';
 
		oElem.mouseX = e.clientX;
		oElem.mouseY = e.clientY;
 
		oElem.drag(oElem, x, y);
 
		return false;
	},
 
 
	// private method. Stop drag process.
	_dragEnd : function() {
		var oElem = DragHandler._oElem;
 
		var x = parseInt(oElem.style.left);
		var y = parseInt(oElem.style.top);

		oElem.dragEnd(oElem, x, y);
 
		document.onmousemove = null;
		document.onmouseup = null;
		DragHandler._oElem = null;
	}
 
}

/* FedEx code from here on */

function attachArrow (sourceDiv, targetDiv) {
	var canvas = document.getElementById("arrow");
	canvas.sourceDiv = sourceDiv;
	canvas.targetDiv = targetDiv;
	sourceDiv.dragEnd = drawArrows;
	targetDiv.dragEnd = drawArrows;
}

function drawArrows (obj, x, y) {
	var canvasses = document.getElementsByTagName("canvas");
	if (canvasses && canvasses.length > 0) {
		for (var i = 0; i < canvasses.length; i++)
			drawArrow (canvasses[i]);
	}
}

function drawArrow (canvas) {
	var sourceDiv = canvas.sourceDiv;
	var targetDiv = canvas.targetDiv;
	canvas.left = sourceDiv.style.pixelLeft + sourceDiv.style.pixelWidth;
	canvas.top = sourceDiv.style.pixelTop + sourceDiv.style.pixelHeight/2;
	canvas.width = targetDiv.style.pixelLeft - canvas.style.left;
	canvas.height = targetDiv.style.pixelTop - canvas.style.pixelTop + targetDiv.style.pixelHeight/2;

	var width = canvas.style.pixelWidth;
	var height = canvas.style.pixelHeight;
	alert ("hello?");
	if (canvas.getContext) {
	alert (canvas.getContext);
		var context = canvas.getContext("2d");
		context.strokeStyle = "black";
		context.beginPath ();
	//	context.moveTo (0, 0);
	//	context.lineTo (width, height);
	//	context.bezierCurveTo (width/2, height/3, width/2, height*2/3, width, height);
	//	context.stroke();
	}
}