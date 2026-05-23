/**
 * Frame Sequencer Utility
 * 
 * This script scans the targeted '/public/images/' folder, sorts the remaining
 * 'ezgif-frame-XXX.png' files in their original numerical order, and re-sequences
 * them starting from 'ezgif-frame-001.png' to remove any numbering gaps.
 * 
 * To prevent naming collisions, it operates in two stages:
 * 1. Stages all files into temporary 'temp-staging-XXX.png' names.
 * 2. Renames the staged files to their final clean zero-padded sequential frame numbers.
 */

const fs = require('fs');
const path = require('path');

// Target directory paths
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

console.log('----------------------------------------------------');
console.log('🐾 [VetCare] Starting Frame Re-sequencing Utility...');
console.log(`📂 Target Directory: ${IMAGES_DIR}`);
console.log('----------------------------------------------------');

// Validate directory existence
if (!fs.existsSync(IMAGES_DIR)) {
  console.error(`❌ [ERROR] Targeted directory does not exist: ${IMAGES_DIR}`);
  process.exit(1);
}

fs.readdir(IMAGES_DIR, (err, files) => {
  if (err) {
    console.error('❌ [ERROR] Failed to read directory contents:', err);
    process.exit(1);
  }

  // 1. Filter out non-matching assets and parse indices
  const frameFiles = files
    .map(file => {
      const match = file.match(/^ezgif-frame-(\d+)\.png$/);
      return match ? { originalName: file, index: parseInt(match[1], 10) } : null;
    })
    .filter(Boolean);

  if (frameFiles.length === 0) {
    console.log('⚠️ [WARNING] No matching "ezgif-frame-XXX.png" files found inside the directory.');
    process.exit(0);
  }

  console.log(`ℹ️ [INFO] Found ${frameFiles.length} matching frame files.`);

  // 2. Sort files in original numerical order to keep animation flow intact
  frameFiles.sort((a, b) => a.index - b.index);

  try {
    // 3. Stage 1: Rename files to a temporary staging format to avoid overlapping index collisions
    console.log('🔄 [STEP 1/2] Staging files to temporary names...');
    frameFiles.forEach((item, idx) => {
      const oldPath = path.join(IMAGES_DIR, item.originalName);
      const tempName = `temp-staging-${String(idx + 1).padStart(3, '0')}.png`;
      const tempPath = path.join(IMAGES_DIR, tempName);
      fs.renameSync(oldPath, tempPath);
    });

    // 4. Stage 2: Re-rename staged files into sequential zero-padded frame numbers starting from 001
    console.log('🔄 [STEP 2/2] Writing final sequential frame sequence...');
    for (let i = 1; i <= frameFiles.length; i++) {
      const tempName = `temp-staging-${String(i).padStart(3, '0')}.png`;
      const finalName = `ezgif-frame-${String(i).padStart(3, '0')}.png`;
      const tempPath = path.join(IMAGES_DIR, tempName);
      const finalPath = path.join(IMAGES_DIR, finalName);
      fs.renameSync(tempPath, finalPath);
    }

    console.log('----------------------------------------------------');
    console.log(`✅ [SUCCESS] Renamed ${frameFiles.length} files successfully!`);
    console.log(`✨ Sequence starts at: ezgif-frame-001.png`);
    console.log(`✨ Sequence ends at:   ezgif-frame-${String(frameFiles.length).padStart(3, '0')}.png`);
    console.log('----------------------------------------------------');
  } catch (error) {
    console.error('❌ [CRITICAL ERROR] Renaming sequence encountered an error:', error.message);
    console.error('💡 Please verify that no image viewer is holding lock constraints on files.');
    process.exit(1);
  }
});
