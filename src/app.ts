import { Person, PersonRules } from './FirstsRules';

const person: Person = {
    firstname: 'Vincent',
    lastname: 'CROMBEZ',
    age: 39,
    isMale: true
}

let amIMajorAndMale: PersonRules.MajorAndMale = new PersonRules.MajorAndMale();
let amIMinorAndFemale: PersonRules.MinorAndFemale = new PersonRules.MinorAndFemale();

console.log(`Je suis un homme majeur: ${amIMajorAndMale.isSatisfiedBy(person)}`);    // true
console.log(`Je suis une femme mineur: ${amIMinorAndFemale.isSatisfiedBy(person)}`);   // false


