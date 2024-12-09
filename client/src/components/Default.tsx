// create fuction componnent react typescript
import React from "react";

const Homepage: React.FC = (children: any) => {
  return (
    <>
      <div className="bg-red-300">{children}</div>
    </>
  );
};

export default Homepage;
