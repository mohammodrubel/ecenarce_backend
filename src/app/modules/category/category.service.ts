import { Category } from "@prisma/client";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { sendImageCloudinary } from "../../utils/sendImageToCloudinary";

// Create Category

const createCategory = async (file: Express.Multer.File | undefined, data: any) => {
    if (!file) {
        throw new AppError(httpStatus.CONFLICT, 'Icon is required')
    }
   const imageName = new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;
  
      const uploadResult: any = await sendImageCloudinary(file.buffer, imageName);
  
    const result = await prisma.category.create(
        {
            data:{
                ...data,
                icon:uploadResult.secure_url
            }

        }
    );
    return result;
};

// Get All Categories
const getCategories = async () => {
    const reuslt = await prisma.category.findMany({
        where: {
            isDeleted: false,
        },
    });
    return reuslt
};

// Get Single Category by ID
const getCategory = async (id: string) => {
    const findCategory = await prisma.category.findUnique({ where: { id } })
    if (!findCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found')
    }

    const result = await prisma.category.findFirst(
        {
            where: {
                id
            }
        }
    )
    return result
};

const updateCategory = async (id: string, updateData: Partial<Category>) => {
    const findCategory = await prisma.category.findUnique({ where: { id } });
    if (!findCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    // Decide new subcategories
    let newSubcategories: string[] = [];
    if (updateData.subcategories) {
        newSubcategories = updateData.subcategories;
    }

    const result = await prisma.category.update({
        where: { id },
        data: {
            ...updateData,
            subcategories: newSubcategories,
        },
    });

    return result;
};
const deleteCategory = async (id: string) => {
    const findCategory = await prisma.category.findUnique({ where: { id } });
    if (!findCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    const result = await prisma.category.update(
        {
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        }
    )
    return result
}

export const CategoryService = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};