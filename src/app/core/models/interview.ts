import { Question } from '.';
import { Account} from './account';

export class Interview {
    id?: number;
    title : string;
    candidate : string;
    user : Account;
    questions : Question[]=[]
    evaluations? : String[];
    finalEvaluation: number;
}