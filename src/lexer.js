const { EOL, EOF } = require('./source');
const assert = require('assert').strict;

class Lexer {
    constructor(src) {
        this.src = src;
    }

    next() {
        this.skipWhitespace();
        const ch = this.src.peek();
        // console.log(`current char is [${ch}] type is:${typeof(ch)} is op:${ch>"0" && ch <= "9"}\n`);
        if (ch === '"') return this.readString();
        if (ch === 'h') return this.readHi();
        if (Lexer.isDigit(ch)) return this.readNumber();
        if (Lexer.isOp(ch)) return this.readOp();
        if (ch === EOF) return new Token(TokenType.EOF);
        throw new Error(this.makeErrMsg());
    }

    skipWhitespace() {
        while (true) {
            let ch = this.src.peek();
            if (ch === " " || ch === "\t" || ch === EOL) {
                this.src.read();
                continue;
            }
            break;
        }
    }

    readString() {
        const tok = new Token(TokenType.STRING);
        tok.loc.start = this.src.getPos();
        this.src.read();
        const v = [];
        while (true) {
            let ch = this.src.read();
            if (ch === '"') break;
            else if (ch === EOF) throw new Error(this.makeErrMsg());
            v.push(ch);
        }
        tok.loc.end = this.src.getPos();
        tok.value = v.join("");
        return tok;
    }

    readHi() {
        const tok = new Token(TokenType.HI);
        tok.loc.start = this.src.getPos();
        const hi = this.src.read(2);
        assert.ok(hi === "hi", this.makeErrMsg());
        tok.loc.end = this.src.getPos();
        tok.value = "hi";
        return tok;
    }

    readNumber() {
        const tok = new Token(TokenType.NUMBER);
        tok.loc.start = this.getPos();
        const v = [this.src.read()];
        while (true) {
            let ch = this.src.peek();
            if (Lexer.isDigit(ch)) {
                v.push(this.src.read());
                continue;
            }
            break;
        }
        tok.loc.end = this.getPos();
        tok.value = v.join("");
        return tok;
    }

    readOp() {
        const tok = new Token();
        tok.loc.start = this.getPos();
        tok.type = this.src.read();
        tok.loc.end = this.getPos();
        return tok;
    }

    makeErrMsg() {
        return `Unexpected char at line:${this.src.line} column:${this.src.col}`;
    }

    peek() {
        this.src.pushPos();
        const tok = this.next();
        this.src.restorePos();
        return tok;
    }

    getPos() {
        return this.src.getPos();
    }

    static isDigit(ch) {
        return ch >= "0" && ch <= "9";
    }

    static isOp(ch) {
        return ['+', '-', '*', '/'].indexOf(ch) !== -1;
    }
}

class SourceLoc {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

class Token {
    constructor(type, value, loc) {
        this.type = type;
        this.value = value;
        this.loc = loc || new SourceLoc();
    }
}

class TokenType { }

TokenType.EOF = "eof";
TokenType.HI = "hi";
TokenType.STRING = "string";

TokenType.NUMBER = "number";
TokenType.MUL = "*";
TokenType.DIV = "/";
TokenType.ADD = "+";
TokenType.SUB = "-";

module.exports = {
    Lexer,
    SourceLoc,
    Token,
    TokenType
};