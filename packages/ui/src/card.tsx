import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border-b p-2 sm:p-3 md:p-4 ">
      <h1 className="text-xl border-b pb-2">{title}</h1>
      {children}
    </div>
  );
}
