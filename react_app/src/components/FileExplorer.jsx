import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useAuth } from '../contexts/AuthContext';
import { getRootFolder, updateFolder, updateFile, createFolder, createFile, deleteFolder, deleteFile, getFile  } from '../services/api.js';
import { useEffect, useState } from 'react';
import Folder from './Folder';
import '../styles/FileExplorer.css';

const FileExplorer = () => {
    const { user } = useAuth();

    const [searchInput, setSearchInput] = useState('');
    const [explorer, setExplorer] = useState(null);

    // Get user token
    const getUserToken = async () => {
        try {
            if (user) {
                const token = await user.getIdToken();
                return token;
            } else {
                console.log("User not logged in");
                return null;
            }
        } catch (error) {
            console.error('Error getting user token:', error.message);
        }
    }

    // Fetch one time once the component is mounted
    const fetchRootFolder = async () => {
        try {
            const token = await getUserToken();
            const response = await getRootFolder(token);
            setExplorer(response);
        } catch (error) {
            console.error('Error fetching root folder:', error.message);
        }
    }
    useEffect(() => {
        fetchRootFolder();
    }, [user]);

    const handleCreateNode = async (parentFolderId, nodeName, isFolder) => {
        if(isFolder){
            // create folder
            try {
                const token = await getUserToken();
                await createFolder({ parent_id: parentFolderId, name: nodeName }, token);
                fetchRootFolder();
            } catch (error) {
                console.error('Error creating folder:', error.message);
            }
        } else {
            // create file
            try {
                const token = await getUserToken();
                await createFile({ folder_id: parentFolderId, name: nodeName }, token);
                fetchRootFolder();
            } catch (error) {
                console.error('Error creating file:', error.message);
            }
        }
    }

    const handleDeleteNode = async (nodeId, isFolder) => {
        if(isFolder){
            // delete folder
            try {
                const token = await getUserToken();
                await deleteFolder(nodeId, token);
                fetchRootFolder();
            } catch (error) {
                console.error('Error deleting folder:', error.message);
            }
        } else {
            // delete file
            try {
                const token = await getUserToken();
                await deleteFile(nodeId, token);
                fetchRootFolder();
            } catch (error) {
                console.error('Error deleting file:', error.message);
            }
        }
    }

    const handleUpdateNode = async (nodeId, nodeName, isFolder) => {
        if(isFolder){
            // update folder
            try {
                const token = await getUserToken();
                await updateFolder(nodeId, { name: nodeName }, token);
                fetchRootFolder();
            } catch (error) {
                console.error('Error updating folder:', error.message);
            }
        } else {
            // update file
            try {
                const token = await getUserToken();
                await updateFile(nodeId, { name: nodeName }, token);
                fetchRootFolder();
            } catch (error) {
                console.error('Error updating file:', error.message);
            }
        }
    }

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    return (
        <div id='file-explorer'>
            <div className="explorer-component">
                <input id='search-input' type="text" placeholder='Search...' value={searchInput} onChange={handleSearchInput} />
            </div>
            {explorer && (
                <div className="folder-container">
                    <Folder
                        padding={10}
                        handleCreateNode={handleCreateNode}
                        handleDeleteNode={handleDeleteNode}
                        handleUpdateNode={handleUpdateNode}
                        node={explorer}
                    />
                </div>
            )}
        </div>
    );
}

export default FileExplorer;