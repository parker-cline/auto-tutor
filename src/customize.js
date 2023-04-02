/* Customize Page */
import React, { useState } from 'react';
import { addStyles, EditableMathField, StaticMathField } from 'react18-mathquill';
import { useNavigate } from 'react-router-dom';
import FunctionPlot from './components/functionPlot.js';

addStyles(); // needed for MathQuill

const convertToString = (value) => {
    // helper function: converts a number to a string, or returns an empty string if the value is NaN
    const convertedString = value.toString();
    if (isNaN(convertedString)) {
        return '';
    }
    return convertedString;
}

function FunctionTypeSetter({ functionType, setFunctionType, checked }) {
    // contains a radio button and label for selecting a function type (either linear or quadratic)
    return (
        <>
            <input className="btn-check" type="radio" id={functionType} name="functionType" value={functionType} checked={checked} onChange={(e) => setFunctionType(e.target.value)} />
            <label htmlFor={functionType} className="btn btn-success">{functionType.charAt(0).toUpperCase() + functionType.slice(1)}</label>
        </>
    )
}

function ChecklistItem({ testFunc, itemDescription }) {
    // contains a list item with a checkmark if the test function returns true 
    // and itemDescription, a description of the criterion that the test function checks
    return (
        <li className="list-group-item" style={testFunc() ? { 'color': 'black' } : { 'color': 'red' }}>
            {itemDescription} {testFunc() && <span className="badge bg-success">✓</span>}
        </li>
    );
}

function CoefficientSetter({ coeff, setCoeff, label }) {
    // contains a label and a MathQuill text field for setting a coefficient of a function
    return (
        <>
            <StaticMathField>{label}</StaticMathField>
            <EditableMathField
                latex={convertToString(coeff)}
                onChange={(mathField) => {
                    setCoeff(parseInt(mathField.latex()))
                }} />
        </>
    );
}

function BoundsSetter({ bounds, setBounds, label }) {
    // contains a label and a MathQuill text field for setting the bounds (either x or y) of a function
    return (
        <>
            <EditableMathField
                latex={convertToString(bounds[0])}
                onChange={(mathField) => {
                    setBounds([parseInt(mathField.latex()), bounds[1]])
                }} />
            <StaticMathField>{'\u2264 ' + label + ' \u2264'}</StaticMathField>
            <EditableMathField
                latex={convertToString(bounds[1])}
                onChange={(mathField) => {
                    setBounds([bounds[0], parseInt(mathField.latex())])
                }} />
        </>
    );
}

