import { FC } from "react";

import LoginForm from "@/components/auth/login-form";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex h-full flex-col items-center">
      <LoginForm />
    </div>
  );
};

export default page;
