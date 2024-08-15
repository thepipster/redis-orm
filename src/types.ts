export type ColumnParams = {
    type?: string;
    index?: boolean;
    defaultValue?: any;
};

export type Field = {
    name: string,
    type: string,
    index?: boolean,
    defaultValue?: string|Function,
    onUpdateOverride?: Function
}