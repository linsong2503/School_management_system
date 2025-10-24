/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  forwardRef,
  ReactElement,
  Ref,
  Fragment,
} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useUpdateTeacherMutation } from "@/state/api";
import { toast } from "react-toastify";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type Props = {
  opt: number;
  id: string;
  isOpen: boolean;
  onClose: () => void;
};
const DeleteDialog = ({ opt, id, isOpen, onClose }: Props) => {
  let obj;
  switch (opt) {
    case 1:
      obj = "Teacher";
      break;
    case 2:
      obj = "Student";
      break;
    case 3:
      obj = "Parent";
      break;
    default:
      break;
  }
  const [deleteTeacher, { error, isSuccess }] = useUpdateTeacherMutation();
  // const [deleteParent] = useUpdateParentMutation();
  const [st] = useState("I");
  const handleClick = async () => {
    switch (opt) {
      case 1:
        await deleteTeacher({
          teacherId: id,
          st: st,
        });
        if (error) {
          toast("Something went wrong")
        };
        if (isSuccess) {
          toast("Successfully delete teacher");
        }
        break;

      default:
        break;
    }
    // await deleteParent({
    //   parentId: id,
    //   st: st,
    // });
    // if (error) console.log(error);
    // if (isSuccess) {
    //   window.location.reload();
    // }
  };
  return (
    <Fragment>
      <Dialog
        open={isOpen}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this {obj} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => handleClick()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default DeleteDialog;
