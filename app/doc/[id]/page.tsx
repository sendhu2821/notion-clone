"use client";

import Document from "@/components/Document";
import React from "react";

const DocumentPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  return (
    <div>
      <Document id={id} />
    </div>
  );
};
export default DocumentPage;
