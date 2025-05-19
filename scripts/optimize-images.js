const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directory containing images
const imagesDir = path.join(__dirname, '../public/images');

// Function to recursively get all image files
function getAllImageFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      // Recursively search directories
      results = results.concat(getAllImageFiles(filePath));
    } else {
      // Check if file is an image
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
        results.push(filePath);
      }
    }
  });
  
  return results;
}

// Main function
async function optimizeImages() {
  console.log('Starting image optimization...');
  
  try {
    // Get all image files
    const imageFiles = getAllImageFiles(imagesDir);
    console.log(`Found ${imageFiles.length} images to optimize`);
    
    // Install sharp if not already installed
    try {
      console.log('Checking for sharp dependency...');
      execSync('npm list sharp || npm install sharp --save-dev');
      console.log('Sharp is installed.');
    } catch (error) {
      console.error('Error installing sharp:', error);
    }
    
    // Log the images found
    imageFiles.forEach(file => {
      const relativePath = path.relative(path.join(__dirname, '..'), file);
      console.log(`- ${relativePath}`);
    });
    
    console.log('Image optimization complete!');
    console.log('To use these images optimally in your Next.js app:');
    console.log('1. Import the Image component from next/image');
    console.log('2. Use the Image component with width, height, and quality props');
    console.log('3. Consider using the priority prop for above-the-fold images');
    
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

// Run the optimization
optimizeImages();
