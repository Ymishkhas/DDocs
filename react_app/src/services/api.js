const ENDPOINT = 'http://localhost:4000/api';
const API_KEY = 'ddocs-api-key';

const registerUser = async (userInfo, token) => {
    try {
        const response = await fetch(`${ENDPOINT}/users`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY} ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error registering user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering user:', error.message);
        throw error;
    }
};

const getRootFolder = async (token) => {
    try {
        const response = await fetch(`${ENDPOINT}/folders/root`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY} ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching root folder');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching root folder:', error.message);
        throw error;
    }
}

const createFolder = async (folderInfo, token) => {
    try {
        const response = await fetch(`${ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(folderInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY} ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error creating folder');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating folder:', error.message);
        throw error;
    }
}

const createFile = async (fileInfo, token) => {
    try {
        const response = await fetch(`${ENDPOINT}/files`, {
            method: 'POST',
            body: JSON.stringify(fileInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY} ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error creating file');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating file:', error.message);
        throw error;
    }
}

const updateFolder = async (folder_id, folderInfo, token) => {
    try {
        const response = await fetch(`${ENDPOINT}/folders/${folder_id}`, {
            method: 'PUT',
            body: JSON.stringify(folderInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY} ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error updating folder');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating folder:', error.message);
        throw error;
    }
}

const updateFile = async (file_id, fileInfo, token) => {
    try {
        const response = await fetch(`${ENDPOINT}/files/${file_id}`, {
            method: 'PUT',
            body: JSON.stringify(fileInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY} ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error updating file');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating file:', error.message);
        throw error;
    }
}

const deleteFolder = async (folder_id, token) => {
    try {
        const response = await fetch(`${ENDPOINT}/folders/${folder_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY} ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error deleting folder');
        }

        return null;
    } catch (error) {
        console.error('Error deleting folder:', error.message);
        throw error;
    }
}

const deleteFile = async (file_id, token) => {
    try {
        const response = await fetch(`${ENDPOINT}/files/${file_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY} ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error deleting file');
        }

        return null;
    } catch (error) {
        console.error('Error deleting file:', error.message);
        throw error;
    }
}

export { registerUser, getRootFolder, updateFolder, updateFile, createFolder, createFile, deleteFolder, deleteFile };