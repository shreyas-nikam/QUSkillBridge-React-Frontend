/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.nikam-shreyas.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import { Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CrudService from "services/cruds-service";
import HTMLReactParser from "html-react-parser";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { substr } from "stylis";

function PersonaManagement() {
    let { state } = useLocation();
    const ability = useAbility(AbilityContext);
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [notification, setNotification] = useState({
        value: false,
        text: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await CrudService.getPersonas();
            setData(response.data);
        })();
    }, []);

    useEffect(() => {
        if (!state) return;
        setNotification({
            value: state.value,
            text: state.text,
        });
    }, [state]);

    useEffect(() => {
        setTableData(getRows(data));
    }, [data]);

    useEffect(() => {
        if (notification.value === true) {
            let timer = setTimeout(() => {
                setNotification({
                    value: false,
                    text: "",
                });
            }, 5000);
        }
    }, [notification]);

    const clickAddHandler = () => {
        navigate("/persona-management/new-persona");
    };

    const clickEditHandler = (id) => {
        navigate(`/persona-management/edit-persona/${id}`);
    };

    const clickDeleteHandler = async (e, id) => {
        try {
            if (!confirm("Are you sure you want to delete this persona?")) {
                e.nativeEvent.stopImmediatePropagation();
            } else {
                await CrudService.deletePersona(id);
                // the delete does not send a response
                // so I need to get again the personas to set it and this way the table gets updated -> it goes to the useEffect with data dependecy
                const response = await CrudService.getPersonas();
                setData(response.data);
                setNotification({
                    value: true,
                    text: "The persona has been successfully deleted",
                });
            }
        } catch (err) {
            // it sends error is the persona is associated with an item
            console.error(err);
            if (err.hasOwnProperty("errors")) {
                setNotification({
                    value: true,
                    text: err.errors[0].title,
                });
            }
            return null;
        }
    };

    const getRows = (info) => {
        let updatedInfo = info.map((row) => {
            return {
                type: "personas",
                id: row.id,
                name: row.attributes.name,
                description: row.attributes.description
            };
        });
        return updatedInfo;
    };

    const dataTableData = {
        columns: [
            { Header: "name", accessor: "name", width: "25%" },
            {
                Header: "description",
                accessor: "description",
                width: "50%",
                Cell: ({ cell: { value } }) => HTMLReactParser(substr(value, 0, 120) + "..."),
            },
            {
                Header: "actions",
                disableSortBy: true,
                accessor: "",
                width: "25%",
                Cell: (info) => {
                    return (
                        <MDBox display="flex" alignItems="center">
                            {ability.can("delete", "personas") && (
                                <Tooltip title="Delete Persona">
                                    <IconButton onClick={(e) => clickDeleteHandler(e, info.cell.row.original.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {ability.can("edit", "personas") && (
                                <Tooltip title="Edit persona">
                                    <IconButton onClick={() => clickEditHandler(info.cell.row.original.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </MDBox>
                    );
                },
            },
        ],

        rows: tableData,
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {notification.value && (
                <MDAlert color="info" my="20px">
                    <MDTypography variant="body2" color="white">
                        {notification.text}
                    </MDTypography>
                </MDAlert>
            )}
            <MDBox pt={6} pb={3}>
                <MDBox mb={3}>
                    <Card>
                        <MDBox p={3} lineHeight={1} display="flex" justifyContent="space-between">
                            <MDTypography variant="h5" fontWeight="medium">
                                Persona Management
                            </MDTypography>
                            {ability.can("create", "personas") && (
                                <MDButton
                                    variant="gradient"
                                    color="dark"
                                    size="small"
                                    type="submit"
                                    onClick={clickAddHandler}
                                >
                                    + Add Persona
                                </MDButton>
                            )}
                        </MDBox>
                        <DataTable table={dataTableData} />
                    </Card>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default PersonaManagement;
