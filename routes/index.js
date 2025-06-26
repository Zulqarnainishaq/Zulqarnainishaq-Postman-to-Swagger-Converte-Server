var express = require('express');
var router = express.Router();
const postmanToOpenApi = require('postman-to-openapi');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const yaml = require('js-yaml');

const upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/convert-postman-to-openapi', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  const inFile = req.file.path;
  const outFile = path.join(__dirname, '../swagger/collection.yml');
  try {
    // Convert Postman to OpenAPI YAML (temp file)
    const tempOutFile = inFile + '.yml';
    await postmanToOpenApi(inFile, tempOutFile, {
      defaultTag: 'Postman',
      outputFormat: 'yaml'
    });

    // Read both YAML files
    const existing = fs.existsSync(outFile) ? yaml.load(fs.readFileSync(outFile, 'utf8')) : null;
    const incoming = yaml.load(fs.readFileSync(tempOutFile, 'utf8'));

    // Merge logic: merge paths, update existing, add new
    let merged = incoming;
    if (existing) {
      merged = { ...existing, ...incoming };
      merged.paths = { ...existing.paths, ...incoming.paths };
      // Optionally merge components, tags, etc. if needed
      if (existing.components || incoming.components) {
        merged.components = { ...(existing.components || {}), ...(incoming.components || {}) };
      }
      if (existing.tags || incoming.tags) {
        merged.tags = [ ...(existing.tags || []), ...(incoming.tags || []) ];
      }
    }

    // Write merged YAML back
    fs.writeFileSync(outFile, yaml.dump(merged));
    fs.unlinkSync(inFile);
    fs.unlinkSync(tempOutFile);
    res.json({ success: true, message: '🎉 Conversion and merge complete', outFile: 'swagger/collection.yml' });
  } catch (err) {
    if (fs.existsSync(inFile)) fs.unlinkSync(inFile);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;