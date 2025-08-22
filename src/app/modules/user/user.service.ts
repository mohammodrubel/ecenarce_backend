import prisma from '../../utils/prisma';

const GetAllUsers = async () => {
  const result = await prisma.user.findMany({
    where: {
      is_deleted: false,
    },
  });
  return result;
};

const GetSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
      is_deleted: false,
    },
  });
  return result;
};

const DeleteUser = async (id: string) => {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      is_deleted: true,
    },
  });
};

export const UserService = {
  GetAllUsers,
  GetSingleUser,
  DeleteUser,
};
