import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { getFile, updateFile } from '../services/api';
import Tiptap from "./Tiptap";
import '../styles/Content.css';

const Content = () => {
    const params = useParams();
    const fileId = params.file_id;
    const [file, setFile] = useState(null);
    const [editable, setEditable] = useState(false);

    const { user } = useAuth();

    // const [searchParams] = useSearchParams();
    // const query = searchParams.get('query');

    useEffect(() => {
        const fetchFile = async () => {
            try {
                if (user && fileId) {
                    const token = await user.getIdToken();
                    const response = await getFile(fileId, token);
                    setFile(response);

                    // Make it editable if user is the owner
                    if (response.Folder.user_id === user.uid) {
                        setEditable(true);
                    }

                } else {
                    console.log("User not logged in");
                }
            } catch (error) {
                console.error('Error fetching file:', error.message);
            }
        }
        fetchFile();
    }, [user, fileId]);

    const updateFileContent = async (newContent) => {
        try {
            const token = await user.getIdToken();
            await updateFile(fileId, { content: newContent }, token);
            setFile({ ...file, content: newContent });
        } catch (error) {
            console.error('Error updating file:', error.message);
        }
    }

    if (file) {
        console.log(file)
    }

    return (
        <>
            {file && (
                <div className="content-container">
                    <div className="file-controls">
                        <p>{file.name}</p>
                        <button onClick={() => setEditable(!editable)}>{editable ? 'Disable' : 'Enable'} editing</button>
                    </div>
                        <Tiptap file_content={file.content} editable={editable} updateFileContent={updateFileContent} />
                </div>
            )}
        </>
    );
}

export default Content;