(function () {
  var data = [
    {
      value: 17.5,
      label: 'Always'
    },
    {
      value: 15,
      label: 'Often'
    },
    {
      value: 29.7,
      label: 'Sometimes'
    },
    {
      value: 22.7,
      label: 'Seldom'
    },
    {
      value: 15,
      label: 'Never'
    }
  ];

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d')

  var colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']

  var pieX = 200;
  var pieY = 200;
  var pieSize = 200;

  var sum = 0;

  for (var di = 0; di != data.length; di++) {
    var segment = data[di];
    sum += segment.value;
  };

  var cumulative = 0

  for (var di = 0; di != data.length; di++) {
    var segment = data[di];
    var label = segment.label;
    var value = segment.value;

    let legend = document.querySelector("div#legend");

    let ul = document.createElement("ul");
    legend.append(ul);

    let li = document.createElement("li");
    li.style.borderLeft = "1.5em solid " + colors[di];
    li.textContent = label;
    ul.append(li);


    var startSegment = cumulative / sum * 2 * Math.PI;
    var endSegment = (cumulative + segment.value) / sum * 2 * Math.PI;

    // drawing segments
    ctx.fillStyle = colors[di];
    ctx.beginPath();
    ctx.moveTo(pieX, pieY);
    ctx.arc(pieX, pieY, pieSize, startSegment, endSegment, false);
    ctx.lineTo(pieX, pieY);
    ctx.closePath();
    ctx.fill();

    // writing labels
    var diffArc = endSegment - startSegment
    var labelX = pieX + Math.sin(startSegment + Math.PI / 2 + diffArc / 2) * pieSize * 0.6;
    var labelY = pieY - Math.cos(startSegment + Math.PI / 2 + diffArc / 2) * pieSize * 0.6;

    ctx.textAlign = 'center';
    ctx.font = 'bold 13pt Calibri';

    ctx.fillStyle = 'black';
    ctx.fillText(segment.value + "%", labelX, labelY);

    cumulative += segment.value;

  }
})()
