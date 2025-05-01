import multer from "multer";

const storage = multer.memoryStorage(); // store in memory as Buffer
const upload = multer({ storage: storage });

export default upload;