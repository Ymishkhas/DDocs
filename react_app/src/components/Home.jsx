import { searchFiles } from '../services/api';
import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';
import Tiptap from './Tiptap';

const Home = () => {

    const [searchInput, setSearchInput] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const fetchResults = async () => {
        try {
            const response = await searchFiles(searchInput);
            console.log(response);
            setSearchResults(response);
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        }
    }

    const extractPreview = (htmlString) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        return div.textContent || div.innerText || '';
    };

    return (
        <div className='home'>
            <div className="gretting">
                <h1>Search Ideas, Documents, and Guides. Welcome to <span>DDocs</span></h1>
            </div>
            <div className="search-wrapper">
                <input type='text' placeholder='Search for ingredients...' onChange={(e) => setSearchInput(e.target.value)} />
                <button onClick={fetchResults}>Search</button>
            </div>
            {searchResults && (
                <div className="results">
                    {searchResults.length !== 0 ? (
                        searchResults.map((result) => (
                            <div key={result.file_id} className="result-card">
                                <Link to={`/document/${result.file_id}`}>
                                    {/* <div className="preview" dangerouslySetInnerHTML={{ __html: result.content }} /> */}
                                    <div className="preview">
                                        <Tiptap file_content={result.content} editable={false} updateFileContent={() => { }} />
                                    </div>
                                    <div className="card-info">
                                        <p>{result.name}</p>
                                        <p id='user'>by {result.Folder.User.fullname}</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div>No results found</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Home;