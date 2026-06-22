export const uploadImage = async (
    file: Express.Multer.File
): Promise<string> => {

    // temporary
    // पुढे Cloudflare R2 upload logic येईल

    return `uploads/${Date.now()}-${file.originalname}`;
};