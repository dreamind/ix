ix.launch = function () {
  ix.bases.schedule = {
    lms: 'https://app.lms.unimelb.edu.au/bbcswebdav/courses/INFO20002_2015_SM1/slides/',
    gsheet: 'https://docs.google.com/spreadsheet/ccc?',
    gsite: 'https://sites.google.com/site/gssheet/'
  };
  $('a').each(function (i, node) {
    var base = node.getAttribute('base');
    if (base) {
      var href = node.getAttribute('href');
      node.setAttribute('href', ix.bases.schedule[base] + href);
    }
  });
}