import { usePageContext } from '../../renderer/usePageContext';

export { Page };

function Page() {
    const { data } = usePageContext();

    if (!data) {
        return null;
    }

    return (
        <>
            <h1>{data.component.title}</h1>
        </>
    );
}
