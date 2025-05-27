import type {Subject} from "../generated-api";

export interface SubjectEditLinkFormProps {
    name: string,
    setSubjects: (subjects: Subject[]) => void;
}
