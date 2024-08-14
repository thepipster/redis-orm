import "reflect-metadata";

export type ColumnParams = {
    type?: string;
    index?: boolean;
    defaultValue?: any;
};

// any parameters, even optional ones!
export function Column(params?: ColumnParams) {
    return function (target: any, propertyKey) {
        
        const t = Reflect.getMetadata('design:type', target, propertyKey);
        console.log(`${propertyKey} type: ${t.name}`);

        console.log(params);
        console.log('target', target);
        console.log('propertyKey = ', propertyKey);
    };
}
