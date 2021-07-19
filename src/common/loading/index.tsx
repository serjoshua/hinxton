import React from "react";

const Loading: React.FC<{}> = () => {
  return (
    <div className="loading">
      <i className="fas fa-spinner fa-pulse" />
    </div>
  );
};

export default Loading;
