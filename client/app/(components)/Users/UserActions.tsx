/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, Tooltip } from "@mui/material";
import { Preview, Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import EditBox from "../Forms/EditDialog";
const UserActions = ({ params }: any) => {
  const router = useRouter();
  return (
    <Box>
      <Tooltip title="View details">
        <IconButton
          onClick={() => {
            router.push(`${window.location.pathname}/${params.id}`);
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton onClick={() => {}}>
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
