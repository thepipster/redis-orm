import "reflect-metadata";



// any parameters, even optional ones!
export function Model() {
    return function (target: any, propertyKey) {
        
        const t = Reflect.getMetadata('design:type', target, propertyKey);
        console.log(`${propertyKey} type: ${t.name}`);

        console.log(params);
        console.log('target', target);
        console.log('propertyKey = ', propertyKey);
    };
}
