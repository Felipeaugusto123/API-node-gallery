import { prisma } from "../libs/prisma"
import { getThumbUrl } from "../util/getUrl";

export const createGallery = async (title:string)=>{

    const gallery = await prisma.gallery.create({
        data:{
            name:title
        }
    });

    return gallery ? gallery : false;

}

export const getGalleries = async()=>{

    const galleries = await prisma.gallery.findMany({
        include:{
            photo:{
                take:1,
                select:{
                    filename:true
                },
                orderBy:{id:"asc"}
            }
        }
    });

    if(!galleries){
        return false;
    }

    const gallerysUrl = galleries.map(gallery =>({
        id:gallery.id,
        name:gallery.name,
        thumb:gallery.photo[0] ? getThumbUrl(gallery.photo[0].filename) : null
    }));

    return gallerysUrl;

}

export const getGallery=(id:number)=>{

    const gallery = prisma.gallery.findFirst({
        where:{id}
    });

    if(!gallery){
        return false;
    }

    return gallery;

}