function Customize() {
    // a, b, and c are coefficients
    const [a, setA] = useState(-1);
    const [b, setB] = useState(1);
    const [c, setC] = useState(3);
    const [functionType, setFunctionType] = useState('quadratic'); // either linear or quadratic
    const [xBounds, setXBounds] = useState([-5, 5])
    const [yBounds, setYBounds] = useState([-5, 5])
    const [studentName, setStudentName] = useState('TestName');

    const roundToTwoPlaces = (value) => {
        return Math.round(value * 100) / 100;
    }

    // helper functions for checking if criteria for Checklist is met.

    const getQuadraticXIntercepts = () => {
        const firstRoot = (-1 * b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        const secondRoot = (-1 * b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        return [roundToTwoPlaces(firstRoot), roundToTwoPlaces(secondRoot)]
    }

    const getLinearXIntercepts = () => {
        const xIntercept = -1 * b / a;
        return [roundToTwoPlaces(xIntercept)];
    }

    const checkXInterceptPositive = () => {
        if (functionType === 'linear') {
            return getLinearXIntercepts()[0] > 0;
        } else {
            return getQuadraticXIntercepts()[0] > 0 || getQuadraticXIntercepts()[1] > 0;
        }
    }

    const checkXInterceptBounds = () => {
        if (functionType === 'linear') {
            const xIntercepts = getLinearXIntercepts();
            return (xIntercepts[0] >= xBounds[0] && xIntercepts[0] <= xBounds[1]);
        } else {
            const xIntercepts = getQuadraticXIntercepts();
            return (xIntercepts[0] >= xBounds[0] && xIntercepts[0] <= xBounds[1] && xIntercepts[1] >= xBounds[0] && xIntercepts[1] <= xBounds[1]);
        }
    }

    const checkYInterceptBounds = () => {
        const constantTerm = (functionType === 'quadratic' ? parseInt(c) : parseInt(b));
        const lowerBound = yBounds[0];
        const upperBound = yBounds[1];
        return (constantTerm >= lowerBound && constantTerm <= upperBound);
    }

    const checkHeight = () => {
        return (functionType === 'linear' ? b > 0 : c > 0);
    }

    const checkAllFieldsFilled = () => {
        if (functionType === 'quadratic' && isNaN(c)) {
            return false;
        }
        return !(isNaN(a) || isNaN(b) || isNaN(c) || isNaN(xBounds[0]) || isNaN(xBounds[1]) || isNaN(yBounds[0]) || isNaN(yBounds[1]) || (studentName === ''));
    }

    const checkXInterceptNegative = () => {
        if (functionType === 'linear') {
            return true;
        } else {
            return getQuadraticXIntercepts()[0] < 0 || getQuadraticXIntercepts()[1] < 0;
        }
    }

    const checkNonZeroTerm = () => {
        return (a !== 0);
    }

    const isValidSetup = () => {
        return (checkXInterceptPositive() && checkXInterceptBounds() && checkHeight() && checkYInterceptBounds() && checkAllFieldsFilled() && checkXInterceptNegative() && checkNonZeroTerm());
    }

    const setQuadraticFunctionString = (a, b, c) => {
        // returns a string representation of the quadratic function "ax^2 + bx + c", given coefficients as numbers

        // check if coefficients are defined
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            return '';
        }
    
        let functionString = '';

        // first term
        if (a === 1) {
            functionString = 'x^2';
        } else if (a === -1) {
            functionString = '-x^2';
        } else if (a !== 0) {
            functionString = `${a}x^2`;
        }

        // second term
        if (b === 1) {
            functionString += ' + x';
        } else if (b === -1) {
            functionString += ' - x';
        } else if (b > 0) {
            functionString += ` + ${b}x`;
        } else if (b < 0) {
            functionString += ` - ${Math.abs(b)}x`;
        }

        // third term
        if (c > 0) {
            functionString += ` + ${c}`;
        } else if (c < 0) {
            functionString += ` - ${Math.abs(c)}`;
        }

        return functionString;
    }

    const setLinearFunctionString = (a, b) => {
        // returns a string representation of the linear function "ax + b" given coefficients as numbers

        // check if coefficients are defined
        if (isNaN(a) || isNaN(b)) {
            return '';
        }

        let functionString = '';
        // first term
        if (a === 1) {
            functionString = 'x';
        }
        else if (a === -1) {
            functionString = '-x';
        }
        else if (a !== 0) {
            functionString = `${a}x`;
        }
        // second term
        if (b > 0) {
            functionString += ` + ${b}`;
        }
        else if (b < 0) {
            functionString += ` - ${Math.abs(b)}`;
        }
        return functionString;
    }

    const navigate = useNavigate();
    const handleStartLesson = () => {
        const functionString = functionType === 'quadratic' ? setQuadraticFunctionString(a, b, c) : setLinearFunctionString(a, b);
        const xIntercepts = functionType === 'quadratic' ? getQuadraticXIntercepts() : getLinearXIntercepts();
        // moves to the lesson page, passing details about the function and the student in a state object (accessed as "lessonInfo" later).
        navigate('/lesson', { state: { functionType: functionType, studentName: studentName, functionString: functionString, xBounds: xBounds, yBounds: yBounds, xIntercepts: xIntercepts } });
    }
    const highestFunctionTerm = functionType === 'quadratic' ? 'x^2' : 'x';

    return (
        <>
            <div className="function-selector-screen container p-3">
                <div className="row">
                    <div className="col-sm-4">

                        <h3>Choose the type of equation</h3>
                        <FunctionTypeSetter functionType="linear" selectedFunctionType={functionType === 'linear'} setFunctionType={setFunctionType} />
                        <FunctionTypeSetter functionType="quadratic" checked={functionType === 'quadratic'} setFunctionType={setFunctionType} />

                        <h3>Enter the equation you want to plot</h3>
                        <CoefficientSetter coeff={a} setCoeff={setA} label={'f(x) ='} />
                        <CoefficientSetter coeff={b} setCoeff={setB} label={functionType === 'quadratic' ? 'x^2 +' : 'x +'} />
                        {functionType === 'quadratic' && <CoefficientSetter coeff={c} setCoeff={setC} label={'x +'} />}
                        <h3>Enter the <StaticMathField>x</StaticMathField>-bounds</h3>
                        <BoundsSetter bounds={xBounds} setBounds={setXBounds} label={'x'} />
                        <h3>Enter the <StaticMathField>y</StaticMathField>-bounds</h3>
                        <BoundsSetter bounds={yBounds} setBounds={setYBounds} label={'y'} />
                        <h3>Enter the student's name</h3>
                        <input type="text" className="form-control" value={studentName} onChange={e => setStudentName(e.target.value)} />
                    </div>

                    <div className="col-sm-4">
                        <FunctionPlot functionString={functionType === 'quadratic' ? setQuadraticFunctionString(a, b, c) : setLinearFunctionString(a, b)} xBounds={xBounds} yBounds={yBounds} factor={3.5} />
                    </div>

                    <div className="col-sm-4">
                        <h2>Checklist</h2>
                        <ul className="list-group">
                            <h4>Function</h4>
                            <ChecklistItem itemDescription={<StaticMathField>f(0) > 0</StaticMathField>} testFunc={checkHeight} />
                            <ChecklistItem itemDescription='There is some x-intercept with an x-value greater than 0' testFunc={checkXInterceptPositive} />
                            {functionType === 'quadratic' && <ChecklistItem itemDescription='There is some x-intercept with an x-value less than 0' testFunc={checkXInterceptNegative} />}
                            <ChecklistItem itemDescription={'The ' + highestFunctionTerm + ' term is non-zero'} testFunc={checkNonZeroTerm} />
                            <h4>Bounds</h4>
                            <ChecklistItem itemDescription='The x-intercept(s) are visible within the selected x-bounds' testFunc={checkXInterceptBounds} />
                            <ChecklistItem itemDescription='The y-intercept is visible within the selected y-bounds' testFunc={checkYInterceptBounds} />
                            <h4>Final Check</h4>
                            <ChecklistItem itemDescription='All fields are filled' testFunc={checkAllFieldsFilled} />
                        </ul>
                        <button className="btn btn-primary" onClick={handleStartLesson} disabled={!isValidSetup()}>Start Lesson</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Customize;