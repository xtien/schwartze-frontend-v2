import type {Subject} from "../generated-api";

export interface SubjectEditLinkFormProps {
    subject?: Subject,
    setShowEditSubject: (showEditSubject: boolean) => void;
}
