import React from "react";
import TestPosts from "./components/share/TestPosts";
// import TestQuotes from "./components/share/TestQuotes";
// import TestUsers from "./components/share/TestUsers";
// import Todo from "./components/share/Todo";
// import TestUseSuspenseQuery from "./components/share/TestUseSuspenseQuery";
// import Quote from "./components/share/Quote";

const App = () => {
  return (
    <React.Fragment>
      <section className="">
        {/* <Quote /> */}
        {/* <Todo /> */}
        {/* <TestUseSuspenseQuery /> */}
        {/* <TestUsers /> */}
        {/* <TestQuotes /> */}
        <TestPosts />
      </section>
    </React.Fragment>
  );
};

export default App;
