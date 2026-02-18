"use client";

import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  fontWeight?: number;
};

export default function NavLink({ href, children, fontWeight = 600 }: Props) {
  return (
    <Typography
      component="a"
      href={href}
      variant="inherit"
      sx={{
        color: "inherit",
        textDecoration: "none",
        fontWeight: "500",
        fontSize: "inherit",
        position: "relative",
        cursor: "pointer",
        pb: "2px",
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "0%",
          height: "1px",
          backgroundColor: "currentColor",
        },

        "&:hover::after": {
          width: "100%",
        },
      }}
    >
      {children}
    </Typography>
  );
}
