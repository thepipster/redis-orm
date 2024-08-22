export type ColumnParams = {
    type?: string;
    index?: boolean;
    defaultValue?: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type callbackWithReturn = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type callback = (...args: any[]) => any;

export type Field = {
    name: string,
    type: string,
    index?: boolean,
    defaultValue?: string|callbackWithReturn,
    onUpdateOverride?: callback
}

