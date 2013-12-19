
var format = require('./format')

var formatStackFrame = function(frameString) {
  return '    at ' + frameString
}

var callstack = function (ignoreFiles) {
  if(!ignoreFiles) ignoreFiles = []

  var error = new Error()
  Error.captureStackTrace(error, callstack)

  var getTracesPrepareStackTrace = function (error, traces) {
    return traces.filter(function(trace) {
      return (ignoreFiles.indexOf(trace.getFileName()) == -1) ? trace : null
    })
  }

  var cachedTraces = null
  var getTraces = function() {
    if(cachedTraces) return cachedTraces

    var originalPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = getTracesPrepareStackTrace;
    
    cachedTraces = error.stack

    Error.prepareStackTrace = originalPrepareStackTrace;

    return cachedTraces;
  }

  var printTraceArray = function() {
    var traces = getTraces()

    return traces.map(format.formatSourcePosition)
  }

  var printTraces = function() {
    return printTraceArray().map(formatStackFrame).join('\n') + '\n'
  }

  var trace = {
    getFullTraces: getTraces,
    printTraceArray: printTraceArray,
    printTraces: printTraces,

    toString: printTraces,
    inspect: printTraces,
    toJSON: printTraceArray,
  }

  return trace
}

module.exports = {
  callstack: callstack
}
