
// this error handler is for handle error on application level
export default class ApplicationError extends Error{
    constructor(message, code){
        super(message);
        this.code = code;
    }
}