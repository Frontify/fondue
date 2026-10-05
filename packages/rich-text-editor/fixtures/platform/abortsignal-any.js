export const either = (a, b) => AbortSignal.any([a, b]);
