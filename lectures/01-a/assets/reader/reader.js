

var cards;
var candidates;

  function addStyles(cssRules) {
      $('head').append('<style>' + cssRules + '</style>');
  }



function generateAllCardStyles() {
    var style = '', row, col;
    for (var i = 0; i < 52; i++) {
        row = i / 13 >> 0;
        col = i % 13;
        style += _.sprintf('.card-%d { background-position: -%dpx -%dpx; }',
          i, 79*col, 123*row);
    }
    return style;
}


function generateCardStyles() {
    var style = '';
    for (var row = 0; row < 7; row++) {
        for (var col = 0; col < 3; col++) {
         style += _.sprintf('#card-row%d-col%d { left: -%dpx; right: -%dpx; }',
           row, col, (col * 102) + Math.floor(Math.random() * 3) * 4, row * 60);
        }
    }
    return style;
}

  function buildCards(cards) {
    var k;
   for (var row = 0; row < 7; row++) {
    for (var col = 0; col < 3; col++) {
     k = col * 7 + row;
     card = '<div class="card card-%d" id="card-row%d-col%d"></div>' % (cards[k], row, col)
     ';
     $('#cards').append(card);
    }
   }

  /*



def produce_content( card_idxs, selected ):
    content = {}
    content["styles"] = gen_style1()+gen_style2()
    content["hiddens"] = gen_hiddens(card_idxs, selected)
    if len(selected) == 1:
        content["cards"] = '<div class="card card%d" id="r3_c1"></div>' % selected[0]
        content["action"] = '<a href="magic.2.py">Replay</a>'
        content["styles"] += '''<style>
#col_selection{
    display:none;
}
</style>'''
    else:
        content["cards"] = gen_cards( card_idxs )
        content["action"] = '<input type="submit" value="Read My Card">'
    return content

def produce_html( content ):
    template = init_template( "template.2.html" )
    html = expand_template( template, content )
    print 'Content-Type: text/html\n'
    print html

def split_n( a_list, n ):
    results = [ list([]) for i in range(n) ]
    i = 0
    for an_item in a_list:
        results[i].append( an_item )
        i += 1
        if i == n:
            i = 0
    return results

def init_cards():
    all_cards = range(0,52) # 0-51
    random.shuffle( all_cards )
    card_idxs = all_cards[:21] # take the first 21
    return card_idxs

def get_user_input():
    form = cgi.FieldStorage()
    if "column" in form: #user has given some input
        column = int(form.getfirst("column"))
        card_idxs = [ int(i)  for i in form.getlist("card_idxs") ]
        prev_probable_cards = [ int(i)  for i in form.getlist("probable_cards") ]
    else:
        column = -1
        card_idxs = init_cards()
        prev_probable_cards = []
    return column, card_idxs, prev_probable_cards


function obfuscate_cards( cards,  ):
   ignored_cards = list( set( card_idxs ) - set( probable_cards ) )
   random.shuffle( ignored_cards )
   random.shuffle( probable_cards )
   cards_3cols = split_n( probable_cards, 3 )
   card_idxs = []

def obfuscate_cards( card_idxs, probable_cards ):
    ignored_cards = list( set( card_idxs ) - set( probable_cards ) )
    random.shuffle( ignored_cards )
    random.shuffle( probable_cards )
    cards_3cols = split_n( probable_cards, 3 )
    card_idxs = []
    for i in range(3):
        paddings = 7 - len( cards_3cols[i] ) # padding from ignored cards
        cards_3cols[i].extend( [ ignored_cards.pop() for j in range(paddings) ] )
        random.shuffle( cards_3cols[i] )
        card_idxs.extend( cards_3cols[i] )
    return card_idxs, probable_cards

def main():
    column, card_idxs, prev_probable_cards = get_user_input()
    if column == -1: # first step
        probable_cards = list(card_idxs)
    else: # subsequent steps
        current_probable_cards = set( card_idxs[column*7:(column+1)*7] )
        prev_probable_cards = set( prev_probable_cards )
        probable_cards = list( current_probable_cards & prev_probable_cards )
    card_idxs, probable_cards = obfuscate_cards( card_idxs, probable_cards )
    content = produce_content( card_idxs, probable_cards )
    produce_html( content )

main()*/