import { useParams, useSearchParams } from "react-router-dom";

const Content = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const file_id = params.file_id;
    const query = searchParams.get('query');

    return (
        <div>
            <h2>Document ID: {file_id}</h2>
            <p>Search query: {query}</p>
        </div>
    );
}

export default Content;