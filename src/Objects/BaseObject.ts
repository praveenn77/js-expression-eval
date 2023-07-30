import ExecutionContext from "../ExecutionContext";

class BaseObject {
    context : ExecutionContext;
    constructor(context:ExecutionContext) {
        this.context = context;
    }
    public getValue(identifier:string) {
        return null;
    }
}

export default BaseObject;