// Based on https://codepen.io/swaroopsm/pen/qIamk
var drawPieChart = function () {


    var data = [
        { label: 'Other', value: 68 },
        { label: 'ZoomText/Fusion', value: 72 },
        { label: 'VoiceOver', value: 100 },
        { label: 'NVDA', value: 476 },
        { label: 'JAWS', value: 832 }
    ];
    var colors = ['#FF0000', '#0000FF', '#008800', '#A52A2A', '#800080'];
    var canvas = document.getElementById('pie');
    var ctx = canvas.getContext('2d');
    var pad = 20;
    var x = (canvas.width / 4) + pad;
    y = canvas.height / 2;
    var color,
        startAngle,
        endAngle,
        total = getTotal(data);

    for (var i = 0; i < data.length; i++) {
        color = colors[i];
        startAngle = calculateStart(data, i, total);
        endAngle = calculateEnd(data, i, total);

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(x, y);
        ctx.arc(x, y, y - 100, startAngle, endAngle);
        ctx.fill();
        ctx.rect((canvas.width / 2) + (pad * 4), y - i * 30, 12, 12);
        ctx.fill();
        ctx.font = "13px sans-serif";
        ctx.fillText(data[i].label + " - " + data[i].value + " (" + calculatePercent(data[i].value, total) + "%)", (canvas.width / 2) + (pad * 5), y - i * 30 + 10);
    }
};

var calculatePercent = function (value, total) {

    return (value / total * 100).toFixed(2);
};

var getTotal = function (data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += data[i].value;
    }

    return sum;
};

var calculateStart = function (data, index, total) {
    if (index === 0) {
        return 0;
    }

    return calculateEnd(data, index - 1, total);
};

var calculateEndAngle = function (data, index, total) {
    var angle = data[index].value / total * 360;
    var inc = (index === 0) ? 0 : calculateEndAngle(data, index - 1, total);

    return (angle + inc);
};

var calculateEnd = function (data, index, total) {

    return degreeToRadians(calculateEndAngle(data, index, total));
};

var degreeToRadians = function (angle) {
    return angle * Math.PI / 180
}