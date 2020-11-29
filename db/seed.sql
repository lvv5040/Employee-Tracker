use employeedb;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineers'),
    ('Support'),
    ('Marketing');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales', 70000, 1),
    ('Customer Success Manager', 68000, 2),
    ('Junior Engineer', 90000, 3),
    ('Software Engineer', 110000, 3),
    ('Customer Success Member ', 65000, 2),
    ('Product', 100000, 3),
    ('Marketing', 78000, 4);
   

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Billy', 'Bob', 1, NULL),
    ('Ashton', 'Romierez', 2, NULL),
    ('Julie', 'Smith', 3, 1),
    ('John', 'Jacob', 4, 3),
    ('Steven', 'Jones', 5, 5),
    ('Anthony', 'Davis', 6, NUll),
    ('Jarred', 'Banks', 7, 4);