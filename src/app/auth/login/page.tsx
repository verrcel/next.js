import { FC, Suspense } from "react";

import LoginForm from "@/components/auth/login-form";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex h-full flex-col items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default page;
