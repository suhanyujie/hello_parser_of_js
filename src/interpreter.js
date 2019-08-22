class Visitor {
    visitProg(node){}
    visitSayHi(node){}
}

class InterpretVisitor extends Visitor {
    visitProg(node) {
        node.body.forEach(stmt => this.visitSayHi(stmt));
    }
    visitSayHi(node) {
        console.log(`hi ${node.value}`);
    }
}

module.exports = {
    InterpretVisitor
};