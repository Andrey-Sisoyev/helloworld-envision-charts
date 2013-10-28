$(document).ready(function() {

  var
    V = envision,
    container = document.getElementById('demo'),
    options, vis;

  options = {
    container : container,
    data : {
      heat : bookData.heat,
      summary : bookData.heat
    },
    trackFormatter : function (o) {

      var value = 'Heat: ' + parseFloat(o.y) + '° Word: ' + parseInt(o.x);

      return value;
    },
    xTickFormatter : function (index) {
      return index + '';
    },
    yTickFormatter: function (n) {
        if(n - Math.floor(n) < 0.0001)
            return Math.floor(n) + '°';
        else return '';
    },
    // An initial selection
    selection: {
      data : {
        x : {
          min : 5,
          max : 25
        }
      }
    }
  };

  vis = new envision.templates.TplBook(options);
});
