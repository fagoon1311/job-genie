import React, { ReactNode, Suspense } from "react";
import { BarLoader } from "react-spinners";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-5">
      
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color={"#00A6BC"} /> }
      >
      {children}
      </Suspense>
    </div>
  );
};

export default layout;
