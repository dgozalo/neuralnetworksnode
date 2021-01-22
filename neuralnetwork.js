"use strict";
exports.__esModule = true;
var math = require("mathjs");
var show = function (varName) {
    varName = Array.isArray(varName) ? varName : [varName];
    var transf = varName.map(function (v) { return v + ": " + parser.get(v); });
    return transf.join(', ');
};
var calc = function (varName, expr, expanded) {
    var result = parser.evaluate(expr);
    console.log("Calculando " + varName + " = " + expr + " // " + expanded + " = " + result);
    parser.set(varName, result);
};
var parser = math.parser();
parser.set('theta1', -0.4);
parser.set('theta2', 0.2);
parser.set('theta3', -0.3);
parser.set('theta4', -0.3);
parser.set('w1', 0.2);
parser.set('w2', 1);
parser.set('w3', -0.3);
parser.set('w4', 0.3);
parser.set('w5', 0.3);
parser.set('w6', 1);
parser.set('w7', 0.2);
parser.set('w8', 0.4);
parser.set('x1', 0);
parser.set('x2', 1);
parser.set('y1', 0);
parser.set('y2', 0);
parser.set('alpha', 0.2);
var calculoNeuronas = function (iteracion) {
    console.log("Calculando valores de salida para iteracion " + iteracion + "\n");
    calc('Zn1', 'theta1 + w1 * x1 + w3 * x2', parser.get('theta1') + " + " + parser.get('w1') + " * " + parser.get('x1') + " + " + parser.get('w3') + " * " + parser.get('x2'));
    calc('Zn1', 'Zn1 < 0 ? 0 : 1', parser.get('Zn1') + " < 0 ? 0 : 1");
    calc('Zn2', 'theta2 + w2 * x1 + w4 * x2', parser.get('theta2') + " + " + parser.get('w2') + " * " + parser.get('x1') + " + " + parser.get('w4') + " * " + parser.get('x2'));
    calc('Zn2', 'Zn2 < 0 ? 0 : 1', parser.get('Zn2') + " < 0 ? 0 : 1");
    calc('Zn3', 'theta3 + w5 * Zn1 + w7 * Zn2', parser.get('theta3') + " + " + parser.get('w5') + " * " + parser.get('Zn1') + " + " + parser.get('w7') + " * " + parser.get('Zn2'));
    calc('Zn3', 'Zn3 < 0 ? 0 : 1', parser.get('Zn3') + " < 0 ? 0 : 1");
    calc('Zn4', 'theta4 + w6 * Zn1 + w8 * Zn2', parser.get('theta4') + " + " + parser.get('w6') + " * " + parser.get('Zn1') + " + " + parser.get('w8') + " * " + parser.get('Zn2'));
    calc('Zn4', 'Zn4 < 0 ? 0 : 1', parser.get('Zn4') + " < 0 ? 0 : 1");
    console.log('\n');
    console.log("Valores de las salidas " + show(['Zn1', 'Zn2', 'Zn3', 'Zn4']) + "\n");
};
var recalcularValores = function () {
    console.log('Calculando errores...\n');
    calc('eN3', 'y1 - Zn3', parser.get('y1') + " - " + parser.get('Zn3'));
    calc('eN4', 'y2 - Zn4', parser.get('y2') + " - " + parser.get('Zn4'));
    console.log('Capa oculta \n');
    calc('eN1', 'w5 * eN3 + w6 * eN4', parser.get('w5') + " * " + parser.get('eN3') + " + " + parser.get('w6') + " * " + parser.get('eN4'));
    calc('eN2', 'w7 * eN3 + w8 * eN4', parser.get('w7') + " * " + parser.get('eN3') + " + " + parser.get('w8') + " * " + parser.get('eN4'));
    console.log("Errores " + show(['eN1', 'eN2', 'eN3', 'eN4']) + "\n");
    console.log('Ajustes de pesos de salida\n');
    calc('w5', 'w5 + (eN3 * alpha * Zn1)', parser.get('w5') + " + (" + parser.get('eN3') + " * " + parser.get('alpha') + " * " + parser.get('Zn1') + ")");
    calc('w6', 'w6 + (eN4 * alpha * Zn1)', parser.get('w6') + " + (" + parser.get('eN4') + " * " + parser.get('alpha') + " * " + parser.get('Zn1') + ")");
    calc('w7', 'w7 + (eN3 * alpha * Zn2)', parser.get('w7') + " + (" + parser.get('eN3') + " * " + parser.get('alpha') + " * " + parser.get('Zn2') + ")");
    calc('w8', 'w8 + (eN4 * alpha * Zn2)', parser.get('w8') + " + (" + parser.get('eN4') + " * " + parser.get('alpha') + " * " + parser.get('Zn2') + ")");
    console.log("Resultado de pesos de salida: " + show(['w5', 'w6', 'w7', 'w8']) + "\n");
    console.log('Ajustes de pesos en capa oculta\n');
    calc('w1', 'w1 + (eN1 * alpha * x1)', parser.get('w1') + " + (" + parser.get('eN1') + " * " + parser.get('alpha') + " * " + parser.get('x1') + ")");
    calc('w2', 'w2 + (eN2 * alpha * x1)', parser.get('w2') + " + (" + parser.get('eN2') + " * " + parser.get('alpha') + " * " + parser.get('x1') + ")");
    calc('w3', 'w3 + (eN1 * alpha * x2)', parser.get('w3') + " + (" + parser.get('eN1') + " * " + parser.get('alpha') + " * " + parser.get('x2') + ")");
    calc('w4', 'w4 + (eN2 * alpha * x2)', parser.get('w4') + " + (" + parser.get('eN2') + " * " + parser.get('alpha') + " * " + parser.get('x2') + ")");
    console.log("Resultado de pesos de capa oculta: " + show(['w1', 'w2', 'w3', 'w4']) + "\n");
    console.log('Ajustes de sesgos\n');
    calc('theta1', 'theta1 + ( eN1 * alpha)', parser.get('theta1') + " + (" + parser.get('eN1') + " * " + parser.get('alpha') + ")");
    calc('theta2', 'theta2 + ( eN2 * alpha)', parser.get('theta2') + " + (" + parser.get('eN2') + " * " + parser.get('alpha') + ")");
    calc('theta3', 'theta3 + ( eN3 * alpha)', parser.get('theta3') + " + (" + parser.get('eN3') + " * " + parser.get('alpha') + ")");
    calc('theta4', 'theta4 + ( eN4 * alpha)', parser.get('theta4') + " + (" + parser.get('eN4') + " * " + parser.get('alpha') + ")");
    console.log("Resultado rec\u00E1lculo de sesgos: " + show(['theta1', 'theta2', 'theta3', 'theta4']) + "\n");
};
var iteracion = 1;
do {
    if (iteracion > 1) {
        recalcularValores();
    }
    calculoNeuronas(iteracion);
    iteracion++;
} while (parser.get('y1') !== parser.get('Zn3') || parser.get('y2') !== parser.get('Zn4'));
console.log(parser.getAll());
//# sourceMappingURL=neuralnetwork.js.map