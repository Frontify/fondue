export declare type CategoryFilter = {
    category: string;
    limit?: number;
};

export declare type ComponentDetail = ComponentSummary & {
    relatedComponents: string[];
    importStatement: string;
    props: PropInfo[];
    subComponents: SubComponentInfo[];
    examples: ComponentExample[];
    instructions: string;
    typeDefinitions: Record<string, string>;
};

export declare type ComponentExample = {
    name: string;
    description: string;
    isCanonical: boolean;
    code: string;
};

export declare type ComponentSummary = {
    name: string;
    description: string;
    status: string;
    category: string;
    tags: string[];
    subComponentNames: string[];
};

/**
 * Returns the full detail for a component by name (case-insensitive).
 * Returns undefined if the component does not exist.
 */
export declare function getComponent(name: string): ComponentDetail | undefined;

/**
 * Returns all components in a given category.
 */
export declare function getComponentsByCategory(options: CategoryFilter): ComponentSummary[];

/**
 * Returns the summary for a component by name (case-insensitive).
 * Cheaper than getComponent() — does not load the full detail manifest.
 */
export declare function getComponentSummary(name: string): ComponentSummary | undefined;

/**
 * Returns an icon by its kebab-case name (case-insensitive).
 */
export declare function getIcon(name: string): Icon | undefined;

/**
 * Returns an icon by its export name, e.g. "IconAdobeCreativeCloud" (case-insensitive).
 */
export declare function getIconByExportName(exportName: string): Icon | undefined;

/**
 * Returns a token by its exact id.
 */
export declare function getToken(id: string): Token | undefined;

/**
 * Returns all tokens in a given category.
 */
export declare function getTokensByCategory(options: CategoryFilter): Token[];

export declare type Icon = {
    name: string;
    componentName: string;
    exportName: string;
    importPath: string;
    filled: boolean;
    availableSizes: number[];
    defaultSize: number;
    keywords: string[];
};

/**
 * Returns all component summaries (lightweight, from the index manifest).
 */
export declare function listComponents(): ComponentSummary[];

/**
 * Returns all icons.
 */
export declare function listIcons(options?: {
    limit?: number;
}): Icon[];

/**
 * Returns all distinct token category names.
 */
export declare function listTokenCategories(): string[];

/**
 * Returns all utilities.
 */
export declare function listUtilities(): Utility[];

export declare type PropInfo = {
    name: string;
    type: string;
    required: boolean;
    defaultValue: string | null;
    description: string;
    deprecated: boolean;
    deprecationMessage: string;
};

/**
 * Searches components by query string, matching against name, description, tags, and category.
 * Returns summaries (lightweight).
 */
export declare function searchComponents(options: SearchOptions): ComponentSummary[];

/**
 * Searches icons by query string, matching against name, componentName, exportName, and keywords.
 */
export declare function searchIcons(options: SearchOptions): Icon[];

export declare type SearchOptions = {
    query: string;
    limit?: number;
};

/**
 * Searches tokens by query string, matching against id, cssVariable, tailwindClass, and category.
 */
export declare function searchTokens(options: SearchOptions): Token[];

/**
 * Searches utilities by query string, matching against id and tailwindClass.
 */
export declare function searchUtilities(options: SearchOptions): Utility[];

export declare type SubComponentInfo = {
    name: string;
    props: PropInfo[];
};

export declare type Token = {
    category: string;
    cssVariable: string;
    id: string;
    keyPath: string[];
    tailwindClass: string;
    themeable: boolean;
    type: string;
    value: string;
};

export declare type Utility = {
    id: string;
    keyPath: string[];
    properties: UtilityProperty[];
    tailwindClass: string;
    themeable: boolean;
};

export declare type UtilityProperty = {
    cssVariable: string;
    id: string;
    type: string;
    value: string;
};

export { }
