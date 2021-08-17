export const getFocusStyle = (withPseudoClass = false, inset = false): string =>
    ["tw-ring-4", "tw-ring-blue", "tw-ring-offset-2", "tw-outline-none", inset ? "tw-ring-inset" : ""]
        .map((element) => (withPseudoClass && element.length > 0 ? "focus:".concat(element) : element))
        .join(" ");
