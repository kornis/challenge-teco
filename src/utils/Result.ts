export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error: unknown;
    private _value: unknown;
    private statusCode?: unknown;

    private constructor (isSuccess: boolean, error: unknown, value?: unknown, statusCode?: unknown) {
        if(isSuccess && error) {
            throw new Error("InvalidOperation: A result cannot be successful and contain an error");
        }

        if(!isSuccess && !error) {
            throw new Error(" InvalidOperation: A failing result needs to contain an error message");
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
        this.statusCode = statusCode;

        Object.freeze(this);
    }

    public getValue(): T {
        if(!this.isSuccess){
            throw new Error("Cant retrieve the value from a failed result");
        }

        return this._value as T;
    }

    public getStatusCode(): number {

        return this.statusCode as number;
    }

    public static ok<U>(value?: U, statusCode?: Number): Result<U> {
        return new Result<U>(true, null, value, statusCode);
    }

    public static fail<U>(error: string, statusCode?: Number): Result<U> {
        return new Result<U>(false, error, null, statusCode);
    }
}