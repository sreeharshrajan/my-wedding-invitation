import React, { useRef, useEffect, useState } from "react";
import Card from "./Card";

const Wall = ({ wishes }) => {
  return (
    <div className="container mx-auto mb-10 xl:px-0">
      <div className="flex flex-col gap-6">
        {wishes.map((wish) => (
          <Card key={wish.id} wish={wish} />
        ))}
      </div>
    </div>
  );
};

export default Wall;
