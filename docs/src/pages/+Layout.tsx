/* (c) Copyright Frontify Ltd., all rights reserved. */

export { Layout };
import '@frontify/fondue-components/styles';
import '../renderer/index.css';
import { allComponents } from '@frontify/fondue-components/content';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="tw-grid tw-grid-cols-[auto_1fr] tw-grid-rows-[auto_1fr] tw-h-screen">
            <header className="tw-col-start-1 tw-col-span-2 tw-bg-box-neutral tw-border-line tw-border-b-2 tw-px-8 tw-py-4">
                <a className="tw-font-bold tw-text-xl" href="/">
                    Fondue
                </a>
            </header>
            <nav className="tw-col-start-1 tw-bg-box-neutral tw-p-8 tw-border-line tw-border-r-2">
                <span className="tw-text-lg tw-font-bold">Components</span>
                <ul className="tw-mt-4 tw-list-disc">
                    {allComponents.map((component) => {
                        return (
                            <li key={component._id}>
                                <a href={`/component/${component.route}`}>{component.title}</a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="tw-col-start-2 tw-p-8">{children}</div>
        </main>
    );
};
