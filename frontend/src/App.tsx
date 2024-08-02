import React, {ChangeEventHandler, useState} from 'react';
import {AIInput} from './components/AIInput/AIInput';

const MyCustomButton: React.FC<{
    onClick: () => void;
    label: string;
    className?: string;
}> = ({onClick, label}) => (
    <button
        onClick={onClick}
        className={`text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4`}>
        {label}
    </button>
);

type TInput = {value: string};

const App: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');

    const onInputChange: ChangeEventHandler<TInput> = ev => {
        setInputValue(ev.target.value);
    };

    const onTextareaChange: ChangeEventHandler<TInput> = ev => {
        setTextareaValue(ev.target.value);
    };

    return (
        <div className="h-screen w-screen bg-slate-100 overflow-auto">
            <h2 className="text-center text-3xl pt-20 font-semibold px-4">
                Example application for AIInput HOC
            </h2>
            <div className="flex justify-center pt-20">
                {/* <h2>Input</h2> */}
                <AIInput
                    onChange={onInputChange}
                    value={inputValue}
                    enabledPrompts={['translate', 'rephrase']}
                    buttonComponent={MyCustomButton}>
                    {({onChange, value}) => (
                        <div className="w-full sm:w-[34rem] md:w-[48rem]">
                            <label
                                htmlFor="input_test"
                                className="block mb-2 font-medium text-gray-900 text-xl">
                                Input
                            </label>
                            <input
                                type="text"
                                id="input_test"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Your prompt"
                                onChange={onChange}
                                value={value}
                            />
                        </div>
                    )}
                </AIInput>
            </div>
            <div className="flex justify-center pt-20 mb-10">
                <AIInput
                    onChange={onTextareaChange}
                    value={textareaValue}
                    enabledPrompts={['rephrase', 'translate', 'summarize']}>
                    {({onChange, value}) => (
                        <div className="w-full sm:w-[34rem] md:w-[48rem]">
                            <label
                                htmlFor="input_test"
                                className="block mb-2 font-medium text-gray-900 text-xl">
                                Textarea
                            </label>
                            <textarea
                                id="input_test"
                                rows={4}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Your prompt"
                                onChange={onChange}
                                value={value}
                            />
                        </div>
                    )}
                </AIInput>
            </div>
        </div>
    );
};

export default App;
