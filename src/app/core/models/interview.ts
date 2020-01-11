import { Question } from '.';

export class Interview {
    id?: number;
    title : string;
    candidate : string;
    user : Account;
    questions : Question[]=[]
    evaluations : String[];
    finalEvaluation: number
}