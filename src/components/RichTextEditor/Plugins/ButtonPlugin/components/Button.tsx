import {
    HTMLPropsAs,
    PlateRenderElementProps,
    Value,
    createComponentAs,
    createElementAs,
    useElementProps,
} from '@udecode/plate-core';
import { TButtonElement } from '../types';

export type ButtonRootProps = PlateRenderElementProps<Value, TButtonElement> & HTMLPropsAs<'a'>;

export const useButton = (props: ButtonRootProps): HTMLPropsAs<'a'> => {
    const _props = useElementProps<TButtonElement, 'a'>({
        ...props,
        elementToAttributes: (element) => ({
            href: element.url,
            target: element.target,
        }),
    });

    return {
        ..._props,
        // quick fix: hovering <a> with href loses the editor focus
        onMouseOver: (e) => {
            e.stopPropagation();
        },
    };
};

export const ButtonRoot = createComponentAs<ButtonRootProps>((props) => {
    const htmlProps = useButton(props);

    return createElementAs('a', htmlProps);
});

export const Button = {
    Root: ButtonRoot,
};
