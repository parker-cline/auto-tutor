/* Customize Page */
import React, { useState } from 'react';
import { addStyles, EditableMathField, StaticMathField } from 'react18-mathquill';
import { useNavigate } from 'react-router-dom';
import FunctionPlot from './components/functionPlot.js';

addStyles(); // needed for MathQuill

function FunctionTypeSetter({ functionType, setFunctionType, checked }) {
    return (
        <>
            <input className="btn-check" type="radio" id={functionType} name="functionType" value={functionType} checked={checked} onChange={(e) => setFunctionType(e.target.value)} />
            <label htmlFor={functionType} className="btn btn-success">{functionType.charAt(0).toUpperCase() + functionType.slice(1)}</label>
        </>
    )
}

function ChecklistItem({ testFunc, itemDescription }) {
    return (
        <li className="list-group-item" style={testFunc() ? { 'color': 'black' } : { 'color': 'red' }}>
            {itemDescription} {testFunc() && <span className="badge bg-success">✓</span>}
        </li>
    );

}
function CoefficientSetter({ coeff, setCoeff, label }) {

    const convertToString = (value) => {
        const convertedString = value.toString();
        if (isNaN(convertedString)) {
            return '';
        }
        return convertedString;
    }

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
    const convertToString = (value) => {
        const convertedString = value.toString();
        if (isNaN(convertedString)) {
            return '';
        }
        return convertedString;
    }
    return (
        <>
            <h1>Enter the <StaticMathField>{label}</StaticMathField>-bounds</h1>
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
    const [a, setA] = useState(-1);
    const [b, setB] = useState(1);
    const [c, setC] = useState(1);
    const [functionType, setFunctionType] = useState('quadratic');
    const [xBounds, setXBounds] = useState([-5, 5])
    const [yBounds, setYBounds] = useState([-5, 5])
    const [studentName, setStudentName] = useState('TestName');

    const roundToTwoPlaces = (value) => {
        return Math.round(value * 100) / 100;
    }
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
        if (functionType === 'quadratic' && c === '') {
            return false;
        }
        return (a !== '' && b !== '' && studentName !== '' && xBounds[0] !== '' && xBounds[1] !== '' && yBounds[0] !== '' && yBounds[1] !== '');
    }

    const checkNonZeroTerm = () => {
        return (a !== 0);
    }

    const isValidSetup = () => {
        return (checkXInterceptPositive() && checkXInterceptBounds() && checkHeight() && checkYInterceptBounds() && checkAllFieldsFilled());
    }

    const navigate = useNavigate();
    const handleStartLesson = () => {
        const functionString = functionType === 'quadratic' ? `${a}x^2 + ${b}x + ${c}` : `${a}x + ${b}`;
        const xIntercepts = functionType === 'quadratic' ? getQuadraticXIntercepts() : getLinearXIntercepts();
        navigate('/lesson', { state: { functionType: functionType, studentName: studentName, functionString: functionString, xBounds: xBounds, yBounds: yBounds, xIntercepts: xIntercepts } });
    }
    const highestFunctionTerm = functionType === 'quadratic' ? 'x^2' : 'x';

    return (
        <>
            <div className="function-selector-screen container p-3">
                <div className="row">
                    <div className="col-sm-4">

                        <h1>Choose the type of equation</h1>
                        <FunctionTypeSetter functionType="linear" selectedFunctionType={functionType === 'linear'} setFunctionType={setFunctionType} />
                        <FunctionTypeSetter functionType="quadratic" checked={functionType === 'quadratic'} setFunctionType={setFunctionType} />

                        <h1>Enter the equation you want to plot</h1>
                        <CoefficientSetter coeff={a} setCoeff={setA} label={'f(x) ='} />
                        <CoefficientSetter coeff={b} setCoeff={setB} label={functionType === 'quadratic' ? 'x^2 +' : 'x +'} />
                        {functionType === 'quadratic' && <CoefficientSetter coeff={c} setCoeff={setC} label={'x +'} />}
                        <BoundsSetter bounds={xBounds} setBounds={setXBounds} label={'x'} />
                        <BoundsSetter bounds={yBounds} setBounds={setYBounds} label={'y'} />
                        <h1>Enter the student's name</h1>
                        <input type="text" className="form-control" value={studentName} onChange={e => setStudentName(e.target.value)} />
                    </div>

                    <div className="col-sm-4">
                        <FunctionPlot functionString={functionType === 'quadratic' ? `${a}x^2 + ${b}x + ${c}` : `${a}x + ${b}`} xBounds={xBounds} yBounds={yBounds} factor={3.5} />
                    </div>

                    <div className="col-sm-4">
                        <h3>Checklist</h3>
                        <ul className="list-group">
                            <ChecklistItem itemDescription={<StaticMathField>f(0) > 0</StaticMathField>} testFunc={checkHeight} />
                            <ChecklistItem itemDescription='There is some x-intercept with an x-value greater than 0' testFunc={checkXInterceptPositive} />
                            <ChecklistItem itemDescription='The x-intercept(s) are visible within the selected x-bounds' testFunc={checkXInterceptBounds} />
                            <ChecklistItem itemDescription='The y-intercept is visible within the selected y-bounds' testFunc={checkYInterceptBounds} />
                            <ChecklistItem itemDescription={'The ' + highestFunctionTerm + ' term is non-zero'} testFunc={checkNonZeroTerm} />
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