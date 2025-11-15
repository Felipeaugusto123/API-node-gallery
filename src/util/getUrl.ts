
export const getThumbUrl = (filename:string)=>{
return `${process.env.LOCAL}/public/images/thumb/${filename}`;
}

export const getImageUrl = (filename:string)=>{

    return `${process.env.LOCAL}/public/images/${filename}`;

}