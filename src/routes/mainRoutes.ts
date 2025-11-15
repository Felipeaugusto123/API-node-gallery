import { Router } from 'express';
import * as GalleryController from '../controller/gallery';
import { upload } from '../libs/multer';

const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.get("/galleries", GalleryController.getGalleries);
router.get("/gallery/:id", GalleryController.getGallery);
router.post("/gallery", GalleryController.createGallery);
router.post("/gallery/upload", upload.single('photo'), GalleryController.upload);




export default router;