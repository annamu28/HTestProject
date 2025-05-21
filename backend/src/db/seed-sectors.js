const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'myapp',
  port: 25432,
  ssl: false
});

const sectors = [
  { value: 1, name: 'Manufacturing', level: 1 },
  { value: 19, name: 'Construction materials', level: 2, parent: 1 },
  { value: 18, name: 'Electronics and Optics', level: 2, parent: 1 },
  { value: 6, name: 'Food and Beverage', level: 2, parent: 1 },
  { value: 342, name: 'Bakery & confectionery products', level: 3, parent: 6 },
  { value: 43, name: 'Beverages', level: 3, parent: 6 },
  { value: 42, name: 'Fish & fish products', level: 3, parent: 6 },
  { value: 40, name: 'Meat & meat products', level: 3, parent: 6 },
  { value: 39, name: 'Milk & dairy products', level: 3, parent: 6 },
  { value: 437, name: 'Other', level: 3, parent: 6 },
  { value: 378, name: 'Sweets & snack food', level: 3, parent: 6 },
  { value: 13, name: 'Furniture', level: 2, parent: 1 },
  { value: 389, name: 'Bathroom/sauna', level: 3, parent: 13 },
  { value: 385, name: 'Bedroom', level: 3, parent: 13 },
  { value: 390, name: "Children's room", level: 3, parent: 13 },
  { value: 98, name: 'Kitchen', level: 3, parent: 13 },
  { value: 101, name: 'Living room', level: 3, parent: 13 },
  { value: 392, name: 'Office', level: 3, parent: 13 },
  { value: 394, name: 'Other (Furniture)', level: 3, parent: 13 },
  { value: 341, name: 'Outdoor', level: 3, parent: 13 },
  { value: 99, name: 'Project furniture', level: 3, parent: 13 },
  { value: 12, name: 'Machinery', level: 2, parent: 1 },
  { value: 94, name: 'Machinery components', level: 3, parent: 12 },
  { value: 91, name: 'Machinery equipment/tools', level: 3, parent: 12 },
  { value: 224, name: 'Manufacture of machinery', level: 3, parent: 12 },
  { value: 97, name: 'Maritime', level: 3, parent: 12 },
  { value: 271, name: 'Aluminium and steel workboats', level: 4, parent: 97 },
  { value: 269, name: 'Boat/Yacht building', level: 4, parent: 97 },
  { value: 230, name: 'Ship repair and conversion', level: 4, parent: 97 },
  { value: 93, name: 'Metal structures', level: 3, parent: 12 },
  { value: 508, name: 'Other', level: 3, parent: 12 },
  { value: 227, name: 'Repair and maintenance service', level: 3, parent: 12 },
  { value: 11, name: 'Metalworking', level: 2, parent: 1 },
  { value: 67, name: 'Construction of metal structures', level: 3, parent: 11 },
  { value: 263, name: 'Houses and buildings', level: 3, parent: 11 },
  { value: 267, name: 'Metal products', level: 3, parent: 11 },
  { value: 542, name: 'Metal works', level: 3, parent: 11 },
  { value: 75, name: 'CNC-machining', level: 4, parent: 542 },
  { value: 62, name: 'Forgings, Fasteners', level: 4, parent: 542 },
  { value: 69, name: 'Gas, Plasma, Laser cutting', level: 4, parent: 542 },
  { value: 66, name: 'MIG, TIG, Aluminum welding', level: 4, parent: 542 },
  { value: 9, name: 'Plastic and Rubber', level: 2, parent: 1 },
  { value: 54, name: 'Packaging', level: 3, parent: 9 },
  { value: 556, name: 'Plastic goods', level: 3, parent: 9 },
  { value: 559, name: 'Plastic processing technology', level: 3, parent: 9 },
  { value: 55, name: 'Blowing', level: 4, parent: 559 },
  { value: 57, name: 'Moulding', level: 4, parent: 559 },
  { value: 53, name: 'Plastics welding and processing', level: 4, parent: 559 },
  { value: 560, name: 'Plastic profiles', level: 3, parent: 9 },
  { value: 5, name: 'Printing', level: 2, parent: 1 },
  { value: 148, name: 'Advertising', level: 3, parent: 5 },
  { value: 150, name: 'Book/Periodicals printing', level: 3, parent: 5 },
  { value: 145, name: 'Labelling and packaging printing', level: 3, parent: 5 },
  { value: 7, name: 'Textile and Clothing', level: 2, parent: 1 },
  { value: 44, name: 'Clothing', level: 3, parent: 7 },
  { value: 45, name: 'Textile', level: 3, parent: 7 },
  { value: 8, name: 'Wood', level: 2, parent: 1 },
  { value: 337, name: 'Other (Wood)', level: 3, parent: 8 },
  { value: 51, name: 'Wooden building materials', level: 3, parent: 8 },
  { value: 47, name: 'Wooden houses', level: 3, parent: 8 },
  { value: 3, name: 'Other', level: 1 },
  { value: 37, name: 'Creative industries', level: 2, parent: 3 },
  { value: 29, name: 'Energy technology', level: 2, parent: 3 },
  { value: 33, name: 'Environment', level: 2, parent: 3 },
  { value: 2, name: 'Service', level: 1 },
  { value: 25, name: 'Business services', level: 2, parent: 2 },
  { value: 35, name: 'Engineering', level: 2, parent: 2 },
  { value: 28, name: 'Information Technology and Telecommunications', level: 2, parent: 2 },
  { value: 581, name: 'Data processing, Web portals, E-marketing', level: 3, parent: 28 },
  { value: 576, name: 'Programming, Consultancy', level: 3, parent: 28 },
  { value: 121, name: 'Software, Hardware', level: 3, parent: 28 },
  { value: 122, name: 'Telecommunications', level: 3, parent: 28 },
  { value: 22, name: 'Tourism', level: 2, parent: 2 },
  { value: 141, name: 'Translation services', level: 2, parent: 2 },
  { value: 21, name: 'Transport and Logistics', level: 2, parent: 2 },
  { value: 111, name: 'Air', level: 3, parent: 21 },
  { value: 114, name: 'Rail', level: 3, parent: 21 },
  { value: 112, name: 'Road', level: 3, parent: 21 },
  { value: 113, name: 'Water', level: 3, parent: 21 }
];

async function seedSectors() {
  try {
    // Clear existing data
    await pool.query('DELETE FROM sectors');

    // Insert sectors
    for (const sector of sectors) {
      await pool.query(
        'INSERT INTO sectors (value, name, parent_id, level) VALUES ($1, $2, $3, $4)',
        [sector.value, sector.name, sector.parent || null, sector.level]
      );
    }

    console.log('Sectors seeded successfully');
  } catch (error) {
    console.error('Error seeding sectors:', error);
  } finally {
    await pool.end();
  }
}

seedSectors(); 