-- Create User table
CREATE TABLE "Users" (
    "user_id" varchar(255) PRIMARY KEY,
    "username" varchar UNIQUE NOT NULL,
    "first_name" varchar(120) NOT NULL,
    "last_name" varchar(120) NOT NULL,
    "email" varchar,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Folders Table
CREATE TABLE "Folders" (
    "folder_id" serial PRIMARY KEY,
    "parent_id" int,
    "user_id" varchar(255),
    "name" varchar(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("parent_id") REFERENCES "Folders" ("folder_id") ON DELETE CASCADE,
    FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE
);

-- Create Files Table
CREATE TABLE "Files" (
    "file_id" serial PRIMARY KEY,
    "folder_id" int,
    "title" varchar(255) NOT NULL,
    "description" text,
    "content" text,
    "is_public" boolean DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("folder_id") REFERENCES "Folders" ("folder_id") ON DELETE CASCADE
);