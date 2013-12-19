
'use strict'

var callstack = require('../lib/callstack').callstack

var stack = callstack([__filename])

console.log(stack.printTraceArray())