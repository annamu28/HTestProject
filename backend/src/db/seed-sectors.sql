-- Clear existing data
DELETE FROM sectors;

-- Level 1 (Root level)
INSERT INTO sectors (value, name, parent_value, level) VALUES (1, 'Manufacturing', NULL, 1);
INSERT INTO sectors (value, name, parent_value, level) VALUES (2, 'Service', NULL, 1);
INSERT INTO sectors (value, name, parent_value, level) VALUES (3, 'Other', NULL, 1);

-- Level 2
INSERT INTO sectors (value, name, parent_value, level) VALUES (19, 'Construction materials', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (18, 'Electronics and Optics', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (6, 'Food and Beverage', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (13, 'Furniture', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (12, 'Machinery', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (11, 'Metalworking', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (9, 'Plastic and Rubber', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (5, 'Printing', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (7, 'Textile and Clothing', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (8, 'Wood', 1, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (37, 'Creative industries', 3, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (29, 'Energy technology', 3, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (33, 'Environment', 3, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (25, 'Business services', 2, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (35, 'Engineering', 2, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (28, 'Information Technology and Telecommunications', 2, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (22, 'Tourism', 2, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (141, 'Translation services', 2, 2);
INSERT INTO sectors (value, name, parent_value, level) VALUES (21, 'Transport and Logistics', 2, 2);

-- Level 3
INSERT INTO sectors (value, name, parent_value, level) VALUES (342, 'Bakery & confectionery products', 6, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (43, 'Beverages', 6, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (42, 'Fish & fish products', 6, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (40, 'Meat & meat products', 6, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (39, 'Milk & dairy products', 6, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (437, 'Other', 6, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (378, 'Sweets & snack food', 6, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (389, 'Bathroom/sauna', 13, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (385, 'Bedroom', 13, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (390, 'Children''s room', 13, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (98, 'Kitchen', 13, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (101, 'Living room', 13, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (392, 'Office', 13, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (394, 'Other (Furniture)', 13, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (341, 'Outdoor', 13, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (99, 'Project furniture', 13, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (94, 'Machinery components', 12, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (91, 'Machinery equipment/tools', 12, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (224, 'Manufacture of machinery', 12, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (97, 'Maritime', 12, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (93, 'Metal structures', 12, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (508, 'Other', 12, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (227, 'Repair and maintenance service', 12, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (67, 'Construction of metal structures', 11, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (263, 'Houses and buildings', 11, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (267, 'Metal products', 11, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (542, 'Metal works', 11, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (54, 'Packaging', 9, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (556, 'Plastic goods', 9, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (559, 'Plastic processing technology', 9, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (560, 'Plastic profiles', 9, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (148, 'Advertising', 5, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (150, 'Book/Periodicals printing', 5, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (145, 'Labelling and packaging printing', 5, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (44, 'Clothing', 7, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (45, 'Textile', 7, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (337, 'Other (Wood)', 8, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (51, 'Wooden building materials', 8, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (47, 'Wooden houses', 8, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (581, 'Data processing, Web portals, E-marketing', 28, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (576, 'Programming, Consultancy', 28, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (121, 'Software, Hardware', 28, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (122, 'Telecommunications', 28, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (111, 'Air', 21, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (114, 'Rail', 21, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (112, 'Road', 21, 3);
INSERT INTO sectors (value, name, parent_value, level) VALUES (113, 'Water', 21, 3);

-- Level 4
INSERT INTO sectors (value, name, parent_value, level) VALUES (271, 'Aluminium and steel workboats', 97, 4);
INSERT INTO sectors (value, name, parent_value, level) VALUES (269, 'Boat/Yacht building', 97, 4);
INSERT INTO sectors (value, name, parent_value, level) VALUES (230, 'Ship repair and conversion', 97, 4);
INSERT INTO sectors (value, name, parent_value, level) VALUES (75, 'CNC-machining', 542, 4);
INSERT INTO sectors (value, name, parent_value, level) VALUES (62, 'Forgings, Fasteners', 542, 4);
INSERT INTO sectors (value, name, parent_value, level) VALUES (69, 'Gas, Plasma, Laser cutting', 542, 4);
INSERT INTO sectors (value, name, parent_value, level) VALUES (66, 'MIG, TIG, Aluminum welding', 542, 4);
INSERT INTO sectors (value, name, parent_value, level) VALUES (55, 'Blowing', 559, 4);
INSERT INTO sectors (value, name, parent_value, level) VALUES (57, 'Moulding', 559, 4);
INSERT INTO sectors (value, name, parent_value, level) VALUES (53, 'Plastics welding and processing', 559, 4); 