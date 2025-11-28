/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, Tooltip } from "@mui/material";
import { Preview, Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditStudentBox from "../Forms/editStudent";
import DeleteDialog from "../Delete/deleteRecord";
const StudentActions = ({ params }: any) => {
  const router = useRouter();
  const [isStudentModelOpen, setIsStudentModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Box>
      <EditStudentBox
        id={params.id}
        isOpen={isStudentModelOpen}
        onClose={() => setIsStudentModalOpen(false)}
      />
      <DeleteDialog
        opt={2}
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
        <IconButton onClick={() => setIsStudentModalOpen(true)}>
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

export default StudentActions;
