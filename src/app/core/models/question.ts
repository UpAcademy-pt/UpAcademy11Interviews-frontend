import { AttributeValue } from './attribute-value';

export class Question {
    id?: number;
    question : string;
    answer : string;
    attributes : AttributeValue[];
    evaluation?: number
}