import RegisterForm from "@/components/auth/register-form";
import { FC } from "react";


interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex h-full flex-col items-center">
        <RegisterForm />
    </div>
  );
};

export default page;
