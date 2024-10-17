(function () {
  // var data = [
  //   {
  //     value: 17.5,
  //     label: 'Always'
  //   },
  //   {
  //     value: 15,
  //     label: 'Often'
  //   },
  //   {
  //     value: 29.7,
  //     label: 'Sometimes'
  //   },
  //   {
  //     value: 22.7,
  //     label: 'Seldom'
  //   },
  //   {
  //     value: 15,
  //     label: 'Never'
  //   }
  // ];
  function getTextColor(rgba) {
    rgba = rgba.match(/\d+/g);
    if ((rgba[0] * 0.299) + (rgba[1] * 0.587) + (rgba[2] * 0.114) > 186) {
      return 'black';
    } else {
      return 'white';
    }
  }

  var data = [];

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  let list = document.querySelector('#legend>.key');
  // let color = [];
  // let percent = [];
  for (var i = 0; i < list.children.length; i++) {
    var square = document.querySelector(`#legend>.key>.item:nth-child(${i + 1})>svg>rect`);
    var label = document.querySelector(`#legend>.key>.item:nth-child(${i + 1})>div`);
    var words = label.textContent.split(' ');
    var lastWord = words[words.length - 1];
    lastWord = lastWord.replace('%', '');
    data.push({
      color: getComputedStyle(square).fill,
      value: Number(lastWord)
    });
  }
  console.log(data);


  // var colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']

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
    var value = segment.value;

    var startSegment = cumulative / sum * 2 * Math.PI;
    var endSegment = (cumulative + segment.value) / sum * 2 * Math.PI;

    // drawing segments
    ctx.fillStyle = data[di].color;
    ctx.beginPath();
    ctx.moveTo(pieX, pieY);
    ctx.arc(pieX, pieY, pieSize, startSegment, endSegment, false);
    ctx.lineTo(pieX, pieY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // writing labels
    var diffArc = endSegment - startSegment
    var labelX = pieX + Math.sin(startSegment + Math.PI / 2 + diffArc / 2) * pieSize * 0.6;
    var labelY = pieY - Math.cos(startSegment + Math.PI / 2 + diffArc / 2) * pieSize * 0.6;

    // ctx.textAlign = 'center';
    // ctx.font = 'bold 13pt Calibri';
    // console.log(getTextColor(data[di].color));
    // ctx.fillStyle = 'black';
    // ctx.fillText(segment.value + "%", labelX, labelY);

    cumulative += segment.value;

  }
})()
