import multer from "multer";

const allowed = ['image/jpg', 'image/jpeg', 'image/png'];

export const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, callback) => callback(
        null,
        allowed.includes(file.mimetype)
    )
});