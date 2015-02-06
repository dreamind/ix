
function addStyles(cssRules) {
  $('head').append('<style>' + cssRules + '</style>');
}

function generateAllCardStyles() {
  var style = '', row, col;
  for (var i = 0; i < 52; i++) {
    row = i / 13 >> 0;
    col = i % 13;
    style += _.sprintf('.card-%d { background-position: -%dpx -%dpx; }\n',
      i, 79 * col, 123 * row);
  }
  return style;
}

function generateCardStyles() {
  var style = '';
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 7; col++) {
      style += _.sprintf('#card-row%d-col%d { left: %dpx; top: %dpx; }\n',
        row, col, col * 60, row * 150 + Math.floor(Math.random() * 15));
    }
  }
  return style;
}

function buildCards(cards) {
  var card, cardsEl = $('#cards'), k;
  cardsEl.empty();
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 7; col++) {
      k = col + row * 7;
      card = _.sprintf('<div class="card card-%d" id="card-row%d-col%d"></div>',
        cards[k], row, col);
      cardsEl.append(card);
    }
  }
  $('#step-button').val('Next');
  $('input[name=row]').prop('checked', false);
  $('#column-selection').show();
}

function resolveCard(candidate) {
  var card, cardsEl = $('#cards'), row = 1, col = 3;
  cardsEl.empty();
  card = _.sprintf('<div class="card card-%d" id="card-row%d-col%d"></div>',
    candidate, row, col);
  cardsEl.append(card);
  $('#step-button').val('Replay');
  $('#column-selection').hide();
}

function splitCardsTrio(cards) {
  var parts = [[], [], []], i = 0;
  _.each(cards, function (card) {
    parts[i].push(card);
    i = (i+1) % 3;
  });
  return parts;
}

function initCards() {
  var cards = _.range(52);
  cards = _.shuffle(cards)
  return cards.slice(0, 21);
}

function getCandidates(cards, candidates, k) {
  var a = _.intersection(
    cards.slice(k * 7, (k + 1) * 7),
    candidates
  );
  return a;
}

function obfuscateCards(cards, candidates) {
  var others = _.difference(cards, candidates);
  others = _.shuffle(others);
  candidates = _.shuffle(candidates);
  var parts = splitCardsTrio(candidates);
  cards = [];
  for (var i = 0; i < 3; i++) {
    var row = parts[i];
    var padLength = 7 - row.length;
    var pad = others.splice(0, padLength);
    row = _.shuffle(row.concat(pad));
    cards = cards.concat(row);
  }
  return cards;
}

function main() {

  var cards, candidates, k;
  addStyles(generateAllCardStyles() + generateCardStyles());

  function init() {
    cards = initCards();
    candidates = cards.slice();
  }

  function step() {
    cards = obfuscateCards(cards, candidates);
    buildCards(cards);
  }

  init();
  step();
  $('#step-button').click(function (ev) {
    if (ev.target.value === 'Replay') {
      init();
      step();
    } else {
      k = parseInt($('input[name=row]:checked').val());
      if (isNaN(k)) {
        alert('Please select a row!');
        return;
      }
      candidates = getCandidates(cards, candidates, k);
      if (candidates.length === 1) {
        resolveCard(candidates[0]);
      } else {
        step();
      }
    }
  });
}

_.mixin(s.exports());
$(document).ready(function () {
  main();
});
