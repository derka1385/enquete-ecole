import type {Answers,Profile} from './questionnaire';
export type SurveyResponse={id:string;studyId:string;profile:Profile;paperRef:string;status:'draft'|'complete';answers:Answers;version:number;createdAt:string;updatedAt:string};
export type Study={id:string;title:string;createdAt:string};
export type Session={study:Study;key:string};
