/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface TestErrorProps {
  error: any;
  resetErrorBoundary?: any;
}

const TestError: React.FC<TestErrorProps> = ({ error, resetErrorBoundary }) => {
  return (
    <React.Fragment>
      <div role="alert">
        <p>❌ Something went wrong:</p>
        <pre>{error.message}</pre>
        <button type="button" onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    </React.Fragment>
  );
};

export default TestError;
