import React from "react";
import { Parent } from "@prisma/client";
import prisma from "@/lib/prisma";
const SingleParentPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  // const parents:
  //   | (Parent & {
  //       _count: { students: number };
  //     })
  //   | null = await prisma.parent.findUnique({
  //   where: { id },
  //   include: {
  //     _count: {
  //       select: {
  //         students: true,
  //       },
  //     },
  //   },
  // });
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">l</div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3">r</div>
    </div>
  );
};

export default SingleParentPage;
