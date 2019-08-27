const {Source, EOL} = require("./source");
const {Lexer, TokenType} = require("./lexer");
const {Parser} = require('./parser');
const {InterpretVisitor, YamlVisitor} = require('./interpreter');
const util = require('util');
const fs = require('fs');

const code = fs.readFileSync('./data/input.txt').toString();
const src = new Source(code);
const lexer = new Lexer(src);
const parser = new Parser(lexer);

// while(true) {
//     const tok = lexer.next();
//     if (TokenType.type === TokenType.EOF) break;
//     console.log(tok);
// }

const ast = parser.parseProg();
console.log(ast);
// console.log(util.inspect(ast, true, null));

const interpreter = new InterpretVisitor();
interpreter.visitProg(ast);

// const ymlVisitor = new YamlVisitor();
// 打印成 yaml 格式
// console.log(ymlVisitor.visitProg(ast));
