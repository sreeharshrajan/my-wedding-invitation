import React, { useRef, useEffect, useState } from "react";
import Marquee from "@/components/wish/Marquee";

const Wall = ({ wishes }) => {
  const middleIndex = Math.ceil(wishes.length / 2);

  return (
    <div className="container mx-auto mb-10 xl:px-0">
      <div className="flex flex-col gap-6">
        <Marquee
          wishes={wishes.slice(0, middleIndex)}
          speed={30}
          direction={1}
        />

        <Marquee wishes={wishes.slice(middleIndex)} speed={30} direction={-1} />
      </div>
    </div>
  );
};

export default Wall;
