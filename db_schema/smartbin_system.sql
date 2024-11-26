CREATE DATABASE smartbin_system;

USE smartbin_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'user' -- Can be 'admin' or 'user'
);

-- Insert an example admin user (password is hashed as 'adminpass')
INSERT INTO users (username, password, role) VALUES 
('admin', '$2y$10$ZkFfCn.KyyrG/ZPAU5Ks/eWxxix.nZp9ZGmJrVnWQ8asY5DbMSA6y', 'admin');
