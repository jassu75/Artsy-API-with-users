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

  const notificationStyling: {
    background: Record<string, string>;
    container: Record<string, string>;
  } = {
    background: {
      success: styles.success,
      danger: styles.danger,
      logout: styles.logout,
      deleteAccount: styles.delete_account,
    },
    container: {
      success: styles.success_notification_container,
      danger: styles.danger_notification_container,
      logout: styles.logout_notification_container,
      deleteAccount: styles.delete_account_notification_container,
    },
  };

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
            className={`${notificationStyling.container[toast.type] || ""}`}
          >
            <Toast.Header
              className={` ${notificationStyling.background[toast.type] || ""}`}
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
