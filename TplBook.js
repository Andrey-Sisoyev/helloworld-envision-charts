$(document).ready(function () {

var
  V = envision;

// Custom data processor
function processData (options) {

  var
    resolution = options.resolution;

  options.preprocessor
    .bound(options.min, options.max)
    .subsampleMinMax(resolution + Math.round(resolution / 3));
}

function getDefaults () {
  return {
    heat : {
      name : 'envision-book-heat',
      config : {
        'lite-lines' : {
          lineWidth : 1,
          show : true,
          fill : true,
          fillOpacity : 0.2
        },
        mouse : {
          track: true,
          trackY: false,
          trackAll: true,
          sensibility: 1,
          trackDecimals: 4,
          position: 'ne'
        },
        yaxis : { 
          autoscale : true,
          autoscaleMargin : 0.05,
          noTicks : 4,
          showLabels : true,
          min : 0
        },
        grid : {
          verticalLines : true,
          horizontalLines : true,
          outlineWidth : 0,
          labelMargin : 0
        }
      },
      processData : processData
    },
    summary : {
      name : 'envision-book-summary',
      config : {
        'lite-lines' : {
          show : true,
          lineWidth : 1,
          fill : true,
          fillOpacity : 0.2,
          fillBorder : true
        },
        xaxis : {
          noTicks: 5,
          showLabels : true
        },
        yaxis : {
          autoscale : true,
          autoscaleMargin : 0.1
        },
        handles : {
          show : true
        },
        selection : {
          mode : 'x'
        },
        grid : {
          verticalLines : false
        }
      }
    },
    connection : {
      name : 'envision-book-connection',
      adapterConstructor : V.components.QuadraticDrawing
    }
  };
}

function TplBook (options) {

  var
    data = options.data,
    defaults = getDefaults(),
    vis = new V.Visualization({name : 'envision-book'}),
    selection = new V.Interaction(),
    hit = new V.Interaction(),
    heat, connection, summary;

  if (options.defaults) {
    defaults = Flotr.merge(options.defaults, defaults);
  }

  defaults.heat.data = data.heat;
  defaults.summary.data = data.summary;

  defaults.heat.config.mouse.trackFormatter = options.trackFormatter || function (o) {

    var
      index = o.index,
      value;

    if (heat.api.preprocessor) {
      index += heat.api.preprocessor.start;
    }

    value = 'Heat: ' + data.heat[1][index] + '° Word: ' + index;

    return value;
  };

  if (options.xTickFormatter) {
    defaults.summary.config.xaxis.tickFormatter = options.xTickFormatter;
  }

  defaults.heat.config.yaxis.tickFormatter = options.yTickFormatter || function (n) {
    return n + '°';
  };

  heat = new V.Component(defaults.heat);
  connection = new V.Component(defaults.connection);
  summary = new V.Component(defaults.summary);

  // Render visualization
  vis
    .add(heat)
    .add(connection)
    .add(summary)
    .render(options.container);

  // Define the selection zooming interaction
  selection
    .follower(heat)
    .follower(connection)
    .leader(summary)
    .add(V.actions.selection, options.selectionCallback ? { callback : options.selectionCallback } : null);

  // Define the mouseover hit interaction
  hit
    .group([heat])
    .add(V.actions.hit);

  // Optional initial selection
  if (options.selection) {
    summary.trigger('select', options.selection);
  }

  // Members
  this.vis = vis;
  this.selection = selection;
  this.hit = hit;
  this.heat = heat;
  
  this.summary = summary;
}

V.templates.TplBook = TplBook;

});
