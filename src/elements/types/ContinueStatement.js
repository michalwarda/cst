import Statement from '../Statement';

export default class ContinueStatement extends Statement {

    // TODO: Requires a loop.
    // TODO: In case of a label, requires label.

    constructor(childNodes) {
        super('ContinueStatement', childNodes);
    }

    _acceptChildren(children) {
        children.passToken('Keyword', 'continue');

        let label = null;
        if (!children.isEnd) {
            children.skipSameLineNonCode();

            if (children.isNode('Identifier')) {
                label = children.passNode('Identifier');
                children.skipNonCode();
                children.skipSemicolon();

            } else if (children.isToken('Punctuator', ';')) {
                children.passToken();

            } else {
                children.passToken();
                children.skipSemicolon();
            }
        }

        children.assertEnd();

        this.label = label;
    }
}
