import { CompositionSpecification } from "./ISpecification";

export interface Person{
    firstname: string;
    lastname: string;
    age: number;
    isMale: boolean;
}

export namespace PersonRules{

    export class IsMajor extends CompositionSpecification<Person>{
        public isSatisfiedBy(candidate: Person): boolean {
            return candidate.age >= 18;
        }
    }
    
    export class IsMale extends CompositionSpecification<Person>{
        public isSatisfiedBy(candidate: Person): boolean {
            return candidate.isMale;
        }
    }
    
    export class hasFirstname extends CompositionSpecification<Person>{
        public isSatisfiedBy(candidate: Person): boolean {
            return candidate.firstname.length > 0;
        }
    }
    
    export class hasLastname extends CompositionSpecification<Person>{
        public isSatisfiedBy(candidate: Person): boolean {
            return candidate.lastname.length > 0;
        }
    }
    
    export class MajorAndMale extends CompositionSpecification<Person>{
        isMajor: IsMajor = new IsMajor();
        isMale: IsMale = new IsMale();
    
        public isSatisfiedBy(candidate: Person): boolean {
            return this.isMale.and(this.isMajor).isSatisfiedBy(candidate);
        }
    }

    export class MinorAndFemale extends CompositionSpecification<Person>{
        isMajor: IsMajor = new IsMajor();
        isMale: IsMale = new IsMale;

        public isSatisfiedBy(candidate: Person): boolean {
            return this.isMajor.not().and(this.isMale.not()).isSatisfiedBy(candidate);
        }
    }
}
