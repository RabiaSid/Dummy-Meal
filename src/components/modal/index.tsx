import React, { useState } from "react";
import { Modal } from "antd";

type ModalProps = {
  childern?: any;
  open?: boolean;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
};

function AppModal(props: ModalProps) {
  const { childern, open, onOk, onCancel } = props;
  return (
    <>
      <Modal
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        className="modal"
        footer={null}
      >
        {childern}
      </Modal>
    </>
  );
}

export default AppModal;
