/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, Tooltip } from "@mui/material";
import { Preview, Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditBox from "../Forms/editParents";
const UserActions = ({ params}:any) => {
  const router = useRouter();
  const [isModelOpen, setIsModalOpen] = useState(false);
  return (
    <Box>
      
      <EditBox id={params.id} isOpen={isModelOpen} onClose={() => setIsModalOpen(false) }/>
      
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
         
        <IconButton onClick={() => setIsModalOpen(true)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => {}}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UserActions;
