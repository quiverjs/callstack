
'use strict'

var callstack = require('../lib/callstack').callstack

var stack = callstack()

console.log(stack.printTraces())