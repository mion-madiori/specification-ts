export interface ISpecification<T>{
        isSatisfiedBy(candidate: T):boolean;
        and(other: ISpecification<T>): ISpecification<T>;
        or(other: ISpecification<T>): ISpecification<T>;
        not(): ISpecification<T>;
}

export abstract class CompositionSpecification<T> implements ISpecification<T>{
    public abstract isSatisfiedBy(candidate: T): boolean;   
    
    public and(other: ISpecification<T>): ISpecification<T> {
        return new AndSpecification(this, other);
    }

    public or(other: ISpecification<T>): ISpecification<T> {
        return new OrSpecification(this, other);
    }

    public not(): ISpecification<T> {
        return new NotSpecification(this);
    }        
}
    
class AndSpecification<T> extends CompositionSpecification<T>{
    private one: ISpecification<T>;
    private other: ISpecification<T>;

    constructor(one: ISpecification<T>, other: ISpecification<T>){
        super();
        this.one = one;
        this.other = other;
    }

    public isSatisfiedBy(candidate: T){
        return this.one.isSatisfiedBy(candidate) && this.other.isSatisfiedBy(candidate);
    }
}

class OrSpecification<T> extends CompositionSpecification<T>{
    private one: ISpecification<T>;
    private other: ISpecification<T>;

    constructor(one: ISpecification<T>, other: ISpecification<T>){
        super();
        this.one = one;
        this.other = other;
    }

    public isSatisfiedBy(candidate: T){
        return this.one.isSatisfiedBy(candidate) || this.other.isSatisfiedBy(candidate);
    }
}

class NotSpecification<T> extends CompositionSpecification<T>{
    private wrapped: ISpecification<T>;

    constructor(wrapped: ISpecification<T>){
        super();
        this.wrapped = wrapped;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return !this.wrapped.isSatisfiedBy(candidate);
    }
}