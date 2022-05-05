INSERT INTO department (dept_name)
VALUES
("Front End"),
("Supervisor"),
("Sales Floor");

INSERT INTO role (title, salary, department_id)
VALUES
("Cashier", 30000, 1),
("Bookkeeper", 40000, 1),
("Grocery Manager", 40000, 2),
("Front End Manager", 40000, 2),
("Grocery Stocker", 30000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Ronald', 'Firbank', 5, 4),
  ('Virginia', 'Woolf', 1, 2),
  ('Piers', 'Gaveston', 3, NULL),
  ('Charles', 'LeRoi', 1, 8 ),
  ('Katherine', 'Mansfield', 1, 8),
  ('Dora', 'Carrington', 1, 8),
  ('Edward', 'Bellamy', 5, 4),
  ('Montague', 'Summers', 4, NULL),
  ('Octavia', 'Butler', 2, 8),
  ('Unica', 'Zurn', 1, 3);




