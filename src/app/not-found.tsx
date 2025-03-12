import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getFullPath } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

/**
 * Not Found (404) Page, will be displayed when the requested page could not be found.
 */
const Page = () => {
  return (
    <div className="flex h-[85vh] items-center justify-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle className="mb-4 flex items-center justify-center">
            Not Found (404)
          </CardTitle>
          <CardDescription className="text-center">
            The requested page could not be found.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button asChild className="w-full">
            <Link href={getFullPath("")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
