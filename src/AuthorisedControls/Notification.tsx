import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TypeNotification } from "../UnauthorisedControls/unauthorizedControl.types";
import { deleteNotification } from "../redux/user.slice";
import styles from "./notifications.module.css";

const Notification = () => {
  const notifications = useSelector(
    (state: RootState) => state.userSlice.notifications
  );
  const dispatch = useDispatch();

  const handleClose = (toast: TypeNotification) => {
    dispatch(deleteNotification(toast));
  };
  return (
    <div>
      <ToastContainer position="top-end" className="p-3">
        {notifications?.map((toast: TypeNotification) => (
          <Toast
            key={toast.id}
            autohide
            delay={3000}
            onClose={() => {
              handleClose(toast);
            }}
            className={`${
              toast.type === "success"
                ? styles.success_notification_container
                : styles.danger_notification_container
            }`}
          >
            <Toast.Header
              className={` ${
                toast.type === "success" ? styles.success : styles.danger
              }`}
            >
              {toast.message}
            </Toast.Header>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
};

export default Notification;
