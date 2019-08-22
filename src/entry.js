const {Source, EOL} = require("./source");
const {Lexer, TokenType} = require("./lexer");
const {Parser} = require('./parser');
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
console.log(util.inspect(ast, true, null));
