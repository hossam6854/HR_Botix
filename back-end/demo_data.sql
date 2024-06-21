USE `Jobs`;

INSERT INTO `Jobs` (`jobTitle`, `createdAt`, `company`, `firstName`, `lastName`,`email`, `skills`, `jobType`)
VALUES
('Software Engineer', NOW(), 'Company A', 'John', 'Doe', 'john15@gmail.com', 'Java, Spring Boot', 'Full Time'),
('Data Scientist', NOW(), 'Company B', 'Jane', 'Doe', 'Jane15@gmail.com', 'Python, Machine Learning', 'Part Time'),
('Product Manager', NOW(), 'Company C', 'Alice', 'Smith', 'Alice23@gmail.com', 'Product Strategy, UX Design', 'Contract'),
('UX Designer', NOW(), 'Company D', 'Bob', 'Johnson', 'Bob14@gmail.com', 'Sketch, Figma', 'Full Time'),
('DevOps Engineer', NOW(), 'Company E', 'Charlie', 'Brown', 'Charlie47@gmail.com', 'AWS, Docker', 'Part Time'),
('Frontend Developer', NOW(), 'Company F', 'David', 'Davis', 'David74@gmail.com', 'React, JavaScript', 'Contract'),
('Backend Developer', NOW(), 'Company G', 'Eve', 'Evans', 'Eve63@gmail.com', 'Node.js, Express', 'Full Time'),
('Full Stack Developer', NOW(), 'Company H', 'Frank', 'Franklin', 'Frank10@gmail.com', 'React, Node.js', 'Part Time'),
('Machine Learning Engineer', NOW(), 'Company I', 'Grace', 'Griffin', 'Grace41@gmail.com', 'Python, TensorFlow', 'Contract'),
('QA Engineer', NOW(), 'Company J', 'Helen', 'Harris', 'Helen63@gmail.com', 'Selenium, JUnit', 'Full Time');