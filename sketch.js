//var txt = "the theremin is theirs, ok? yes, it is. this is a theremin.";
var txt;
var order;
var ngrams = {};
var button;

function setup() {
  noCanvas();
  txt = select("#source");
  order = select("#order");
  characters = select("#characters");

  // for (var i = 0; i <= txt.value().length - int(order.value()); i++) {
  //   var gram = txt.value().substring(i, i + int(order.value()));

  //   if (!ngrams[gram]) {
  //     ngrams[gram] = [];
  //   }
  //   ngrams[gram].push(txt.value().charAt(i + int(order.value())));
  // }
  button = createButton("generate");
  button.mousePressed(markovIt);
  console.log(ngrams);
}

function markovIt() {

  for (var i = 0; i <= txt.value().length - int(order.value()); i++) {
    var gram = txt.value().substring(i, i + int(order.value()));

    if (!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(txt.value().charAt(i + int(order.value())));
  }

  var currentGram = txt.value().substring(0, int(order.value()));
  var result = currentGram;

  for (var i = 0; i < int(characters.value()); i++) {
    var possibilities = ngrams[currentGram];
    if (!possibilities) {
      break;
    }
    var next = random(possibilities);
    result += next;
    var len = result.length;
    currentGram = result.substring(len - int(order.value()), len);
  }

  createP(result);
}