
import "reflect-metadata";

const formatMetadataKey = Symbol("Column");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}


/*type Decorator = (target: Input, context: {
    kind: string;
    name: string | symbol;
    access: {
      get?(): unknown;
      set?(value: unknown): void;
    };
    private?: boolean;
    static?: boolean;
    addInitializer?(initializer: () => void): void;
  }) => Output | void
*/
  /**
   * The type definition above looks complex, so let’s break it down one piece at a time:

target represents the element we’re decorating, whose type is Input
context contains metadata about how the decorated method was declared, namely:
kind: The type of decorated value. As we’ll see, this can be either class, method, getter, setter, field, or accessor
name: The name of the decorated object
access: An object with references to a getter and setter method to access the decorated object
private: Whether the decorated object is a private class member
static: Whether the decorated object is a static class member
addInitializer: A way to add custom initialization logic at the beginning of the constructor (or when the class is defined)
Output represents the type of value returned by the Decorator function
   */

/*
type ClassDecorator = (value: Function, context: {
    kind: "class"
    name: string | undefined
    addInitializer(initializer: () => void): void
  }) => Function | void



  type ClassMethodDecorator = (target: Function, context: {
    kind: "method"
    name: string | symbol
    access: { get(): unknown }
    static: boolean
    private: boolean
    addInitializer(initializer: () => void): void
  }) => Function | void


  type ClassPropertyDecorator = (target: undefined, context: {
    kind: "field"
    name: string | symbol
    access: { get(): unknown, set(value: unknown): void }
    static: boolean
    private: boolean
  }) => (initialValue: unknown) => unknown | void
*/