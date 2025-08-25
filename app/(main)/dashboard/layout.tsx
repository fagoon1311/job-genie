import React, { ReactNode, Suspense } from "react";
import { BarLoader } from "react-spinners";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">
          Industry Insights
        </h1>
      </div>
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color={"#00A6BC"} /> }
      >
      {children}
      </Suspense>
    </div>
  );
};

export default layout;
