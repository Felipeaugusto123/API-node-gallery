import { RequestHandler } from "express";
import { FileNotProvidedError } from "../error/FileNotProvidedError";
import { RequiredParamsError } from "../error/RequiredParamsError";
import * as GalleryService from '../service/gallery';
import * as PhotosService from '../service/photos';
import { ServerError } from "../error/serverError";
import fs from 'fs/promises';
import { ResourceNotFoundError } from "../error/ResourceNotFoundError";

export const createGallery: RequestHandler = (req, res) => {

    const { title } = req.body;

    if (!title) {
        throw new RequiredParamsError("Necessario ter um titulo para a criacao da galeria");
    }

    const galeria = GalleryService.createGallery(title);

    if (!galeria) {
        throw new ServerError("Erro ao criar a galeria,tente novamente mais tarde");
    }

    res.status(201).json({ galeria });

}

export const getGalleries: RequestHandler = (req, res) => {

    const gallery = GalleryService.getGalleries();

    if (!gallery) {
        throw new ServerError("ERRO INTERNO DO SERVIDOR , TENTE NOVAMENTE MAIS TARDE");
    }

    res.status(200).json({ gallery });

}

export const getGallery: RequestHandler = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new RequiredParamsError("Necessario um id para buscar uma galeria");
    }

    const gallery = await GalleryService.getGallery(parseInt(id));
    const photos = await PhotosService.getPhotos(parseInt(id));

    if (!gallery) {
        throw new ResourceNotFoundError("Nao foi econtrado a galeria com esse id");
    }

    res.status(200).json({ gallery, photos });

}

export const upload: RequestHandler = async (req, res) => {

    const { gallery } = req.body

    if (!req.file) {
        throw new FileNotProvidedError("E necessario enviar uma imagem");
    }

    if (!gallery) {
        throw new RequiredParamsError("precisa de uma galeria");
    }

    const foundGallery = await GalleryService.getGallery(parseInt(gallery));

    if (!foundGallery) {
        await fs.unlink(req.file.path);
        throw new ResourceNotFoundError("Nao foi possivel enontrar essa galeria");
    }

    const filename = await PhotosService.handleRawPhoto(req.file.path);

    if (!filename) {
        throw new ServerError("ERRO INTERNO DO SERVIDOR");
    }

    const photo = await PhotosService.createImage(foundGallery.id, filename);
    await fs.unlink(req.file.path);

    if (!photo) {
        throw new ServerError("ERRO INTERNO DO SERVIDOR");
    }

    res.status(200).json({});

}