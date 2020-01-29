
/*
Creating our canvas in html and connecting the canvas with our javascript code
*/
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");
width = canvas.width = window.innerWidth
height = canvas.height = window.innerHeight


// let i = 0;
// let r = 0, g = 0, b = 0;

/*
pyBlock() -> void
Parameter: x,y,size = draw rectangle
            angle = degrees of rotation of rectangle
            limit = how many times rectangles shall be created
returns: a rotated rectangle
Rtype: void
*/
let pyBlocks = function(x, y, size, angle, limit){

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillRect(0, 0, size, -size);

    let leftSize = (Math.abs(Math.cos(pyTree.leftAngle)*size));
    let rightSize = Math.abs(Math.sin(pyTree.leftAngle)*size);

    let x1 = 0;
    let y1 = -size;
    let x2 = x1 + Math.cos(pyTree.leftAngle) * leftSize;
    let y2 = y1 + Math.sin(pyTree.leftAngle) * leftSize;

    if (limit > 0){
      pyBlocks(x1, y1, leftSize, pyTree.leftAngle, limit-1);
    
    }else{
        ctx.save();
      	ctx.translate(x1, y1);
        ctx.rotate(pyTree.leftAngle);  
      	ctx.fillRect(0, 0, leftSize, -leftSize);
      	ctx.restore();
    }

    if(limit > 0){
        pyBlocks(x2, y2, rightSize, pyTree.rightAngle, limit-1);
    
    }else{
        ctx.save();
    	ctx.translate(x2, y2);
    	ctx.rotate(pyTree.rightAngle);
    	ctx.fillRect(0, 0, rightSize, -rightSize);
    	ctx.restore();
    }
    ctx.restore();
}

/*
Parameter: r, g, b
*/
// function rgb(r, g, b){
//     return "rgb(" + r +"," + g + "," + b +")"
// }


let pyTree = {
    leftAngle: 0,
    rightAngle: 0,
    size: 100,
    time: 0,
}

draw();


function draw() {
    ctx.clearRect(0, 0, width, height);
    pyTree.leftAngle = -Math.PI/4 + Math.sin(pyTree.time += 0.01) * Math.PI/4;
    pyTree.rightAngle = pyTree.leftAngle + 90*Math.PI / 180;
    ctx.fillStyle = hsvToRgb(i, 100, 100);
    i++;
    pyBlocks(width/2, height-50, pyTree.size, 0, 8);
    requestAnimationFrame(draw);
}

// function hsvToRgb(h, s, v) {
//     var r, g, b;
//     var i;
//     var f, p, q, t;
     
//     // Make sure our arguments stay in-range
//     h = h % 360;
//     s = Math.max(0, Math.min(100, s));
//     v = Math.max(0, Math.min(100, v));
     
//     // We accept saturation and value arguments from 0 to 100 because that's
//     // how Photoshop represents those values. Internally, however, the
//     // saturation and value are calculated from a range of 0 to 1. We make
//     // That conversion here.
//     s /= 100;
//     v /= 100;
     
//     if(s == 0) {
//         // Achromatic (grey)
//         r = g = b = v;
//         return [
//             Math.round(r * 255), 
//             Math.round(g * 255), 
//             Math.round(b * 255)
//         ];
//     }
     
//     h /= 60; // sector 0 to 5
//     i = Math.floor(h);
//     f = h - i; // factorial part of h
//     p = v * (1 - s);
//     q = v * (1 - s * f);
//     t = v * (1 - s * (1 - f));
     
//     switch(i % 6) {
//         case 0:
//             r = v;
//             g = t;
//             b = p;
//             break;
     
//         case 1:
//             r = q;
//             g = v;
//             b = p;
//             break;
     
//         case 2:
//             r = p;
//             g = v;
//             b = t;
//             break;
     
//         case 3:
//             r = p;
//             g = q;
//             b = v;
//             break;
     
//         case 4:
//             r = t;
//             g = p;
//             b = v;
//             break;
     
//         case 5:
//             r = v;
//             g = p;
//             b = q;
//     }
     
//     return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
// }
