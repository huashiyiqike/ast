import React from 'react';

// // 实现模块的按需加载

// // import {Button, Alert} from 'antd';
// // import Button from 'antd/lib/button';
// // import Alert from 'antd/lib/alert';
// // babel-plugin-import

// let babel = require('babel-core');
// let t = require('babel-types');

// let code = `import {Button, Alert} from 'antd';`;

// let importPlugin = {
//   visitor: {
//     ImportDeclaration(path) {
//       let { node } = path;
//       let source = node.source.value; // antd;
//       let specifiers = node.specifiers;
//       if (t.isImportDefaultSpecifier(specifiers[0])) {
//         specifiers = specifiers.map(specifier => {
//           return t.importDeclaration(
//             [t.importDefaultSpecifier(source)],
//             t.stringLiteral(`${source}/lib/${specifier.local.name.toLowerCase()}`)
//           )
//         });
//         path.replaceWithMultiple(specifiers);
//       }
//     }
//   }
// }
// let r = babel.transform(code, {
//   plugins: [
//     importPlugin
//   ]
// });
// console.log(r.code);