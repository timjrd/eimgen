"use strict";

var CONSTANT_PROBA = 20/100;
var OPERATOR_PROBA = 60/100;
var VARIABLE_PROBA = 20/100;

var CONSTANT_LIST_PROBA = 10/100;

var RANDOM_CONSTANT_RANGE = [-10,10];
var VARIABLE_COUNT = 2; // x, y [, t]
var MIN_DEPTH = 3;
var MAX_DEPTH = 8;


function generate()
{
    return generate_(0);
}

function generate_(depth)
{
    if (depth < MIN_DEPTH)
    {
        return randomOperatorNode(depth);
    }
    else
    {
        var r;
        if (depth == MAX_DEPTH)
            r = random(0, CONSTANT_PROBA + VARIABLE_PROBA);
        else
            r = Math.random();
        
        if (r < CONSTANT_PROBA)
        {
            return randomConstantNode();
        }
        else if (r < CONSTANT_PROBA + VARIABLE_PROBA)
        {
            return randomVariableNode();
        }
        else
        {
            return randomOperatorNode(depth);
        }
    }
}

function randomOperatorNode(depth)
{
    var node = emptyNode();

    node.operator = randomElement(OPERATORS);
    node.leftOperand = generate_(depth + 1);

    if (node.operator.argc == 2)
        node.rightOperand = generate_(depth + 1);

    return node;
}

function randomConstantNode()
{
    var node = emptyNode();

    if (Math.random() < CONSTANT_LIST_PROBA)
    {
        node.specialConstant = randomElement(CONSTANTS);
        node.constantValue = node.specialConstant.value;
    }
    else
    {
        node.constantValue = random(RANDOM_CONSTANT_RANGE[0], RANDOM_CONSTANT_RANGE[1]);
    }

    return node;
}

function randomVariableNode()
{
    var node = emptyNode();
    node.variableIndex = randomInt(0, VARIABLE_COUNT);
    return node;
}
