USE `Jobs`;

INSERT INTO `Jobs` (`jobTitle`, `createdAt`, `company`, `firstName`, `lastName`, `skills`, `jobType`)
VALUES
('Software Engineer', NOW(), 'Company A', 'John', 'Doe', 'Java, Spring Boot', 'Full Time'),
('Data Scientist', NOW(), 'Company B', 'Jane', 'Doe', 'Python, Machine Learning', 'Part Time'),
('Product Manager', NOW(), 'Company C', 'Alice', 'Smith', 'Product Strategy, UX Design', 'Contract'),
('UX Designer', NOW(), 'Company D', 'Bob', 'Johnson', 'Sketch, Figma', 'Full Time'),
('DevOps Engineer', NOW(), 'Company E', 'Charlie', 'Brown', 'AWS, Docker', 'Part Time'),
('Frontend Developer', NOW(), 'Company F', 'David', 'Davis', 'React, JavaScript', 'Contract'),
('Backend Developer', NOW(), 'Company G', 'Eve', 'Evans', 'Node.js, Express', 'Full Time'),
('Full Stack Developer', NOW(), 'Company H', 'Frank', 'Franklin', 'React, Node.js', 'Part Time'),
('Machine Learning Engineer', NOW(), 'Company I', 'Grace', 'Griffin', 'Python, TensorFlow', 'Contract'),
('QA Engineer', NOW(), 'Company J', 'Helen', 'Harris', 'Selenium, JUnit', 'Full Time');