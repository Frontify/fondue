import { extendTailwindMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type ClassNameValue = ClassNameArray | string | null | undefined | 0 | false;
type ClassNameArray = ClassNameValue[];

const customTwMerge = extendTailwindMerge({
    prefix: "tw-",
})
export const cn = (...classLists: ClassNameValue[]): string => {

    return customTwMerge(...classLists);
};

export const styleVariants = tv
