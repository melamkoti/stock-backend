import multer from "multer";

// Configure multer storage

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/\s+/g, '-');
    cb(null, Date.now() + '-' + sanitized);
  }
});


export const upload = multer({ storage });
