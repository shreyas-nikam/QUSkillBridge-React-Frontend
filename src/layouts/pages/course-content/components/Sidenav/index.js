/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

function Sidenav({ clickHandler }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const sidenavItems = [
    { icon: "home", label: "course home", href: "couse-home", index: 0 },
    {
      icon: "slideshow",
      label: "course slides",
      href: "course-slide",
      index: 1,
    },
    {
      icon: "theaters",
      label: "course videos",
      href: "course-videos",
      index: 2,
    },
    { icon: "assistant", label: "QuCoPilot", href: "qucopilot", index: 3 },
    { icon: "quiz", label: "assessment", href: "assessment", index: 4 },
    { icon: "folder", label: "reference pdf", href: "reference-pdf", index: 5 },
  ];

  const renderSidenavItems = sidenavItems.map(
    ({ icon, label, href, index }, key) => {
      const itemKey = `item-${key}`;

      return (
        <MDBox
          key={itemKey}
          component="li"
          pt={key === 0 ? 0 : 1}
          onClick={() => {
            clickHandler(index);
          }}
        >
          <MDTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            sx={({
              borders: { borderRadius },
              functions: { pxToRem },
              palette: { light },
              transitions,
            }) => ({
              display: "flex",
              alignItems: "center",
              borderRadius: borderRadius.md,
              padding: `${pxToRem(10)} ${pxToRem(16)}`,
              transition: transitions.create("background-color", {
                easing: transitions.easing.easeInOut,
                duration: transitions.duration.shorter,
              }),

              "&:hover": {
                backgroundColor: light.main,
              },
            })}
          >
            <MDBox mr={1.5} lineHeight={1} color={darkMode ? "white" : "dark"}>
              <Icon fontSize="small">{icon}</Icon>
            </MDBox>
            {label}
          </MDTypography>
        </MDBox>
      );
    }
  );

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "1%",
      }}
    >
      <MDBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {renderSidenavItems}
      </MDBox>
    </Card>
  );
}

export default Sidenav;
