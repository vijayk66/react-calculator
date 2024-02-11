import { useRef, useState } from "react";
import Button from "./Components/button";


function App() {

    const prev_result = useRef(0);
    const [input, setInput] = useState("");
    const [offCalculator, setOffCalculator] = useState(false);


    const _handleInputChange = (value) => {

        const allowed_values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", ""];
        if (allowed_values.includes(value.slice(-1))) {
            setInput(value);
        };

    };

    const _handleOnClick = (btn) => {

        if (btn === "Off") {
            setOffCalculator(true);
        } else if (btn === "On") {
            setOffCalculator(false);
            setInput("");
            prev_result.current = 0;
        };

        if (btn === "CE") {
            setInput("");
        };

        if (btn === "C") {
            setInput("");
            prev_result.current = 0;
        }

        if (btn == "❌") {
            setInput((prev) => prev.slice(0, -1))
        };

    };


    const _handleDigitClick = (value) => {

        let not_initial_values = ["+", "-", "*", "/", "%"];
        const is_invalid = value === 0 && input === "" ||
            value === "." && input.includes(".") ||
            input.length > 20 ||
            input.length === 0 && not_initial_values.includes(value) ||
            not_initial_values.includes(value) && not_initial_values.some((val) => input.endsWith(val));

        if (is_invalid) return;

        let input_value = `${input}${value}`
        setInput(input_value);

    };

    const _handleCalculate = () => {

        const digits = input.split(/\+|\-|\*|\/|\%/g).map(Number);
        const operation = input.replace(/[0-9]|\./g, "").split("");

        let indexof_divide = operation.indexOf("/");

        while (indexof_divide !== -1) {
            digits.splice(indexof_divide, 2, digits[indexof_divide] / digits[indexof_divide + 1]);
            operation.splice(indexof_divide, 1);
            indexof_divide = operation.indexOf("/");
        };

        let indexof_mul = operation.indexOf("*");

        while (indexof_mul !== -1) {
            digits.splice(indexof_mul, 2, digits[indexof_mul] * digits[indexof_mul + 1]);
            operation.splice(indexof_mul, 1);
            indexof_mul = operation.indexOf("*");
        };

        let indexof_plus = operation.indexOf("+");

        while (indexof_plus !== -1) {
            digits.splice(indexof_plus, 2, digits[indexof_plus] + digits[indexof_plus + 1]);
            operation.splice(indexof_plus, 1);
            indexof_plus = operation.indexOf("+");
        };

        let indexof_min = operation.indexOf("-");

        while (indexof_min !== -1) {
            digits.splice(indexof_min, 2, digits[indexof_min] - digits[indexof_min + 1]);
            operation.splice(indexof_min, 1);
            indexof_min = operation.indexOf("-");
        };

        let indexof_per = operation.indexOf("%");

        while (indexof_per !== -1) {
            digits.splice(indexof_per, 1, digits[indexof_per] / 100);
            operation.splice(indexof_per, 1);
            indexof_per = operation.indexOf("%");
        };


        setInput(String(digits[0]));
        prev_result.current = String(digits[0]);

    };

    return (
        <div className="App">
            <div className="container">
                <div className="row vh-100 align-items-center">
                    <div className="col-10 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto z-3">
                        <div className="row bg-primary-subtle rounded-2 p-2 py-4">

                            <div className="col-12 p-1">
                                <h1 id="title" className="text-center ">React Calculator</h1>
                            </div>

                            {/* Display */}
                            <div className="col-12 p-1 mb-3 ">
                                <div id="display" className="py-2 rounded-3 border border-5 border-white">

                                    <p className={`${offCalculator && "opacity-0"} fs-16 mb-2 text-end pe-3 text-display`}>
                                        {prev_result.current}
                                    </p>
                                    <input type="text"
                                        value={input}
                                        onChange={(e) => _handleInputChange(e.target.value)}
                                        name="output"
                                        placeholder={0}
                                        className={`${offCalculator && "opacity-0"} fs-20 text-display text-end bg-transparent pe-3 w-100 border-0 outline-none`} />
                                </div>
                            </div>

                            {/* Buttons */}
                            <Button className={offCalculator ? "bg-green" : "bg-red"}
                                label={offCalculator ? "On" : "Off"}
                                onClick={() => _handleOnClick(offCalculator ? "On" : "Off")} />
                            <Button label={"CE"} onClick={() => _handleOnClick("CE")} />
                            <Button label={"C"} onClick={() => _handleOnClick("C")} />
                            <Button label={"❌"} onClick={() => _handleOnClick("❌")} />

                            <Button label={7} onClick={() => _handleDigitClick(7)} />
                            <Button label={8} onClick={() => _handleDigitClick(8)} />
                            <Button label={9} onClick={() => _handleDigitClick(9)} />

                            <Button label={"/"} onClick={() => _handleDigitClick("/")} />

                            <Button label={4} onClick={() => _handleDigitClick(4)} />
                            <Button label={5} onClick={() => _handleDigitClick(5)} />
                            <Button label={6} onClick={() => _handleDigitClick(6)} />

                            <Button label={"X"} onClick={() => _handleDigitClick("*")} />

                            <Button label={1} onClick={() => _handleDigitClick(1)} />
                            <Button label={2} onClick={() => _handleDigitClick(2)} />
                            <Button label={3} onClick={() => _handleDigitClick(3)} />

                            <Button label={"-"} onClick={() => _handleDigitClick("-")} />
                            <Button label={"."} onClick={() => _handleDigitClick(".")} />

                            <Button label={0} onClick={() => _handleDigitClick(0)} />

                            <Button label={"%"} onClick={() => _handleDigitClick("%")} />
                            <Button label={"+"} onClick={() => _handleDigitClick("+")} />

                            {/* Calculate result */}
                            <div className="col-12 p-1 rounded-2 mt-3">
                                <button className="py-3 w-100 border-0 outline-none bg-success text-white fw-bold rounded-2"
                                    onClick={() => _handleCalculate()}>
                                    Calculate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default App;
