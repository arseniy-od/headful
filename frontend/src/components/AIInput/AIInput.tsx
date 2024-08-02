import React, {ChangeEventHandler, ReactNode} from 'react';

interface AIInputChildrenInputBase {
    value: string;
}

interface AIInputChildrenProps<TInput extends AIInputChildrenInputBase> {
    onChange: ChangeEventHandler<TInput>;
    value: TInput['value'];
}

const handleTranslate = async (text: string) => {
    const translatedText = `${text} - Translated`; // in reality you need to make some request to api to translate current text
    return translatedText;
};

const handleRephrase = async (text: string) => {
    const rephrasedText = `${text} - Rephrased`; // in reality you need to make some request to api to translate current text
    return rephrasedText;
};

type Prompt = {
    handler: (text: string) => Promise<string>;
    label: string;
};

type PromptKey = 'translate' | 'rephrase';

const prompts: {[key in PromptKey]: Prompt} = {
    translate: {
        handler: handleTranslate,
        label: 'Translate',
    },
    rephrase: {
        handler: handleRephrase,
        label: 'Rephrase',
    },
};

interface AIInputProps<TInput extends AIInputChildrenInputBase> {
    children: (props: AIInputChildrenProps<TInput>) => ReactNode;
    onChange: ChangeEventHandler<TInput>;
    value: TInput['value'];
    enabledPrompts: PromptKey[];
}

export function AIInput<TInput extends AIInputChildrenInputBase>({
    children,
    onChange,
    value,
    enabledPrompts,
}: AIInputProps<TInput>) {
    const onButtonClick = async (promptKey: PromptKey) => {
        const handler = prompts[promptKey].handler;
        const modifiedText = await handler(value);

        onChange({target: {value: modifiedText}} as any);
    };

    return (
        <div>
            <div>
                {enabledPrompts.map(promptKey => (
                    <button onClick={() => onButtonClick(promptKey)}>
                        {prompts[promptKey].label}
                    </button>
                ))}
            </div>
            {children({onChange, value})}
        </div>
    );
}
