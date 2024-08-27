import React, { useEffect, useState } from "react";
import UserCard from "./userCard/UserCardFile";
import RejectModal from "./ModalsFolder/RejectModalFIle";
import AcceptModal from "./ModalsFolder/AcceptModelFile";
import { useDispatch, useSelector } from "react-redux";
import { createNotiApprovalAPIThunk } from "../../../lib/store/thunk/approvalNotificationActionCreatorThunk";

const ManageApproval = () => {
  const [UserData, setUserData] = useState([]);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [salaryAccepted, setSalaryAccepted] = useState(false);
  const dispatch = useDispatch();
  const onAccept = () => {
    
    setIsAcceptModalOpen(true);
  };

  const onReject = () => {
    setIsRejectModalOpen(true);
  };

  const NotificationApprovalsState = useSelector(
    (state) => state.approvalNotificationApiReducer
  );
  const {
    data: NotifiApprovalData,
    loading: NotifiApprovalLoading,
    error: NotifiApprovalError,
  } = NotificationApprovalsState;

  const [currentBox, setCurrentBox] = useState({});

  const toggleSalaryUpdate = () =>{
    setSalaryAccepted(prev=>!prev)
}

  useEffect(() => {
    if (NotifiApprovalData) {
      setUserData(NotifiApprovalData?.data);
    }
  }, [NotifiApprovalData]);

  useEffect(() => {
    const fetchApiData = createNotiApprovalAPIThunk(
      "APPROVAL_NOTIFICATION_REQUEST",
      "APPROVAL_NOTIFICATION_SUCCESS",
      "APPROVAL_NOTIFICATION_FAILURE"
    );
    dispatch(fetchApiData("get", `/salary-things/getSalaryNotification`, null));
  }, [salaryAccepted]);

  console.log(NotifiApprovalData);
  console.log(currentBox);

  return (
    <div className="custom-scrollbar overflow-y-auto h-screen">
      {UserData?.map((point, index) => {
        return (
          <UserCard
            key={index}
            setCurrentBox={setCurrentBox}
            id={point?.id}
            username={point?.firstName + " " + point?.lastName}
            role={point?.role}
            currentSalary={point?.currentSalary}
            updatedSalary={point.updatedSalary}
            onAccept={onAccept}
            onReject={onReject}
          />
        );
      })}
      <AcceptModal
        setSalaryAccepted={toggleSalaryUpdate}
        setCurrentBox={setCurrentBox}
        currentBox={currentBox}
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
      />
      <RejectModal
        setSalaryAccepted={toggleSalaryUpdate}
        setCurrentBox={setCurrentBox}
        currentBox={currentBox}
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
      />
    </div>
  );
};

export default ManageApproval;
