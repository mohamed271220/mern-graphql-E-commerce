import React, { useContext, useEffect } from "react";
import OpacityBtn from "../widgets/OpacityBtn";
import { GrUpdate } from "react-icons/gr";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../widgets/Input";
import { isAuthContext } from "../../context/isAuth";
import SlideButton from "../widgets/SlideButton";

interface vaiableInterface {
  _id: string;
  name: string;
}
interface Props {
  value: string;
  detail: string;
  fn: (variables: any) => void;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  bool: boolean;
}

const Detail = ({ detail, value, setter, fn, bool }: Props) => {
  const { name, email, userId } = useContext(isAuthContext);

  const methods = useForm();
  const { getValues, handleSubmit } = methods;
  const { [detail]: detailvalue } = getValues();
  console.log(detailvalue);
  const update = () => {
    fn({ variables: { _id: userId, [detail]: detailvalue } });
  };
  console.log({ _id: userId, [detail]: detailvalue });

  const OnSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div className="user-detail-par center">
      <span className="user-detail detail">{detail} :</span>
      <span className="user-value value">{value}</span>

      <OpacityBtn
        key={detail}
        btn="update"
        cls="btn update-user center gap"
        fn={() => {
          setter(true);
        }}
        Icon={GrUpdate}
      />
      {bool && (
        <SlideButton
          height={300}
          sethide={setter}
          cls="update-user"
          doneMsg="updated"
          fn={update}
          head={`update your ${detail}`}
        >
          <FormProvider {...methods}>
            <form action="" onSubmit={handleSubmit(OnSubmit)}>
              <Input placeholder={detail} />
            </form>
          </FormProvider>
        </SlideButton>
      )}
    </div>
  );
};

export default Detail;
