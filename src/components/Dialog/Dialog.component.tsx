import { memo } from "react";
const Dialog = () => {
  return (
    <div className="container">
      <div className="dialog-blur"></div>
      Dialog Component
    </div>
  );
};

export const MemoDialog = memo(Dialog);
