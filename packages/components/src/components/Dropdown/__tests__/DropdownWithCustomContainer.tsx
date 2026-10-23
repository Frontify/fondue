/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Button } from '#/components/Button/Button';

import { Dropdown } from '../Dropdown';

type DropdownWithCustomContainerProps = {
    containerTestId: string;
    contentTestId: string;
    subTriggerTestId: string;
    subContentTestId: string;
};

export const DropdownWithCustomContainer = ({
    containerTestId,
    contentTestId,
    subTriggerTestId,
    subContentTestId,
}: DropdownWithCustomContainerProps) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
        <>
            <div ref={setContainer} data-test-id={containerTestId} />
            {container ? (
                <Dropdown.Root open>
                    <Dropdown.Trigger>
                        <Button>Trigger</Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content container={container} data-test-id={contentTestId}>
                        <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                        <Dropdown.SubMenu>
                            <Dropdown.SubTrigger data-test-id={subTriggerTestId}>Item 2</Dropdown.SubTrigger>
                            <Dropdown.SubContent container={container} data-test-id={subContentTestId}>
                                <Dropdown.Item onSelect={() => {}}>Item 2.1</Dropdown.Item>
                            </Dropdown.SubContent>
                        </Dropdown.SubMenu>
                    </Dropdown.Content>
                </Dropdown.Root>
            ) : null}
        </>
    );
};
