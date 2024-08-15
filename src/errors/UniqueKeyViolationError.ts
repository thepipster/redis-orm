
/**
 * this is an error that can be thrown and results in a failure message back 
 * to the api (user error), but not treated internally as an error
 */
export class UniqueKeyViolationError extends Error {
    
    code: number = 200;

    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, UniqueKeyViolationError)
    }
}
