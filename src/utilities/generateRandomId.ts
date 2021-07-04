export default (): string => {
    return `id-${window.crypto.getRandomValues(new Uint32Array(1))}`;
};
