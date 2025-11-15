import { v4 } from "uuid";
import { prisma } from "../libs/prisma"
import { getImageUrl, getThumbUrl } from "../util/getUrl";
import fs from 'fs/promises';
import sharp from "sharp";

export const getPhotos = async(id:number)=>{

    const photos = await prisma.photo.findMany({
        where:{
            galleryId:id
        }
    });

    if(!photos){
        return false;
    }

    const photosUrl = photos.map(photo=>({
        id:photo.id,
        url:getImageUrl(photo.filename),
        thumb:getThumbUrl(photo.filename)
    }));

    return photosUrl;

}

export const handleRawPhoto = async(tmpPath:string)=>{

    const newName = v4() + '.jpg';

    const image = await sharp(tmpPath).
    resize(2000,2000,{fit:"cover"})
    .toBuffer();

    await sharp(image).
    resize(200)
    .toFile('./public/images/thumb/'+newName);

    await sharp(image)
    .toFile('./public/images/'+newName);

    return newName;

}


export const createImage = async(galleryId:number,filename:string) =>{

    const photo = await prisma.photo.create({
        data:{
            filename,
            galleryId
        }
    });

    if(!photo){
        return false;
    }

    return photo;

}