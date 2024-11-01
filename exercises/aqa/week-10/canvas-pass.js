
var can, ctx,
    numSamples,
    xScalar, yScalar,
    radius, quarter;
// data sets -- set literally or obtain from an ajax call
var dataName = ["Always", "Often", "Sometimes", "Seldom", "Never"];
var q1Value = [17.5, 15, 29.7, 22.7, 15];
var fillColor = ["red", "blue", "green", "purple", "orange"];

// set this value for your data
numSamples = 5;
can = document.getElementById("canPie");
quarter = document.getElementById("quarter");
ctx = can.getContext("2d");

drawPie();



function drawPie() {
    radius = can.height / 3;
    var midX = can.width / 2;
    var midY = can.height / 2;
    ctx.strokeStyle = "black";
    ctx.font = "18pt Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // get data set
    var dataValue = q1Value;
    // calculate total value of pie
    var total = 0;
    for (var i = 0; i < numSamples; i++) {
        total += dataValue[i];
    }
    // get ready to draw
    ctx.clearRect(0, 0, can.width, can.height);
    var oldAngle = 0;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, can.width, can.height);

    // for each sample
    for (var i = 0; i < numSamples; i++) {
        // draw wedge
        var portion = dataValue[i] / total;
        var wedge = 2 * Math.PI * portion;
        ctx.beginPath();
        var angle = oldAngle + wedge;
        ctx.arc(midX, midY, radius, oldAngle, angle);
        ctx.lineTo(midX, midY);
        ctx.closePath();
        ctx.fillStyle = fillColor[i];
        ctx.fill();    // fill with wedge color
        ctx.stroke();  // outline in black

        // print label
        // set angle to middle of wedge
        var labAngle = oldAngle + wedge / 2;
        // set x, y for label outside center of wedge
        // adjust for fact text is wider than it is tall
        var labX = midX + Math.cos(labAngle) * radius * 1.5;
        var labY = midY + Math.sin(labAngle) * radius * 1.3 - 12;
        // print name and value with black shadow
        ctx.save();
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = -1;
        ctx.fillStyle = fillColor[i];
        ctx.fillText(dataName[i], labX, labY);
        ctx.fillText(dataValue[i] + "%", labX, labY + 25);
        ctx.restore();
        // update beginning angle for next wedge
        oldAngle += wedge;
    }
}