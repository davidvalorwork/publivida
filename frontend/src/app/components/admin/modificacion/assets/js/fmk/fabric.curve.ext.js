/*
 * fabric.js Controls Extension
 * for fabric.js current build
 * Simon Kunz 09.02.2016 for pixolith
 * Licensed under the MIT license.
 */
 
"use strict";!function(t){var e=t.fabric||(t.fabric={}),r="1.6.0",o=e.util.degreesToRadians,i={mt:0,tr:1,mr:2,br:3,mb:4,bl:5,ml:6,tl:7};r.localeCompare(t.fabric.version)>-1&&console.warn("this extension might not be fully compatible with your version of fabric.js ("+t.fabric.version+").Consider using the latest compatible build of fabric.js (> "+r+")"),e.util.object.extend(e.Object.prototype,{useCustomIcons:!1,cornerBackgroundColor:"transparent",cornerShape:"",cornerPadding:0,customiseCornerIcons:function(t,e){var r,o;for(r in t)t.hasOwnProperty(r)&&(o={},void 0!==t[r].cornerShape&&(this.cornerShape=t[r].cornerShape),void 0!==t[r].cornerBackgroundColor&&(this.cornerBackgroundColor=t[r].cornerBackgroundColor),void 0!==t[r].borderColor&&(this.borderColor=t[r].borderColor),void 0!==t[r].cornerSize&&(this.cornerSize=t[r].cornerSize),void 0!==t[r].cornerPadding&&(this.cornerPadding=t[r].cornerPadding),void 0===t[r].icon&&"settings"!==Object.keys(t)[0]||(this.useCustomIcons=!0,void 0!==t[r].settings&&(o.settings=t[r].settings),void 0!==t[r].icon&&(o.icon=t[r].icon,this.loadIcon(r,o,function(){e&&"function"==typeof e&&e()}))))},loadIcon:function(t,r,o){var i=this,s=new Image;s.onload=function(){i[t+"Icon"]=this,r.settings&&(i[t+"Settings"]=r.settings),o&&"function"==typeof o&&o()},s.onerror=function(){e.warn(this.src+" icon is not an image")},(r.icon.match(/^http[s]?:\/\//)||"//"===r.icon.substring(0,2))&&(s.crossOrigin="Anonymous"),s.src=r.icon},customizeCornerIcons:function(t){this.customiseCornerIcons(t)},drawControls:function(t){if(!this.hasControls)return this;var e,r=this._calculateCurrentDimensions(),o=r.x,i=r.y,s=this.cornerSize,n=-(o+s)/2,c=-(i+s)/2;return this.useCustomIcons?e="drawImage":(t.lineWidth=1,t.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1,t.strokeStyle=t.fillStyle=this.cornerColor,this.transparentCorners||(t.strokeStyle=this.cornerStrokeColor),e=this.transparentCorners?"stroke":"fill"),t.save(),this._setLineDash(t,this.cornerDashArray,null),this._drawControl("tl",t,e,n,c,this.tlIcon,this.tlSettings),this._drawControl("tr",t,e,n+o,c,this.trIcon,this.trSettings),this._drawControl("bl",t,e,n,c+i,this.blIcon,this.blSettings),this._drawControl("br",t,e,n+o,c+i,this.brIcon,this.brSettings),this.get("lockUniScaling")||(this._drawControl("mt",t,e,n+o/2,c,this.mtIcon,this.mtSettings),this._drawControl("mb",t,e,n+o/2,c+i,this.mbIcon,this.mbSettings),this._drawControl("mr",t,e,n+o,c+i/2,this.mrIcon,this.mrSettings),this._drawControl("ml",t,e,n,c+i/2,this.mlIcon,this.mlSettings)),this.hasRotatingPoint&&this._drawControl("mtr",t,e,n+o/2,c-this.rotatingPointOffset,this.mtrIcon,this.mtrSettings),t.restore(),this},_drawControl:function(t,e,r,o,i,s,n){if(this.isControlVisible(t)){var c=this.cornerSize,a=this.cornerStrokeColor||"transparent",h=this.cornerBackgroundColor||"black",l=this.cornerShape||"rect",u=this.cornerPadding||10;if(n&&(n.cornerSize&&(o=o+c/2-n.cornerSize/2,i=i+c/2-n.cornerSize/2,c=n.cornerSize),l=n.cornerShape||l,h=n.cornerBackgroundColor||h,u=n.cornerPadding||u,a=n.cornerStrokeColor||a),this.useCustomIcons)if(l){switch(e.globalAlpha=1,e.fillStyle=h,e.lineWidth=1,e.strokeStyle=a,l){case"rect":e.fillRect(o,i,c,c),a&&e.strokeRect(o,i,c,c);break;case"circle":e.beginPath(),e.arc(o+c/2,i+c/2,c/2,0,2*Math.PI),e.fill(),a&&e.stroke(),e.closePath()}void 0!==s&&e[r](s,o+u/2,i+u/2,c-u,c-u)}else void 0!==s&&e[r](s,o,i,c,c);else"undefined"!=typeof G_vmlCanvasManager||this.transparentCorners||e.clearRect(o,i,c,c),e[r+"Rect"](o,i,c,c),!this.transparentCorners&&a&&e.strokeRect(o,i,c,c)}}}),e.util.object.extend(e.Canvas.prototype,{overwriteActions:!1,fixedCursors:!1,customiseControls:function(t){var e;for(e in t)t.hasOwnProperty(e)&&(void 0!==t[e].action&&(this.overwriteActions=!0,this.setCustomAction(e,t[e].action)),void 0!==t[e].cursor&&(this.fixedCursors=!0,this.setCustomCursor(e,t[e].cursor)))},setCustomAction:function(t,e){this[t+"Action"]=e},setCustomCursor:function(t,e){this[t+"cursorIcon"]=e},customizeControls:function(t){this.customiseControls(t)},_getActionFromCorner:function(t,e,r){if(!e)return"drag";if(e)if(this[e+"Action"]&&this.overwriteActions)switch(e){case"mtr":return this[e+"Action"]||"rotate";case"ml":case"mr":return r[this.altActionKey]?r[this.altActionKey]?"skewY":"scaleX":this[e+"Action"];case"mt":case"mb":return r[this.altActionKey]?r[this.altActionKey]?"skewY":"scaleY":this[e+"Action"];default:return this[e+"Action"]||"scale"}else switch(e){case"mtr":return"rotate";case"ml":case"mr":return r[this.altActionKey]?"skewY":"scaleX";case"mt":case"mb":return r[this.altActionKey]?"skewX":"scaleY";default:return"scale"}return!1},_setupCurrentTransform:function(t,e){if(e){var r=this.getPointer(t),i=e._findTargetCorner(this.getPointer(t,!0)),s=this._getActionFromCorner(e,i,t),n=this._getOriginFromCorner(e,i);"function"==typeof s&&(s.call(this,t,e),s="void"),this._currentTransform={target:e,action:s,corner:i,scaleX:e.scaleX,scaleY:e.scaleY,skewX:e.skewX,skewY:e.skewY,offsetX:r.x-e.left,offsetY:r.y-e.top,originX:n.x,originY:n.y,ex:r.x,ey:r.y,lastX:r.x,lastY:r.y,left:e.left,top:e.top,theta:o(e.angle),width:e.width*e.scaleX,mouseXSign:1,mouseYSign:1,shiftKey:t.shiftKey,altKey:t[this.centeredKey]},this._currentTransform.original={left:e.left,top:e.top,scaleX:e.scaleX,scaleY:e.scaleY,skewX:e.skewX,skewY:e.skewY,originX:n.x,originY:n.y},"remove"===s&&this._removeAction(t,e),"moveUp"===s&&this._moveLayerUpAction(t,e),"moveDown"===s&&this._moveLayerDownAction(t,e),"object"==typeof s&&"rotateByDegrees"===Object.keys(s)[0]&&this._rotateByDegrees(t,e,s.rotateByDegrees),this._resetCurrentTransform()}},_removeAction:function(t,e){var r=this;this.getActiveGroup()&&"undefined"!==this.getActiveGroup()?(this.getActiveGroup().forEachObject(function(t){t.off(),t.remove()}),this.discardActiveGroup(),setTimeout(function(){r.deactivateAll()},0)):(e.off(),e.remove(),setTimeout(function(){r.deactivateAll()},0))},_moveLayerUpAction:function(t,e){this.getActiveGroup()&&"undefined"!==this.getActiveGroup()?this.getActiveGroup().forEachObject(function(t){t.bringForward()}):e.bringForward()},_moveLayerDownAction:function(t,e){this.getActiveGroup()&&"undefined"!==this.getActiveGroup()?this.getActiveGroup().forEachObject(function(t){t.sendBackwards()}):e.sendBackwards()},_rotateByDegrees:function(t,e,r){var o=parseInt(e.getAngle())+r,i=!1;"center"===e.originX&&"center"===e.originY||!e.centeredRotation||(this._setOriginToCenter(e),i=!0),o=o>360?o-360:o,this.getActiveGroup()&&"undefined"!==this.getActiveGroup()?this.getActiveGroup().forEachObject(function(t){t.setAngle(o).setCoords()}):e.setAngle(o).setCoords(),i&&this._setCenterToOrigin(e),this.renderAll()},_setCornerCursor:function(t,e,r){if(this.fixedCursors&&this[t+"cursorIcon"])this[t+"cursorIcon"].match(/\.(?:jpe?g|png|gif|jpg|jpeg|svg)$/)?this.setCursor("url("+this[t+"cursorIcon"]+"), auto"):"resize"===this[t+"cursorIcon"]?this.setCursor(this._getRotatedCornerCursor(t,e,r)):this.setCursor(this[t+"cursorIcon"]);else if(t in i)this.setCursor(this._getRotatedCornerCursor(t,e,r));else{if("mtr"!==t||!e.hasRotatingPoint)return this.setCursor(this.defaultCursor),!1;this.setCursor(this.rotationCursor)}return!1}}),"undefined"!=typeof exports&&(module.exports=this)}(window);
 
 /* curved text */
!function(t){"use strict";var e=t.fabric||(t.fabric={}),s=e.util.object.extend,i=e.util.object.clone;if(e.CurvedText)e.warn("fabric.CurvedText is already defined");else{var r=e.Text.prototype.stateProperties.concat();r.push("radius","spacing","reverse","effect","range","largeFont","smallFont");var h=e.Text.prototype._dimensionAffectingProps;h.radius=!0,h.spacing=!0,h.reverse=!0,h.fill=!0,h.effect=!0,h.width=!0,h.height=!0,h.range=!0,h.fontSize=!0,h.shadow=!0,h.largeFont=!0,h.smallFont=!0;var l=e.Group.prototype.delegatedProperties;l.backgroundColor=!0,l.textBackgroundColor=!0,l.textDecoration=!0,l.stroke=!0,l.strokeWidth=!0,l.shadow=!0,l.fontWeight=!0,l.fontStyle=!0,l.strokeWidth=!0,l.textAlign=!0,e.CurvedText=e.util.createClass(e.Text,e.Collection,{type:"curvedText",radius:50,range:5,smallFont:10,largeFont:30,effect:"curved",spacing:20,reverse:!1,stateProperties:r,delegatedProperties:l,_dimensionAffectingProps:h,_isRendering:0,complexity:function(){this.callSuper("complexity")},initialize:function(t,s){s||(s={}),this.letters=new e.Group([],{selectable:!1,padding:0}),this.__skipDimension=!0,this.setOptions(s),this.__skipDimension=!1,parseFloat(e.version)>=2&&this.callSuper("initialize",t,s),this.setText(t),this._render()},setText:function(t){if(this.letters){for(;0!==t.length&&this.letters.size()>=t.length;)this.letters.remove(this.letters.item(this.letters.size()-1));for(var s=0;s<t.length;s++)void 0===this.letters.item(s)?this.letters.add(new e.Text(t[s])):this.letters.item(s).setText(t[s])}this.callSuper("setText",t),this._render()},_initDimensions:function(t){if(!this.__skipDimension){t||(t=e.util.createCanvasElement().getContext("2d"),this._setTextStyles(t)),this._textLines=this.text.split(this._reNewline),this._clearCache();var s=this.textAlign;this.textAlign="left",this.width=this.getWidth(),this.textAlign=s,this.height=this.getHeight(),this._render(t)}},_render:function(t){var s=e.util.getRandomInt(100,999);if(this._isRendering=s,this.letters){var i=0,r=0,h=0,l=parseInt(this.spacing),n=0;if("curved"===this.effect){for(var a=0,o=this.text.length;a<o;a++)h+=this.letters.item(a).width+l;h-=l}else"arc"===this.effect&&(n=(this.letters.item(0).fontSize+l)/this.radius/(Math.PI/180),h=(this.text.length+1)*(this.letters.item(0).fontSize+l));i="right"===this.get("textAlign")?90-h/2/this.radius/(Math.PI/180):"left"===this.get("textAlign")?-90-h/2/this.radius/(Math.PI/180):-h/2/this.radius/(Math.PI/180),this.reverse&&(i=-i);var g=0,d=this.reverse?-1:1,c=0,f=0;for(a=0,o=this.text.length;a<o;a++){if(s!==this._isRendering)return;for(var m in this.delegatedProperties)this.letters.item(a).set(m,this.get(m));if(this.letters.item(a).set("left",g),this.letters.item(a).set("top",0),this.letters.item(a).setAngle(0),this.letters.item(a).set("padding",0),"curved"===this.effect)c=(this.letters.item(a).width+l)/this.radius/(Math.PI/180),r=(i=d*(d*i+f))*(Math.PI/180),f=c,this.letters.item(a).setAngle(i),this.letters.item(a).set("top",-1*d*(Math.cos(r)*this.radius)),this.letters.item(a).set("left",d*(Math.sin(r)*this.radius)),this.letters.item(a).set("padding",0),this.letters.item(a).set("selectable",!1);else if("arc"===this.effect)r=(i=d*(d*i+n))*(Math.PI/180),this.letters.item(a).set("top",-1*d*(Math.cos(r)*this.radius)),this.letters.item(a).set("left",d*(Math.sin(r)*this.radius)),this.letters.item(a).set("padding",0),this.letters.item(a).set("selectable",!1);else if("STRAIGHT"===this.effect)this.letters.item(a).set("left",g),this.letters.item(a).set("top",0),this.letters.item(a).setAngle(0),g+=this.letters.item(a).get("width"),this.letters.item(a).set("padding",0),this.letters.item(a).set({borderColor:"red",cornerColor:"green",cornerSize:6,transparentCorners:!1}),this.letters.item(a).set("selectable",!1);else if("smallToLarge"===this.effect){var p=parseInt(this.smallFont),u=(C=parseInt(this.largeFont))-p,x=Math.ceil(this.text.length/2),v=p+a*(_=u/this.text.length);this.letters.item(a).set("fontSize",v),this.letters.item(a).set("left",g),g+=this.letters.item(a).get("width"),this.letters.item(a).set("padding",0),this.letters.item(a).set("selectable",!1),this.letters.item(a).set("top",-1*this.letters.item(a).get("fontSize")+a)}else if("largeToSmallTop"===this.effect){p=parseInt(this.largeFont),u=(C=parseInt(this.smallFont))-p,x=Math.ceil(this.text.length/2),v=p+a*(_=u/this.text.length);this.letters.item(a).set("fontSize",v),this.letters.item(a).set("left",g),g+=this.letters.item(a).get("width"),this.letters.item(a).set("padding",0),this.letters.item(a).set({borderColor:"red",cornerColor:"green",cornerSize:6,transparentCorners:!1}),this.letters.item(a).set("padding",0),this.letters.item(a).set("selectable",!1),this.letters.item(a).top=-1*this.letters.item(a).get("fontSize")+a/this.text.length}else if("largeToSmallBottom"===this.effect){p=parseInt(this.largeFont),u=(C=parseInt(this.smallFont))-p,x=Math.ceil(this.text.length/2),v=p+a*(_=u/this.text.length);this.letters.item(a).set("fontSize",v),this.letters.item(a).set("left",g),g+=this.letters.item(a).get("width"),this.letters.item(a).set("padding",0),this.letters.item(a).set({borderColor:"red",cornerColor:"green",cornerSize:6,transparentCorners:!1}),this.letters.item(a).set("padding",0),this.letters.item(a).set("selectable",!1),this.letters.item(a).top=-1*this.letters.item(a).get("fontSize")-a}else if("bulge"===this.effect){p=parseInt(this.smallFont),u=(C=parseInt(this.largeFont))-p,x=Math.ceil(this.text.length/2);var C,_=u/(this.text.length-x);if(a<x)v=p+a*_;else v=C-(a-x+1)*_;this.letters.item(a).set("fontSize",v),this.letters.item(a).set("left",g),g+=this.letters.item(a).get("width"),this.letters.item(a).set("padding",0),this.letters.item(a).set("selectable",!1),this.letters.item(a).set("top",-1*this.letters.item(a).get("height")/2)}}var S=this.letters.get("scaleX"),b=this.letters.get("scaleY"),T=this.letters.get("angle");this.letters.set("scaleX",1),this.letters.set("scaleY",1),this.letters.set("angle",0),this.letters._calcBounds(),this.letters._updateObjectsCoords(),this.letters.set("scaleX",S),this.letters.set("scaleY",b),this.letters.set("angle",T),this.width=this.letters.width,this.height=this.letters.height,this.letters.left=-this.letters.width/2,this.letters.top=-this.letters.height/2}},_renderOld:function(t){if(this.letters){var e=0,s=0,i=0,r=0;this.reverse&&(r=.5),"center"===this.get("textAlign")||"justify"===this.get("textAlign")?i=this.spacing/2*(this.text.length-r):"right"===this.get("textAlign")&&(i=this.spacing*(this.text.length-r));for(var h=this.reverse?1:-1,l=0,n=this.text.length;l<n;l++){s=(e=h*(-l*parseInt(this.spacing,10)+i))*(Math.PI/180);for(var a in this.delegatedProperties)this.letters.item(l).set(a,this.get(a));this.letters.item(l).set("top",h-Math.cos(s)*this.radius),this.letters.item(l).set("left",h+Math.sin(s)*this.radius),this.letters.item(l).setAngle(e),this.letters.item(l).set("padding",0),this.letters.item(l).set("selectable",!1)}this.letters._calcBounds(),this.reverse?this.letters.top=this.letters.top-2.5*this.height:this.letters.top=0,this.letters.left=this.letters.left-this.width/2,this.letters.saveCoords(),this.width=this.letters.width,this.height=this.letters.height,this.letters.left=-this.letters.width/2,this.letters.top=-this.letters.height/2}},render:function(t,s){if(this.visible&&this.letters){t.save(),this.transform(t);Math.max(this.scaleX,this.scaleY);this.clipTo&&e.util.clipContext(this,t);for(var i=0,r=this.letters.size();i<r;i++){var h=this.letters.item(i);h.borderScaleFactor,h.hasRotatingPoint;h.visible&&h.render(t)}this.clipTo&&t.restore(),t.restore(),this.setCoords()}},_set:function(t,e){this.callSuper("_set",t,e),this.letters&&(this.letters.set(t,e),t in this._dimensionAffectingProps&&(this._initDimensions(),this.setCoords()))},toObject:function(t){var e=s(this.callSuper("toObject",t),{radius:this.radius,spacing:this.spacing,reverse:this.reverse,effect:this.effect,range:this.range,smallFont:this.smallFont,largeFont:this.largeFont});return this.includeDefaultValues||this._removeDefaultValues(e),e},toString:function(){return"#<fabric.CurvedText ("+this.complexity()+'): { "text": "'+this.text+'", "fontFamily": "'+this.fontFamily+'", "radius": "'+this.radius+'", "spacing": "'+this.spacing+'", "reverse": "'+this.reverse+'" }>'},toSVG:function(t){var e=["<g ",'transform="',this.getSvgTransform(),'">'];if(this.letters)for(var s=0,i=this.letters.size();s<i;s++)e.push(this.letters.item(s).toSVG(t));return e.push("</g>"),t?t(e.join("")):e.join("")}}),e.CurvedText.fromObject=function(t){return new e.CurvedText(t.text,i(t))},e.util.createAccessors(e.CurvedText),e.CurvedText.async=!1}}("undefined"!=typeof exports?exports:this);
