import { EditorProvider, EditorContent, useEditor } from '@tiptap/react'
import History from '@tiptap/extension-history'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from 'react';
import '../styles/Tiptap.css';


// define your extension array
const extensions = [StarterKit]

const Tiptap = ({ file_content, editable, updateFileContent }) => {

    // const [content, setContent] = useState(file_content);

    // Use the useEditor hook to create the editor instance
    const editor = useEditor({
        extensions,
        content: file_content,
        editable: editable,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            updateFileContent(html);
        },
    });

    // Update editor editable state when editable prop changes
    useEffect(() => {
        if (editor) {
            editor.setEditable(editable);
        }
    }, [editable, editor]);

    // Update editor content when file_content changes
    useEffect(() => {
        if (editor && file_content !== editor.getHTML()) {
            editor.commands.setContent(file_content);
        }
    }, [file_content, editor]);

    useEffect(() => {
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor]);

    return (
        // <EditorProvider
        //     extensions={extensions}
        //     content={file_content}
        //     editable={editable}
        //     onUpdate={( editor ) => {
        //         const html = editor.getHTML();
        //         updateFileContent(html);
        //         console.log('Editor content updated:', html);
        //     }}
        // ></EditorProvider>
        // <EditorProvider editor={editor}></EditorProvider>
        <div className="tiptap-editor">
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap