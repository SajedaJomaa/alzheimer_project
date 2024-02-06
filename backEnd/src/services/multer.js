//import atob from 'atob';
import multer from "multer";
import mimetype from 'mime-type';

const fileValidation = {
  image: ['image/png', 'image/jpeg']
}

function fileUpload(fileValidation) {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    // let fet = atob(file);
    if (file.mimetype) {
      cb(null, true);
    } else {
      cb('invalid format ', false);
    }
  }
  const upload = multer({ fileFilter, storage });
  return upload;
}
export default fileUpload;
