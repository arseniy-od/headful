import axios from 'axios';
import React, {ChangeEventHandler, ReactNode} from 'react';

interface AIInputChildrenInputBase {
    value: string;
}

interface AIInputChildrenProps<TInput extends AIInputChildrenInputBase> {
    onChange: ChangeEventHandler<TInput>;
    value: TInput['value'];
}

const handleModify = async (text: string, graphQlResolver: PromptKey) => {
    let modifiedText = text;
    const queryData = {
        query: `query modify($text: String!) {
            ${graphQlResolver}(text: $text)
        }`,
        variables: {text},
    };

    try {
        const response = await axios.post(
            process.env.REACT_APP_GRAPHQL_URL as string,
            queryData,
        );
        modifiedText = response.data.data[graphQlResolver] ?? text;
    } catch (error) {
        console.error(error);
    }
    return modifiedText;
};

type PromptKey = 'translate' | 'rephrase' | 'summarize'; // Have to be same as graphQl resolvers at the backend

const prompts: {
    [key in PromptKey]: {
        label: string;
    };
} = {
    translate: {
        label: 'Translate to English',
    },
    rephrase: {
        label: 'Formalize Text',
    },
    summarize: {
        label: 'Summarize article',
    },
};

interface CustomButtonProps {
    onClick: () => void;
    label: string;
    className?: string;
}

const DefaultButton: React.FC<CustomButtonProps> = ({
    onClick,
    label,
    className,
}) => (
    <button
        onClick={onClick}
        className={
            className ??
            'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none mt-4'
        }>
        {label}
    </button>
);

interface AIInputProps<TInput extends AIInputChildrenInputBase> {
    children: (props: AIInputChildrenProps<TInput>) => ReactNode;
    onChange: ChangeEventHandler<TInput>;
    value: TInput['value'];
    enabledPrompts: PromptKey[];
    buttonComponent?: React.ComponentType<CustomButtonProps>; // Custom button component
    buttonClassName?: string; // Custom button class name
}

export function AIInput<TInput extends AIInputChildrenInputBase>({
    children,
    onChange,
    value,
    enabledPrompts,
    buttonComponent: ButtonComponent = DefaultButton, // Default to CustomButton
    buttonClassName,
}: AIInputProps<TInput>) {
    const onButtonClick = async (promptKey: PromptKey) => {
        const modifiedText = await handleModify(value, promptKey);
        onChange({target: {value: modifiedText}} as any);
    };

    return (
        <div>
            {children({onChange, value})}
            <div>
                {enabledPrompts.map(promptKey => (
                    <ButtonComponent
                        key={promptKey}
                        onClick={() => onButtonClick(promptKey)}
                        label={prompts[promptKey].label}
                        className={buttonClassName}
                    />
                ))}
            </div>
        </div>
    );
}
