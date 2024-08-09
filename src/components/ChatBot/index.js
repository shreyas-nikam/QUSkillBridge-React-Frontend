import { React, useState, useEffect } from 'react';


// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";


// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from 'components/MDInput';


// Custom styles for the Chatbot
import ChatBotRoot from "components/ChatBot/ChatBotRoot";

// Material Dashboard 2 PRO React context
import {
    useMaterialUIController,
    setOpenChatBot,
} from "context";

// Services
import CrudService from "services/cruds-service";


function ChatBot() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        openChatBot,
        darkMode,
    } = controller;
    const [disabled, setDisabled] = useState(false);
    const [loader, setLoader] = useState(false);

    // Use the useEffect hook to change the button state for the sidenav type based on window size.
    useEffect(() => {
        // A function that sets the disabled state of the buttons for the sidenav type.
        function handleDisabled() {
            return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
        }

        // The event listener that's calling the handleDisabled function when resizing the window.
        window.addEventListener("resize", handleDisabled);

        // Call the handleDisabled function to set the state with the initial value.
        handleDisabled();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleDisabled);
    }, []);

    const handleCloseChatBot = () => setOpenChatBot(dispatch, false);

    const [queryInput, setQueryInput] = useState("");
    const [chatbotResponse, setChatbotResponse] = useState("");
    const [chatbotHistory, setChatbotHistory] = useState([
        { "user_message": "", "bot_message": "Hello, how can I help you today?" },
    ]);

    const course_id = "66a91f79a760e1475cb110a1";

    async function getChatbotResponse(payload) {
        const response = await CrudService.getChatbotResponse(payload);
        return response;
    }

    const updateChatbotHistory = (user_message, bot_message) => {
        setChatbotHistory([...chatbotHistory, { "user_message": user_message, "bot_message": bot_message }]);
    }

    const getResponse = async (message) => {
        setLoader(true);
        const payload = {
            "course_id": course_id,
            // convert the chatbothistory to a string
            "chatbot_history": JSON.stringify(chatbotHistory),
            "query": message
        }
        const response = await getChatbotResponse(payload);
        setLoader(false);
        updateChatbotHistory(message, response["answer"]);
        setChatbotResponse(response);
    }


    return (
        <ChatBotRoot variant="permanent" ownerState={{ openChatBot }}>
            <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
                pt={4}
                pb={0.5}
                px={3}
            >
                <MDBox>
                    <MDTypography variant="h6">QUCopilot</MDTypography>
                </MDBox>

                <Icon
                    sx={({ typography: { size }, palette: { dark, white } }) => ({
                        fontSize: `${size.lg} !important`,
                        color: darkMode ? white.main : dark.main,
                        stroke: "currentColor",
                        strokeWidth: "2px",
                        cursor: "pointer",
                        transform: "translateY(5px)",
                    })}
                    onClick={handleCloseChatBot}
                >
                    close
                </Icon>
            </MDBox>

            <Divider />

            <MDBox pt={0.5} pb={3} px={3}>
                <Grid container spacing={2}>
                    {/* wrap text in the container */}
                    {chatbotHistory.map((chat, index) => {
                        return (
                            <Grid item xs={12} key={index}>
                                <MDBox key={index} mb={2}>
                                    <MDTypography variant="body2" color="secondary" >
                                        User: {chat.user_message }
                                    </MDTypography>
                                    <MDTypography variant="body2" color="primary">AI: {chat.bot_message}</MDTypography>
                                </MDBox>
                            </Grid>
                        );
                    }
                    )}
                    {loader && <MDBox display="flex" justifyContent="center">Loading Response...</MDBox>}
                </Grid>
            </MDBox>
            {/* Push it to the bottom */}
            <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                pb={2}
                px={3}
                style={{ position: "absolute", bottom: 0, width: "100%" }}
            >
                <Divider />
                <MDBox width="100%">
                    {/* create the input and send button for the chatbot */}
                    <MDBox display="flex">
                        <MDBox width="100%">
                            <MDInput
                                type="text"
                                placeholder="Type your message here..."
                                value={queryInput}
                                onChange={(e) => setQueryInput(e.target.value)}
                            />
                        </MDBox>
                        <MDBox>
                            <MDButton
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    getResponse(queryInput);
                                    setQueryInput("");
                                }}
                            >
                                Send
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
        </ChatBotRoot>
    );
}

export default ChatBot;
