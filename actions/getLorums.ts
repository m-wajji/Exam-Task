"use server";

import prisma from "@/lib/db";

export const getLorems = async () => {
  return await prisma.lorem.findMany();
};
