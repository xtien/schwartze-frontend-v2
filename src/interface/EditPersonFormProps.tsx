import type {Person} from "../generated-api";

export interface EditPersonFormProps {
    person: Person,
    toggleEditDone: () => void,
    setPerson: (person: Person) => void;
}
