import React, { ElementType, Suspense } from "react";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );
}

export default Loadable