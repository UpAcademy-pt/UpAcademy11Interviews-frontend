import { Question } from '.';

export class Interview {
    title : string;
    candidate : string;
    user : Account;
    questions : Question[];
}