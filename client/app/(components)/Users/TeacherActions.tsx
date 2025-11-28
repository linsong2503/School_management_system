/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, Tooltip } from "@mui/material";
import { Preview, Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditTeacherBox from "../Forms/editTeachers";
import DeleteDialog from "../Delete/deleteRecord";
const TeacherActions = ({params}:any) => {
  
  const router = useRouter();
  const [isTeacherModelOpen, setIsTeacherModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Box>
      <EditTeacherBox
        id={params.id}
        isOpen={isTeacherModelOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      />
      <DeleteDialog
        opt={1}
        id={params.id}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <Tooltip title="View details">
        <IconButton
          onClick={() => {
            router.push(`${window.location.href}/${params.id}`);
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit" className="px-4 xl:px-6">
        <IconButton onClick={() => setIsTeacherModalOpen(true)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => setIsDialogOpen(true)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TeacherActions;
