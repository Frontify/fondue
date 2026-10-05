import './modern.css';

// `using` (Chrome 134) and native CSS nesting (Chrome 120) are newer than the Chrome 109 floor.
export const withResource = (open: () => Disposable): number => {
    using resource = open();
    return resource === undefined ? 0 : 1;
};

// A class static block (Chrome 94) runs at the floor, so the build keeps it.
export class Registry {
    static ready: boolean;
    static {
        Registry.ready = true;
    }
}
