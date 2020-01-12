import { Question } from '.';

export class InterviewModel {
    id?: number;
    title : string;
    questions : Question[]=[];
}