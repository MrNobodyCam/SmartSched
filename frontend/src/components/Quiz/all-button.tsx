import React from "react";
import Integrate_quiz from "./Lesson_Detail";
import Integrate_quiz1 from "./Integrate_quiz1";
import Integrate_quiz2 from "./Integrate_quiz2";
import Integrate_quiz3 from "./Integrate_quiz3";

// ...existing code...

const AllButtons = () => {
  return (
    <div>
      <Integrate_quiz />
      <Integrate_quiz1 />
      <Integrate_quiz2 />
      <Integrate_quiz3 />
    </div>
  );
};

export default AllButtons;
