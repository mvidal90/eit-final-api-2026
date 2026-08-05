import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./temp/images")
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.')[1]}`)
    }
})

const upload = multer({ storage })

export default upload