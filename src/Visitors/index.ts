import Identifier from './Identifier';
import ArrayExpression from './ArrayExpression';
import BinaryExpression from './BinaryExpression';
import CallExpression from './CallExpression';
import UnaryExpression from './UnaryExpression';
import ConditionalExpression from './ConditionalExpression';
import ExpressionStatement from './ExpressionStatement';
import Literal from './Literal';
import MemberExpression from './MemberExpression';
import SequenceExpression from './SequenceExpression';
import AssignmentExpression from './AssignmentExpression';

// List of all types of visitors
const index = {
    Identifier,
    ArrayExpression,
    BinaryExpression,
    CallExpression,
    UnaryExpression,
    ConditionalExpression,
    ExpressionStatement,
    Literal,
    MemberExpression,
    SequenceExpression,
    LogicalExpression: BinaryExpression,
    AssignmentExpression,
};

export default index;
