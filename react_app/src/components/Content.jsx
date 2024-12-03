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
    const [editable, setEditable] = useState(null);
    const [isPublic, setIsPublic] = useState(null);

    const { user } = useAuth();

    // const [searchParams] = useSearchParams();
    // const query = searchParams.get('query');

    useEffect(() => {
        const fetchFile = async () => {
            try {
                if (fileId) {

                    if (user) {
                        const token = await user.getIdToken();
                        const response = await getFile(fileId, token);
                        setFile(response);

                        // Make it editable if user is the owner
                        if (response.Folder.user_id === user.uid) {
                            setEditable(true);
                        }
                        setIsPublic(response.is_public);
                    } else {
                        const response = await getFile(fileId);
                        setFile(response);
                        setEditable(false);
                        setIsPublic(response.is_public);
                    }

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

    const updateFilePublicity = async (makePublic) => {
        try {
            const token = await user.getIdToken();
            await updateFile(fileId, { is_public: makePublic }, token);
            setFile({ ...file, is_public: makePublic });
            setIsPublic(makePublic);
        } catch (error) {
            console.error('Error updating file:', error.message);
        }
    }

    // if (file) {
    //     console.log(file)
    // }

    return (
        <>
            {file && (
                <div className="content-container">
                    <div className="file-controls">
                        <p>{file.name}</p>
                        {editable && (
                            <div
                                id='public-button'
                                className={isPublic ? 'red' : 'green'}
                                onClick={() => updateFilePublicity(!isPublic)}
                            >
                                <div className="status-circle"></div>
                                <div className="status-text">
                                    {isPublic ? 'Live' : 'Private'}
                                </div>
                            </div>
                        )}
                    </div>
                    <Tiptap file_content={file.content} editable={editable} updateFileContent={updateFileContent} />
                </div>
            )}
        </>
    );
}

export default Content;