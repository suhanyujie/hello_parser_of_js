const { NodeType } = require('./parser');
const yaml = require('js-yaml');

class Visitor {
    visitProg(node) { }

    visitSayHi(node) { }

    visitExprStmt(node) { }

    visitPrintStmt(node) { }

    visitStmt(node) {
        switch (node.type) {
            case NodeType.EXPR_STMT:
                return this.visitExprStmt(node);
            case NodeType.SAYHI:
                return this.visitSayHi(node);
            case NodeType.PRINT_STMT:
                return this.visitPrintStmt(node);
        }
    }

    visitStmtList(list) { }

    visitNumLiteral(node) { }

    visitBinaryExpr(node) { }

    visitExpr(node) {
        switch (node.type) {
            case NodeType.NUMBER:
                return this.visitNumLiteral(node);
            case NodeType.BINARY_EXPR:
                return this.visitBinaryExpr(node);
            case NodeType.EXPR_STMT:
                return this.visitExprStmt(node);
        }
    }
}

class InterpretVisitor extends Visitor {
    visitProg(node) {
        node.body.forEach(stmt => this.visitStmt(stmt));
    }

    visitSayHi(node) {
        console.log(`hi ${node.value}`);
    }

    visitExprStmt(node) {
        return {
            type: node.type,
            value: this.visitExpr(node.value)
        };
    }

    visitBinaryExpr(node) {
        const left = this.visitExpr(node.left);
        const op = node.op.type;
        const right = this.visitExpr(node.right);
        switch (op) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;
            case "**":
                return left ** right;
            default:
                throw new Error("unknow interpreter...");
        }
    }

    visitPrintStmt(node) {
        console.log(this.visitExpr(node.value));
    }

    visitNumLiteral(node) {
        return parseInt(node.value);
    }
}

class YamlVisitor extends Visitor {
    visitProg(node) {
        return yaml.dump({
            type: node.type,
            body: this.visitStmtList(node.body)
        });
    }

    visitStmtList(list) {
        return list.map(stmt => this.visitStmt(stmt));
    }

    visitExprStmt(node) {
        return {
            type: node.type,
            value: this.visitExpr(node.value)
        };
    }

    visitBinaryExpr(node) {
        return {
            type: node.type,
            op: node.op.type,
            left: this.visitExpr(node.left),
            right: this.visitExpr(node.right)
        };
    }

    visitNumLiteral(node) {
        return node.value;
    }

    visitSayHi(node) {
        return `${node.value}`;
    }
}

module.exports = {
    InterpretVisitor,
    YamlVisitor
};