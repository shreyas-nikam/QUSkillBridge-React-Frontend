
// @mui material components
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { position } from "stylis";



export default styled(Drawer)(({ theme, ownerState }) => {
    const { boxShadows, functions, transitions } = theme;
    const { openChatBot } = ownerState;

    const chatbotWidth = 360;
    const { lg } = boxShadows;
    const { pxToRem } = functions;

    // drawer styles when openChatBot={true}
    const drawerOpenStyles = () => ({
        width: chatbotWidth,
        left: "initial",
        right: 0,
        bottom: 0,
        transition: transitions.create("right", {
            easing: transitions.easing.sharp,
            duration: transitions.duration.short,
        }),
    });

    // drawer styles when openChatBot={false}
    const drawerCloseStyles = () => ({
        left: "initial",
        right: pxToRem(-350),
        bottom: 0,
        transition: transitions.create("all", {
            easing: transitions.easing.sharp,
            duration: transitions.duration.short,
        }),
    });

    return {
        // push it to the bottom right
        "& .MuiDrawer-paper": {
            height: "50vh",
            margin: 0,
            bottom: 0,
            right: 0,
            padding: `0 ${pxToRem(10)}`,
            borderRadius: 0,
            boxShadow: lg,
            overflowY: "auto",
            ...(openChatBot ? drawerOpenStyles() : drawerCloseStyles()),
        },
    };
});
