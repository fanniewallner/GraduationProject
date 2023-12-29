import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

type BreadcrumbProps = {
  items: { label: string; href: string }[];
};

const BreadCrumbsHelper: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumbs sx={{ color: "white" }} aria-label="breadcrumb">
      {items.map((item, index) => (
        <Link
          key={index}
          color={index === items.length - 1 ? "#FFFFFF" : "inherit"}
          href={item.href}
          aria-current={index === items.length - 1 ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbsHelper;
