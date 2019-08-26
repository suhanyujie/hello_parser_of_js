const {NodeType} = require('./parser');
const yaml = require('js-yaml');

class Visitor {
    visitProg(node){}

    visitSayHi(node){}
    
    visitExprStmt(node) {}

    visitStmt(node) {
        switch (node.type) {
            case NodeType.EXPR_STMT:
                return this.visitExprStmt(node);
            case NodeType.SAYHI:
                return this.visitSayHi(node);
        }
    }

    visitStmtList(list) {}

    visitNumLiteral(node) {}

    visitBinaryExpr(node) {}

    visitExpr(node) {
        switch (node.type) {
            case NodeType.NUMBER:
                return this.visitNumLiteral(node);
            case NodeType.BINARY_EXPR:
                return this.visitBinaryExpr(node);
        }
    }
}

class InterpretVisitor extends Visitor {
    visitProg(node) {
        node.body.forEach(stmt => this.visitSayHi(stmt));
    }
    visitSayHi(node) {
        console.log(`hi ${node.value}`);
    }
}

class YamlVisitor extends Visitor {
    visitProg(node) {
        return yaml.dump({
            type: node.type,
            body: this.visitStmtList(node.body)
        });
    }

    visitStmtList (list) {
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