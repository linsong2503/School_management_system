import { Box, IconButton, Tooltip } from "@mui/material";
import { Preview, Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
const UserActions = ({ params }: any) => {
  return (
    <Box>
      <Tooltip title="View details">
        <IconButton
          onClick={() => {
            (window as Window).location = `./teachers/${params.id}`;
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
