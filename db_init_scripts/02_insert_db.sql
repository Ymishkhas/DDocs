-- Populate the database with data

-- Insert into Users Table
INSERT INTO public."Users" (user_id, username, first_name, last_name, email) VALUES ('dfsfsfy653hg', 'mali', 'Mohamed', 'Ali', 'mali@example.com');
INSERT INTO public."Users" (user_id, username, first_name, last_name, email) VALUES ('jfhget65bvj', 'fhassan', 'Fatima', 'Hassan', 'fhassan@example.com');
INSERT INTO public."Users" (user_id, username, first_name, last_name, email) VALUES ('jf753gfdvwk', 'amahmoud', 'Ahmed', 'Mahmoud', 'amahmoud@example.com');

-- Insert into Folders Table
INSERT INTO public."Folders" (folder_id, parent_id, user_id, name) VALUES (1, NULL, 'dfsfsfy653hg', 'Main');
INSERT INTO public."Folders" (folder_id, parent_id, user_id, name) VALUES (2, 1, 'dfsfsfy653hg', 'Src');
INSERT INTO public."Folders" (folder_id, parent_id, user_id, name) VALUES (3, 1, 'dfsfsfy653hg', 'Components');

-- Insert into Files Table
INSERT INTO public."Files" (file_id, folder_id, title, description, content, is_public) VALUES (1, 1, 'File 1', 'Description of File 1', 'Content of File 1', FALSE);
INSERT INTO public."Files" (file_id, folder_id, title, description, content, is_public) VALUES (2, 3, 'File 2', 'Description of File 2', 'Content of File 2', TRUE);
INSERT INTO public."Files" (file_id, folder_id, title, description, content, is_public) VALUES (3, 3, 'File 3', 'Description of File 3', 'Content of File 3', FALSE);