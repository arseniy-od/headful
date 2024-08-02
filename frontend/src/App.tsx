import React, {ChangeEventHandler, useState} from 'react';
import ReactDOM from 'react-dom';
import {AIInput} from './components/AIInput/AIInput';

type TInput = {value: string};

const App: React.FC = () => {
    const [value, setValue] = useState('');

    const onChange: ChangeEventHandler<TInput> = ev => {
        setValue(ev.target.value);
    };
    return (
        <div className="h-screen w-screen bg-slate-100">
            <section>
                <h2>Input</h2>
                {/* <InputShowcase inputTag={'input'} /> */}
                <AIInput
                    onChange={onChange}
                    value={value}
                    enabledPrompts={['translate', 'rephrase']}>
                    {({onChange, value}) => (
                        <input
                            className="border-2 border-black"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                </AIInput>
            </section>
            <section>
                <h2>TextArea</h2>
                {/* <InputShowcase inputTag={'textarea'} /> */}
            </section>
        </div>
    );
};

export default App;
