import React from "react";

type ButtonProps = {
  type?: any;
  label?: any;
  className?: any;
  dataModalTarget?: any;
  dataModalToggle?: any;
  onClick?: (...args: any[]) => any;
};

export default function Button(props: ButtonProps) {
  const { type, className, onClick, dataModalTarget, dataModalToggle, label } =
    props;

  return (
    <button
      className={className}
      onClick={onClick}
      data-modal-target={dataModalTarget}
      data-modal-toggle={dataModalToggle}
    >
      {label}
    </button>
  );
}
