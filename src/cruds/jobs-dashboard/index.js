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
import MDAvatar from "components/MDAvatar";
import { Tooltip, IconButton, Icon } from "@mui/material";

import CrudService from "services/cruds-service";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "context";


function JobsDashboard() {
    const { setIsAuthenticated, getCurrentUser } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState({});


    const navigate = useNavigate();


    const [tableData, setTableData] = useState([]);


    // function to get the jobs data for the particular user
    useEffect(() => {
        async function checkToken() {
            let user_id = await getCurrentUser();
            if (!user_id) {
                setIsAuthenticated(false);
                localStorage.removeItem("token");
            }
            else {
                setUser(user_id);
                return user_id;
            }
        }
        async function fetchJobsData(userId) {
            let response = await CrudService.getJobsByPersona(userId);
            console.log("response data", response);
            setJobs(response);
        }
        checkToken().then((userId) => fetchJobsData(userId));
    }, []);


    const getJobs = (jobs) => {
        return jobs.map((job) => {
            return {
                _id: job._id,
                company: job.company,
                title: job.title,
                job_url: job.job_url,
                location: job.location,
                job_type: job.job_type,
                date_posted: job.date_posted,
                description: job.description.substring(0, 100) + "...",
                company_url: job.company_url,
                logo_photo_url: job.logo_photo_url,
            };
        });
    };


    useEffect(() => {
        setTableData(getJobs(jobs));
    }, [jobs]);


    const clickExploreHandler = (id) => {
        navigate(`/jobs-dashboard/expanded-job/${id}`);
    };


    const dataTableData = {
        columns: [
            {
                Header: "Company Logo",
                accessor: "logo_photo_url",
                width: "15%",
                disableSortBy: true,
                Cell: ({ cell: { value } }) => {
                    return (
                        <>
                            <MDAvatar src={value} alt="profile-image" size="xl" shadow="sm" />
                        </>
                    );
                },
            },
            { Header: "company", accessor: "company", width: "15%" },
            { Header: "title", accessor: "title", width: "15%" },
            {
                Header: "job link", accessor: "job_url", width: "20%",
                Cell: ({ cell: { value } }) => {
                    return (
                        <MDButton
                            variant="outlined"
                            color="secondary"
                            onClick={() => window.open(value, "_blank")}
                        >
                            Apply
                        </MDButton>
                    );
                }
            },
            { Header: "location", accessor: "location", width: "15%" },
            { Header: "job type", accessor: "job_type", width: "15%" },
            { Header: "description", accessor: "description", width: "15%" },
            { Header: "company url", accessor: "company_url", width: "15%" },
            {
                Header: "explore",
                disableSortBy: true,
                accessor: "",
                Cell: (info) => {
                    return (
                        <MDBox display="flex" alignItems="center">
                            <Tooltip
                                title="Explore Job"
                                onClick={(e) => clickExploreHandler(info.cell.row.original._id)}
                            >
                                <IconButton>
                                    <Icon>explore</Icon>
                                </IconButton>
                            </Tooltip>
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

            <MDBox pt={6} pb={3}>
                <MDBox mb={3}>
                    <Card>
                        <MDBox p={3} lineHeight={1} display="flex" justifyContent="space-between">
                            <MDTypography variant="h5" fontWeight="medium">
                                Jobs Dashboard
                            </MDTypography>
                        </MDBox>
                        <DataTable table={dataTableData} />
                    </Card>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default JobsDashboard;
