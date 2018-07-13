let esprima = require('esprima');
let estraverse = require('estraverse');
let code = `function ast(){}`;
let tree = esprima.parseScript(code);

estraverse.traverse(tree, {
  enter(node) {
    if (node.type === 'Identifier') {
      node.name = 'abc';
    }
    console.log(node.type);
  },
  leave(node){
    console.log('leave', node.type);
  }
})

let escodegen = require('escodegen');
let r = escodegen.generate(tree);
console.log(r)