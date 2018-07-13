// 直接用babel实现
// babel-core, 转化

// 改ast, babel-types

let babel = require('babel-core');
// 1. 生成ast
// 2.判断是不是某个东西
let t = require('babel-types');


let code = `let sum = (a,b)=>a+b`
// .babelrc
let ArrowPlugin = {
  visitor: {
    ArrowFunctionExpression(path) {
      let node = path.node;
      let { params, body } = node;
      if (!t.isBlockStatement(body)) {
        let returnStatement = t.returnStatement(body);
        body = t.blockStatement([]);
      }
      // 生成一个函数表达式
      let funcs = t.functionExpression(null, params, body, false, false);
      path.replaceWith(funcs);
    }    
  }
}
let r = babel.transform(code, {
  plugins: [
    ArrowPlugin
  ]
})
console.log(r.code);