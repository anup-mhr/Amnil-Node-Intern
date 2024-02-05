const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/img/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.render('upload')
})

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Access the uploaded file information
  const filePath = req.file.path;
  const originalName = req.file.originalname;

  res.status(200).json({
    status: 'Success',
    message: 'File uploaded successfully',
    filePath: filePath,
    originalName: originalName,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
