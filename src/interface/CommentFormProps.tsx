import type Letter from "../Letter";

export interface CommentFormProps {
    letterNumber: number | undefined,
    text: string | undefined,
    date: string |  undefined,
    toggleEditDone: () => void
    setLetter: (letter: Letter) => void;
}
