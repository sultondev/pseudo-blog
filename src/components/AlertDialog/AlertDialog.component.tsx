import { Children, memo } from "react";
import ButtonWrapper from "../../templates/ButtonWrapper.template";
const AlertDialog = (props: {
  children: JSX.Element;
  title: string;
  body: string;
}) => {
  const { title, body } = props;
  return (
    <div className="box mx-auto -z-1 relative left-1/2 -translate-x-1/2">
      <div className="box-wrapper border-2 border-slate-400 p-5">
        <h4 className="box__title mb-5 text-red-600 font-bold text-2xl">
          {title}
        </h4>
        <p className="box__body ">{body}</p>
        <div className="flex z-10">{props.children}</div>
      </div>
    </div>
  );
};

export const MemoAlertDialog = memo(AlertDialog);
