import { ChevronDownIcon, ChevronRightIcon, DocumentPlusIcon, FolderIcon, FolderPlusIcon, PencilSquareIcon, TrashIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SelectButton from "./SelectButton";
import '../styles/Folder.css';

const Folder = ({ padding, handleCreateNode, handleDeleteNode, handleUpdateNode, node }) => {
    const [expand, setExpand] = useState(false);

    // To handle input of node naming and renaming
    const [nodeName, setNodeName] = useState(node?.name ? node.name : "");
    const [showUpdateField, setShowUpdateField] = useState({
        visible: false,
        isFolder: node.isFolder
    });

    const handleInputChange = (event) => {
        setNodeName(event.target.value);
    };

    function handleUpdateButton(event) {
        setNodeName(node.name);
        event.stopPropagation();
        setShowUpdateField({ ...showUpdateField, visible: true });
    }

    // To handle input of creating new nodes (folder or doc)
    const [showNewNodeInput, setShowNewNodeInput] = useState({
        visible: false,
        isFolder: null
    });

    const handleNewFolderButton = (event) => {
        event.stopPropagation();
        setExpand(true);
        setShowNewNodeInput({
            visible: true,
            isFolder: true,
        });
    };

    const handleNewFileButton = (event) => {
        event.stopPropagation();
        setExpand(true);
        setShowNewNodeInput({
            visible: true,
            isFolder: false,
        });
    };

    // Handle delete of a node
    function handleDeleteFolderButton(event) {
        event.stopPropagation();
        handleDeleteNode(node.folder_id, true);
    }
    function handleDeleteFileButton(event) {
        event.stopPropagation();
        handleDeleteNode(node.file_id, false);
    }
    // function handleDeleteButton(event) {
    //     event.stopPropagation();
    //     handleDeleteNode(node.folder_id || node.file_id);
    // }

    // To activate writing in the inputs
    const updateNewNodeName = (event) => {
        if (event.keyCode === 13 && event.target.value) {
            // Add a new node to the tree
            handleCreateNode(node.folder_id, event.target.value, showNewNodeInput.isFolder);
            setShowNewNodeInput({ ...showNewNodeInput, visible: false });
        }
    };

    const updateNodeName = (event) => {
        // If it's enter, trigger the update to the data and hide the input
        if (event.keyCode === 13 && event.target.value) {
            handleUpdateNode(node.folder_id || node.file_id, event.target.value, node.folder_id ? true : false);
            setShowUpdateField({ ...showUpdateField, visible: false });
        }
    };

    if (node.isFolder) {
        return (
            <>
                <div className="node" style={{ paddingLeft: padding }} onClick={() => setExpand(!expand)}>
                    <span>
                        {expand ? <ChevronDownIcon className="arrow-icon" /> : <ChevronRightIcon className="arrow-icon" />}
                        <FolderIcon className="file-explorer-icon" />
                        {showUpdateField.visible ? (
                            <input
                                type='text'
                                value={nodeName}
                                onChange={handleInputChange}
                                autoFocus
                                onBlur={() => setShowUpdateField({ ...showUpdateField, visible: false })}
                                onKeyDown={updateNodeName}
                            />
                        ) : (
                            <label>{node.name}</label>
                        )}
                    </span>

                    <div className="buttons-container">
                        <SelectButton
                            icon={<EllipsisHorizontalIcon />}
                            text=""
                            options={[
                                { icon: <PencilSquareIcon />, text: 'Rename', onClick: (event) => handleUpdateButton(event) },
                                { icon: <FolderPlusIcon />, text: 'New Folder', onClick: (event) => handleNewFolderButton(event) },
                                { icon: <DocumentPlusIcon />, text: 'New File', onClick: (event) => handleNewFileButton(event) },
                                { icon: <TrashIcon />, text: 'Delete', onClick: (event) => handleDeleteFolderButton(event) }
                            ]}
                        />
                    </div>
                </div>
                <div className="folder-container" style={{ display: expand ? "block" : "none" }}>
                    {showNewNodeInput.visible && (
                        <div className="add-node" style={{ paddingLeft: padding + 14 }}>
                            <span>{showNewNodeInput.isFolder ? <FolderIcon className='icon' /> : <DocumentIcon className='icon' />}</span>
                            <input
                                type="text"
                                autoFocus
                                onBlur={() => setShowNewNodeInput({ ...showNewNodeInput, visible: false })}
                                onKeyDown={updateNewNodeName}
                            />
                        </div>
                    )}
                    {node.subfolders.map((subfolder) => (
                        <Folder
                            padding={padding + 20}
                            handleCreateNode={handleCreateNode}
                            handleDeleteNode={handleDeleteNode}
                            handleUpdateNode={handleUpdateNode}
                            node={subfolder}
                            key={subfolder.folder_id}
                        />
                    ))}
                    {node.files.map((file) => (
                        <Folder
                            padding={padding + 10}
                            handleCreateNode={handleCreateNode}
                            handleDeleteNode={handleDeleteNode}
                            handleUpdateNode={handleUpdateNode}
                            node={file}
                            key={file.file_id}
                        />
                    ))}
                </div>
            </>
        );
    } else {
        return (
            <div className="node" style={{ paddingLeft: padding + 4 }}>
                <span>
                    <DocumentIcon className="file-explorer-icon" />
                    {showUpdateField.visible ? (
                        <input
                            type='text'
                            value={nodeName}
                            onChange={handleInputChange}
                            autoFocus
                            onBlur={() => setShowUpdateField({ ...showUpdateField, visible: false })}
                            onKeyDown={updateNodeName}
                        />
                    ) : (
                        <label>{node.title}</label>
                    )}
                </span>
                <div className="buttons-container">
                    <SelectButton
                        icon={<EllipsisHorizontalIcon />}
                        text=""
                        options={[
                            { icon: <PencilSquareIcon />, text: 'Rename', onClick: (event) => handleUpdateButton(event) },
                            { icon: <TrashIcon />, text: 'Delete', onClick: (event) => handleDeleteFileButton(event) }
                        ]}
                    />
                </div>
            </div>
        );
    }
};

export default Folder;