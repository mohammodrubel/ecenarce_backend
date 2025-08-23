import { Brand } from "@prisma/client";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// Create Category
const createBrand = async (data:Brand) => {
  const result = await prisma.brand.create({
    data: data,
  });
  return result 
};

// Get All Categories
const getAllBrand = async () => {
  const reuslt = await prisma.brand.findMany({})
  return reuslt

};

// Get Single Category by ID
const getBrand = async (id:string) => {
  const isExist = await prisma.brand.findUnique(
    {
      where:{id}
    }
  )
  if(!isExist){
    throw new AppError(httpStatus.NOT_FOUND,"Brand  Not Found")
  }

  return isExist
};

// Update Category by ID
const updateBrand = async (id:string, updateData:Partial<Brand>) => {
  const isExist = await prisma.brand.findUnique({
    where: { id },
  });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand  Not Found');
  }
  const result = await prisma.brand.update(
    {
      where:{
        id:id
      },
      data:updateBrand
    }
  )

  return result

};

// Delete Category by ID
const deleteBrand  = async (id:string) => {
   const isExist = await prisma.brand.findUnique({
     where: { id },
   });
   if (!isExist) {
     throw new AppError(httpStatus.NOT_FOUND, 'Brand  Not Found');
   }
   const result = await prisma.brand.delete(
    {
      where:{
        id
      }
    }
   )
   return result
};

export const brandService = {
 createBrand,
 getAllBrand,
 getBrand,
 updateBrand,
 deleteBrand
};
