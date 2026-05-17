CREATE TABLE organizations (
	organization_is SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organizations(organization_id),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

INSERT INTO projects (organization_id, title, description, location, date)
VALUES
(1, 'Community Garden Build', 'Construct raised garden beds for local families.', 'South Jordan, UT', '2025-06-12'),
(1, 'Playground Renovation', 'Repair and repaint playground equipment.', 'West Jordan, UT', '2025-07-03'),
(1, 'Neighborhood Cleanup', 'Remove debris and beautify public spaces.', 'Riverton, UT', '2025-08-10'),
(1, 'Home Weatherization', 'Install insulation for low-income households.', 'Herriman, UT', '2025-09-15'),
(1, 'Holiday Shelter Repairs', 'Fix structural issues at a local shelter.', 'Salt Lake City, UT', '2025-12-05');

INSERT INTO projects (organization_id, title, description, location, date)
VALUES
(2, 'Urban Farm Planting Day', 'Plant seasonal crops with volunteers.', 'Salt Lake City, UT', '2025-04-20'),
(2, 'Compost Workshop', 'Teach composting techniques to the community.', 'West Valley City, UT', '2025-05-18'),
(2, 'Irrigation System Setup', 'Install drip irrigation for community gardens.', 'Murray, UT', '2025-06-25'),
(2, 'Harvest Festival Prep', 'Prepare booths and displays for the fall festival.', 'South Jordan, UT', '2025-09-10'),
(2, 'Greenhouse Maintenance', 'Repair greenhouse panels and shelving.', 'Draper, UT', '2025-11-02');

INSERT INTO projects (organization_id, title, description, location, date)
VALUES
(3, 'Food Pantry Distribution', 'Organize and distribute food to families.', 'Taylorsville, UT', '2025-03-14'),
(3, 'Senior Center Visit', 'Spend time with seniors and assist with activities.', 'Sandy, UT', '2025-04-22'),
(3, 'Clothing Drive Sorting', 'Sort donated clothes for local shelters.', 'Midvale, UT', '2025-05-30'),
(3, 'Blood Drive Support', 'Assist with check-in and refreshments.', 'West Jordan, UT', '2025-07-19'),
(3, 'Back-to-School Event', 'Distribute backpacks and supplies to students.', 'South Jordan, UT', '2025-08-12');






CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO categories (name)
VALUES
('Community Development'),
('Environmental Service'),
('Education & Outreach');

INSERT INTO project_categories (project_id, category_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);

INSERT INTO project_categories (project_id, category_id) VALUES
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2);

INSERT INTO project_categories (project_id, category_id) VALUES
(11, 3),
(12, 3),
(13, 3),
(14, 3),
(15, 3);