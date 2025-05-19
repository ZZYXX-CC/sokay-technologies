// Script to apply the database schema to Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function applySchema() {
  console.log('Applying database schema to Supabase...');

  try {
    // Read the schema file
    const schemaPath = path.resolve(__dirname, 'supabase/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute.`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
        
        if (error) {
          console.error(`Error executing statement ${i + 1}:`, error);
          console.log('Statement:', statement);
        } else {
          console.log(`Statement ${i + 1} executed successfully.`);
        }
      } catch (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
        console.log('Statement:', statement);
      }
    }

    console.log('Schema application completed.');
  } catch (error) {
    console.error('Error applying schema:', error);
  }
}

// Apply the seed data
async function applySeed() {
  console.log('Applying seed data to Supabase...');

  try {
    // Read the seed file
    const seedPath = path.resolve(__dirname, 'supabase/updated_seed.sql');
    const seed = fs.readFileSync(seedPath, 'utf8');

    // Split the seed into individual statements
    const statements = seed
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute.`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
        
        if (error) {
          console.error(`Error executing statement ${i + 1}:`, error);
          console.log('Statement:', statement);
        } else {
          console.log(`Statement ${i + 1} executed successfully.`);
        }
      } catch (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
        console.log('Statement:', statement);
      }
    }

    console.log('Seed data application completed.');
  } catch (error) {
    console.error('Error applying seed data:', error);
  }
}

// Run the schema and seed application
async function run() {
  await applySchema();
  await applySeed();
}

run();
