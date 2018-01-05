/**
 * @author ReflexGravity aka Joel DSouza
 * @authorLink https://joeldsouza.me
 * @description A Simple Paint App
 */
var canvas = document.getElementById("paint-canvas");
var ctx = canvas.getContext("2d");

var fX, fY, lX = 10,
    lY = 10,
    rX = 10,
    rY = 0,
    temprY;
var valArr = new Array();
var valTemp;
var i = 0;
var flag = 0,
    first = 0;
var x = 0,
    tX = 0,
    tY = 0;

function clearCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    valTemp = "";
    valArr = new Array();
}

function mouseDist(evt) {
    fX = evt.offsetX;
    fY = evt.offsetY;
    rX = evt.offsetX;
    rY = evt.offsetY;
    lX = evt.offsetX;
    lY = evt.offsetY;
    flag = 1;
    first = 1;
    mousePointer(evt);
}

function mousePointer(evt) {

    if (canvas.getContext) {
        rX = evt.offsetX;
        rY = evt.offsetY;
        if (!first) {

            fX = (rX + lX) / 2;
            lY = rY;

        } else {
            first = 0;
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        //  console.log(" fX " + fX + " fY " + fY + " lX " + lX + " lY " + lY + " rX " + rX + " rY " + rY);

        ctx.beginPath();
        ctx.moveTo(rX, rY);
        ctx.lineTo(lX, lY);
        ctx.lineTo(fX, fY);
        ctx.closePath();
        ctx.stroke();
        //   var rand = Math.floor(Math.random() * (5 + 1)) + 1;
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

        valTemp = {
            id: "a" + i,
            value: {
                fx: fX,
                fy: fY,
                lx: lX,
                ly: lY,
                rx: rX,
                ry: rY
            },
            fillStyle: color
        };
    }
}

var pBodyEl = document.getElementById("paint-body");
pBodyEl.addEventListener("mousemove", function(evt) {
    // Check if the pointer is dragged
    if (flag) {
        tX++;
        tY++;
        rX = evt.offsetX;
        rY = evt.offsetY;
        mousePointer(evt);
    }
}, false);

function drawTriangle(evt) {
    // Mouse button is released
    flag = 0;
    i++;

    if (canvas.getContext) {
        valArr.push(valTemp);
        // Wipe and redraw the old triangles with the new one
        for (var j = 0; j <= valArr.length; j++) {
            console.log(valArr[j]);
            ctx.beginPath();
            ctx.moveTo(valArr[j].value.rx, valArr[j].value.ry);
            ctx.lineTo(valArr[j].value.fx, valArr[j].value.fy);
            ctx.lineTo(valArr[j].value.lx, valArr[j].value.ly);
            ctx.fillStyle = valArr[j].fillStyle;
            //    console.log(valArr[j].fillStyle);
            ctx.fill();
            ctx.closePath();
        }
    }
}