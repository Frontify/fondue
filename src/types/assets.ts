export type ImageAsset = {
    type: "image" | "logo";
    name: string;
    extension: string;
    src: string;
    alt?: string;
    icon?: undefined;
    size: number;
};
