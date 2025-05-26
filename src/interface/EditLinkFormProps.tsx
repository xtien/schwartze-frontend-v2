import type {MyLocation} from "../generated-api";

export interface EditLinkFormProps {
    location: MyLocation,
    linkId: string,
    setLocation: (location: MyLocation) => void;
}
