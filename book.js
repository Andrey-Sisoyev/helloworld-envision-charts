var bookData = 
    {"heat":
        [ [0.99, 1, 9.99,10,14.99,15,19.99,20,24.99,25,29.99,30, 200]
        , [0, 1, 1, 2, 2, 5, 5, 6, 6, 2, 2, 0, 0]
        ]
    , "maxPos": 200
    }

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
