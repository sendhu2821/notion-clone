"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const BreadCrumbs = () => {
  const path = usePathname();
  const segments = path.split("/");
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => {
            if (!segment) return null;

            const href = `/${segments.slice(0, index + 1).join("/")}`;
            return (
              <Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={segment}>
                  <BreadcrumbLink>{segment}</BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
export default BreadCrumbs;
