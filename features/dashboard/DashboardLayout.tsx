"use client";
// import React from "react";
//
// import Stats from "./Stats";
// import SalesChart from "./SalesChart";
// import DurationChart from "./DurationChart";
// import TodayActivity from "../check-in-out/TodayActivity";
// import {Loader} from '@/components/Loader'
//
// import { useRecentBookings } from "./hooks/useRecentBookings";
// import { useRecentStays } from "./hooks/useRecentStays";
// import { useVehicles } from "../cabins/hooks/useVehicles";
//
//
// const DashboardLayout = () => {
//   const { bookings, isLoading: bookingsIsLoading } = useRecentBookings();
//   const {
//     isLoading: staysIsLoading,
//     confirmedStays,
//     numDays,
//   } = useRecentStays();
//   const { vehicles=[], isLoading: cabinIsLoading } = useVehicles();
//
//   return (
//     <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-5">
//       <Stats
//         bookings={bookings}
//         confirmedStays={confirmedStays}
//         numDays={numDays}
//         cabinCount={vehicles.length}
//         isLoading={bookingsIsLoading || staysIsLoading}
//       />
//       <TodayActivity />
//       <DurationChart confirmedStays={confirmedStays} isLoading={staysIsLoading} />
//       <SalesChart bookings={bookings} numDays={numDays} isLoading={bookingsIsLoading || staysIsLoading} />
//     </div>
//   );
// };
//
// export default DashboardLayout;

// =================================================================================================

// import React, { useState, useEffect } from 'react';
// import './DashboardLayout.css';
// import {
//     MenuFoldOutlined,
//     MenuUnfoldOutlined,
//     LogoutOutlined,
//     UserOutlined,
//     CarryOutOutlined,
//     HomeOutlined,
//     UserSwitchOutlined,
//     ProfileOutlined,
//     LineChartOutlined,
//     CarOutlined,
//     CommentOutlined,
//     MailOutlined
// } from '@ant-design/icons';
//
// import { Button, Layout, Menu, theme } from 'antd';
// // import Booking from '../component/booking/booking';
// // import DashBoard from "../component/dashboard/dashboard";
// // import Customer from '../component/customers/customer';
// // import NotSupported from '../component/notspported/notsupported';
// // import Drivers from '../component/drivers/drivers';
// // import Vehicle from '../component/vehicles/vehicle';
// // import AdminPrfoile from '../component/profile/adminPrfoile';
// // import Income from '../component/report/income';
// // import Comments from '../component/comments/comments';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Badge, Avatar, Space } from "antd";
// const { Header, Sider, Content } = Layout;
//
// function DashboardLayout() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [selectedMenu, setSelectedMenu] = useState('Dashboard');
//     const [isScreenSupported, setIsScreenSupported] = useState(true);
//     const [adminName,setAdminName]=useState('');
//     const navigate = useNavigate();
//     const [bookingsCount,setBookingCount] = useState('');
//
//     const {
//         token: { colorBgContainer, borderRadiusLG },
//     } = theme.useToken();
//
//
//     const getAdminName = () =>{
//         const name =localStorage.getItem('name');
//         setAdminName(name);
//     }
//
//     useEffect(() => {
//         getAdminName();
//         getPendingBookingCount();
//         const checkScreenSize = () => {
//             setIsScreenSupported(window.innerWidth > 1030);
//         };
//
//         checkScreenSize();
//         window.addEventListener('resize', checkScreenSize);
//         return () => window.removeEventListener('resize', checkScreenSize);
//     }, []);
//
//     const getPendingBookingCount = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BACS_URL}/booking/pending/count`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//
//             if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
//
//             const text = await response.text();
//             if (!text) return setBookingCount(0);
//
//             const responseData = JSON.parse(text);
//             setBookingCount(responseData.data || 0);
//         } catch (error) {
//             console.error("Error fetching pending booking count:", error);
//             setBookingCount(0);
//         }
//     };
//
//     const checkMail = () => {
//         const email = localStorage.getItem('email');
//         if (email) {
//             window.location.href = `mailto:${email}`;
//         } else {
//             alert("No email found in localStorage!");
//         }
//     };
//
//
//     const menuItems = [
//         { key: 'Dashboard', icon: <HomeOutlined style={{ fontSize: '24px' }} />, label: 'Dashboard' },
//         {
//             key: "Bookings",
//             icon: <CarryOutOutlined style={{ fontSize: "24px"}} />,
//             label: (
//                 <span>
//           <Badge count={bookingsCount} offset={[10, 0]} style={{ backgroundColor: "#f5222d",marginTop:"5px"}}>
//           <span style={{ color: "white",fontSize: "24px" }}>Bookings</span>
//           </Badge>
//         </span>
//             ),
//         },
//         { key: 'Customers', icon: <UserOutlined style={{ fontSize: '24px' }} />, label: 'Customers' },
//         { key: 'Drivers', icon: <UserSwitchOutlined style={{ fontSize: '24px' }} />, label: 'Drivers' },
//         { key: 'Vehicles', icon: <CarOutlined style={{ fontSize: '24px' }} />, label: 'Vehicles' },
//         { key: 'Profile', icon: <ProfileOutlined style={{ fontSize: '24px' }} />, label: 'Profile' },
//         { key: 'Income', icon: <LineChartOutlined style={{ fontSize: '24px' }} />, label: 'Income' },
//         { key: 'Comments', icon: <CommentOutlined  style={{ fontSize: '24px' }} />, label: 'Comments' },
//         { key: 'log-out', icon: <LogoutOutlined style={{ fontSize: '24px' }} />, label: 'log out' },
//     ];
//
//     const renderContent = () => {
//         switch (selectedMenu) {
//             case 'Dashboard':
//                 return <DashBoard />;
//             case 'Bookings':
//                 return <Booking />;
//             case 'Customers':
//                 return <Customer />;
//             case 'Drivers':
//                 return <Drivers/>;
//             case 'Vehicles':
//                 return <Vehicle/>;
//             case 'Profile':
//                 return <AdminPrfoile/>;
//             case 'Income':
//                 return <Income/>;
//             case 'Comments':
//                 return <Comments/>;
//             case 'log-out':
//                 handleLogout();
//                 return null;
//             default:
//                 return <div>Welcome</div>;
//         }
//     };
//
//     if (!isScreenSupported) {
//         return (
//             <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
//                 <NotSupported />
//             </div>
//         );
//     }
//
//     const handleLogout = () => {
//         localStorage.setItem('token', '');
//         localStorage.setItem('email', '');
//         localStorage.setItem('role', '');
//         localStorage.setItem('id', '');
//         localStorage.setItem('name', '');
//         navigate('/');
//     }
//     return (
//         <div className="h-full w-full overflow-hidden">
//
//             <Layout className="h-screen w-screen">
//
//                 <Sider trigger={null} collapsible collapsed={collapsed}>
//                     <div className="demo-logo-vertical" />
//                     <div className="ml-1 mr-1 h-10 mt-4 mb-6 rounded-lg shadow-lg shadow-blue-500/50 bg-slate-700"></div>
//                     <Menu
//                         className="text-2xl custom-menu"
//                         theme="dark"
//                         mode="inline"
//                         defaultSelectedKeys={['Dashboard']}
//                         items={menuItems}
//                         onClick={(e) => setSelectedMenu(e.key)}
//                     />
//                 </Sider>
//                 <Layout>
//                     <Header style={{ padding: 0, background: colorBgContainer }} className='flex'>
//                         <Button
//                             type="text"
//                             icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '24px' }} /> : <MenuFoldOutlined style={{ fontSize: '24px' }} />}
//                             onClick={() => setCollapsed(!collapsed)}
//                             style={{ fontSize: '16px', width: 64, height: 64 }}
//                         />
//
//                         <div className='w-full  flex justify-end items-center pr-4 '>
//                             <div className='mr-8  bg-sky-950 hover:bg-sky-800 hover:cursor-pointer w-56 flex justify-center items-center gap-2 rounded-xl  shadow-lg p-2 text-lg'
//                                  onClick={checkMail}
//                             >
//                                 <MailOutlined style={{ fontSize: '30px',color: '#fff' }} />
//                                 <h1 className='text-lg font-bold text-white mt-2 hover:cursor-pointer'>check your mails</h1>
//                             </div>
//                             <div className=' bg-sky-950 w-36 flex justify-center items-center gap-2 rounded-xl  shadow-lg p-2 text-lg'>
//                                 <AccountCircleIcon fontSize="large" sx={{ color: '#fff' }}/>
//                                 <h1 className='text-lg font-bold text-white mt-2'>{adminName}</h1>
//                             </div>
//                         </div>
//                     </Header>
//                     <Content
//                         style={{
//                             margin: '24px 16px',
//                             padding: 24,
//                             minHeight: 280,
//                             background: colorBgContainer,
//                             borderRadius: borderRadiusLG,
//                         }}
//                     >
//                         {renderContent()}
//                     </Content>
//
//                 </Layout>
//             </Layout>
//         </div>
//     );
// }
//
// export default DashboardLayout;


// ==========================================================================================================


"use client";
// import React, { useState, useEffect } from 'react';
// import './DashboardLayout.css';
// import {
//     MenuFoldOutlined,
//     MenuUnfoldOutlined,
//     LogoutOutlined,
//     UserOutlined,
//     CarryOutOutlined,
//     HomeOutlined,
//     UserSwitchOutlined,
//     ProfileOutlined,
//     LineChartOutlined,
//     CarOutlined,
//     CommentOutlined,
//     MailOutlined
// } from '@ant-design/icons';
// import { Button, Layout, Menu, theme, Badge } from 'antd';
// import { useRouter } from 'next/navigation';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Axios from "@/lib/axios";
// import Stats from "./Stats";
// import SalesChart from "./SalesChart";
// import DurationChart from "./DurationChart";
// import TodayActivity from "../check-in-out/TodayActivity";
// import { useRecentBookings } from "./hooks/useRecentBookings";
// import { useRecentStays } from "./hooks/useRecentStays";
// import { useVehicles } from "../cabins/hooks/useVehicles";
//
// const { Header, Sider, Content } = Layout;
//
// // NotSupported Component (embedded for completeness)
// const NotSupported = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold mb-4">Page Not Supported</h1>
//         <p className="text-lg mb-2">This page is not supported on your device or screen size.</p>
//         <p className="text-lg">Please access it on a screen wider than 1030px.</p>
//     </div>
// );
//
// function DashboardLayout() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [selectedMenu, setSelectedMenu] = useState('Dashboard');
//     const [isScreenSupported, setIsScreenSupported] = useState(true);
//     const [adminName, setAdminName] = useState('');
//     const [bookingsCount, setBookingCount] = useState(0);
//     const router = useRouter();
//
//     const {
//         token: { colorBgContainer, borderRadiusLG },
//     } = theme.useToken();
//
//     // Dashboard data hooks
//     const { bookings, isLoading: bookingsIsLoading } = useRecentBookings();
//     const { isLoading: staysIsLoading, confirmedStays, numDays } = useRecentStays();
//     const { vehicles = [], isLoading: cabinIsLoading } = useVehicles();
//
//     const getAdminName = () => {
//         const name = localStorage.getItem('name') || 'Admin';
//         setAdminName(name);
//     };
//
//     const getPendingBookingCount = () => {
//         Axios.get('/booking/pending/count')
//             .then((response) => {
//                 const responseData = response.data;
//                 setBookingCount(responseData.data || 0);
//             })
//             .catch((error) => {
//                 console.error("Error fetching pending booking count:", error);
//                 setBookingCount(0);
//             });
//     };
//
//     useEffect(() => {
//         getAdminName();
//         getPendingBookingCount();
//         const checkScreenSize = () => {
//             setIsScreenSupported(window.innerWidth > 1030);
//         };
//
//         checkScreenSize();
//         window.addEventListener('resize', checkScreenSize);
//         return () => window.removeEventListener('resize', checkScreenSize);
//     }, []);
//
//     const checkMail = () => {
//         const email = localStorage.getItem('email');
//         if (email) {
//             window.location.href = `mailto:${email}`;
//         } else {
//             alert("No email found in localStorage!");
//         }
//     };
//
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('email');
//         localStorage.removeItem('role');
//         localStorage.removeItem('id');
//         localStorage.removeItem('name');
//         router.push('/');
//     };
//
//     const menuItems = [
//         { key: 'Dashboard', icon: <HomeOutlined style={{ fontSize: '24px' }} />, label: 'Dashboard' },
//         {
//             key: "Bookings",
//             icon: <CarryOutOutlined style={{ fontSize: "24px" }} />,
//             label: (
//                 <Badge count={bookingsCount} offset={[10, 0]} style={{ backgroundColor: "#f5222d" }}>
//                     <span style={{ color: "white" }}>Bookings</span>
//                 </Badge>
//             ),
//         },
//         { key: 'Customers', icon: <UserOutlined style={{ fontSize: '24px' }} />, label: 'Customers' },
//         { key: 'Drivers', icon: <UserSwitchOutlined style={{ fontSize: '24px' }} />, label: 'Drivers' },
//         { key: 'Vehicles', icon: <CarOutlined style={{ fontSize: '24px' }} />, label: 'Vehicles' },
//         { key: 'Profile', icon: <ProfileOutlined style={{ fontSize: '24px' }} />, label: 'Profile' },
//         { key: 'Income', icon: <LineChartOutlined style={{ fontSize: '24px' }} />, label: 'Income' },
//         { key: 'Comments', icon: <CommentOutlined style={{ fontSize: '24px' }} />, label: 'Comments' },
//         { key: 'log-out', icon: <LogoutOutlined style={{ fontSize: '24px' }} />, label: 'Log out' },
//     ];
//
//     const renderContent = () => {
//         switch (selectedMenu) {
//             case 'Dashboard':
//                 return (
//                     <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-5">
//                         <Stats
//                             bookings={bookings}
//                             confirmedStays={confirmedStays}
//                             numDays={numDays}
//                             cabinCount={vehicles.length}
//                             isLoading={bookingsIsLoading || staysIsLoading}
//                         />
//                         <TodayActivity />
//                         <DurationChart
//                             confirmedStays={confirmedStays}
//                             isLoading={staysIsLoading}
//                         />
//                         <SalesChart
//                             bookings={bookings}
//                             numDays={numDays}
//                             isLoading={bookingsIsLoading || staysIsLoading}
//                         />
//                     </div>
//                 );
//             case 'Bookings':
//                 return <div>Bookings Content (To be implemented)</div>;
//             case 'Customers':
//                 return <div>Customers Content (To be implemented)</div>;
//             case 'Drivers':
//                 return <div>Drivers Content (To be implemented)</div>;
//             case 'Vehicles':
//                 return <div>Vehicles Content (To be implemented)</div>;
//             case 'Profile':
//                 return <div>Profile Content (To be implemented)</div>;
//             case 'Income':
//                 return <div>Income Content (To be implemented)</div>;
//             case 'Comments':
//                 return <div>Comments Content (To be implemented)</div>;
//             case 'log-out':
//                 handleLogout();
//                 return null;
//             default:
//                 return <div>Welcome to the Dashboard</div>;
//         }
//     };
//
//     if (!isScreenSupported) {
//         return (
//             <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
//                 <NotSupported />
//             </div>
//         );
//     }
//
//     return (
//         <Layout style={{ minHeight: '100vh' }}>
//             <Sider trigger={null} collapsible collapsed={collapsed}>
//                 <div className="demo-logo-vertical" />
//                 <div className="ml-1 mr-1 h-10 mt-4 mb-6 rounded-lg shadow-lg shadow-blue-500/50 bg-slate-700" />
//                 <Menu
//                     className="text-2xl custom-menu"
//                     theme="dark"
//                     mode="inline"
//                     selectedKeys={[selectedMenu]}
//                     items={menuItems}
//                     onClick={(e) => setSelectedMenu(e.key)}
//                 />
//             </Sider>
//             <Layout>
//                 <Header style={{ padding: 0, background: colorBgContainer }} className="flex">
//                     <Button
//                         type="text"
//                         icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '24px' }} /> :
//                             <MenuFoldOutlined style={{ fontSize: '24px' }} />}
//                         onClick={() => setCollapsed(!collapsed)}
//                         style={{ fontSize: '16px', width: 64, height: 64 }}
//                     />
//                     <div className="w-full flex justify-end items-center pr-4">
//                         <div
//                             className="mr-8 bg-sky-950 hover:bg-sky-800 hover:cursor-pointer w-56 flex justify-center items-center gap-2 rounded-xl shadow-lg p-2 text-lg"
//                             onClick={checkMail}
//                         >
//                             <MailOutlined style={{ fontSize: '30px', color: '#fff' }} />
//                             <h1 className="text-lg font-bold text-white mt-2 hover:cursor-pointer">
//                                 Check your mails
//                             </h1>
//                         </div>
//                         <div className="bg-sky-950 w-36 flex justify-center items-center gap-2 rounded-xl shadow-lg p-2 text-lg">
//                             <AccountCircleIcon fontSize="large" sx={{ color: '#fff' }} />
//                             <h1 className="text-lg font-bold text-white mt-2">{adminName}</h1>
//                         </div>
//                     </div>
//                 </Header>
//                 <Content
//                     style={{
//                         margin: '24px 16px',
//                         padding: 24,
//                         minHeight: 280,
//                         background: colorBgContainer,
//                         borderRadius: borderRadiusLG,
//                     }}
//                 >
//                     {renderContent()}
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// }
//
// export default DashboardLayout;


// ===================================================================================================================

import React, {useEffect, useRef, useState} from 'react';

import {Col, Row} from 'antd';
import anime from 'animejs';
import 'animate.css';
import {Bar, Line} from 'react-chartjs-2';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import Axios from "@/lib/axios/common";


ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function DashboardLayout() {
    const countRef = useRef(null);
    const countRefVehicle = useRef(null);
    const countRefCustomer = useRef(null);


    const [totalDrivers, setTotalDrivers] = useState(0);
    const [totalVehicles, setTotalVehicle] = useState(0);
    const [totalCustomers, setTotalCustomer] = useState(0);
    const [drivers, setDrivers] = useState([]);


    //get driver count
    const getDriverCount = () => {
        Axios.get('/driver/count')
            .then((response) => {
                const responseData = response.data;
                console.log("DRIVER COUNT: ", responseData.data);
                setTotalDrivers(responseData.data);
            })
            .catch((error) => {
                console.log("Error fetching driver count:", error.response?.data || error.message);
            });
    };

    // Get vehicle count
    const getVehicleCount = () => {
        Axios.get('/vehicle/count')
            .then((response) => {
                const responseData = response.data;
                console.log(responseData.data);
                setTotalVehicle(responseData.data);
            })
            .catch((error) => {
                console.log("Error fetching vehicle count:", error);
            });
    };

// Get customer count
    const getCustomerCount = () => {
        Axios.get('/user/count')
            .then((response) => {
                const data = response.data;
                console.log(data);
                setTotalCustomer(data.data);
            })
            .catch((error) => {
                console.log("Error fetching customer count:", error);
            });
    };

// Get all drivers
    const getAllDrivers = () => {
        Axios.get('/driver/allDrivers')
            .then((response) => {
                const data = response.data;
                console.log(data);
                setDrivers(data.data);
            })
            .catch((error) => {
                console.log("Error fetching all drivers:", error);
            });
    };

    const loadDataInColumnChart = () => {
        Axios.get('/payment/getPaymentByThisWeekDay')
            .then((response) => {
                const data = response.data;
                console.log(data);

                // Extract payment dates and total amounts from the response
                const labels = data.data.map(item => item.paymentDate); // Extract the dates (paymentDate)
                const amounts = data.data.map(item => item.totalAmount); // Extract the total amounts

                // Update the chart data dynamically
                setColumnChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Daily Payments',
                        data: amounts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)',
                        ],
                        borderWidth: 1,
                    }],
                });
            })
            .catch((error) => {
                console.log("Error loading column chart data:", error);
            });
    };

    // bar chart state
    const [columnChartData, setColumnChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Daily Payments',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
        }],
    });

    const loadDataInLineChart = () => {
        Axios.get('/payment/totalPaymentinThisMonth')
            .then((response) => {
                const data = response.data;
                console.log(data);

                // Extract months and totalAmount from the response data
                const months = data.data.map(item => item.monthName);
                const amounts = data.data.map(item => item.totalAmount);

                // Update the chart data with the correct variable name
                setLineData({
                    labels: months,
                    datasets: [{
                        label: 'Monthly Payments',
                        data: amounts,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    }],
                });
            })
            .catch((error) => {
                console.log("Error loading line chart data:", error);
            });
    };

    // Line data chart state
    const [lineData, setLineData] = useState({
        labels: [],
        datasets: [{
            label: 'Monthly Payments',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }],
    });


    useEffect(() => {
        [
            {ref: countRef, total: totalDrivers},
            {ref: countRefVehicle, total: totalVehicles},
            {ref: countRefCustomer, total: totalCustomers}
        ].forEach(({ref, total}) => {
            anime({
                targets: ref.current,
                innerHTML: [total] + "+",
                easing: 'linear',
                round: 1,
                duration: 2000,
            });
        });
    }, [totalDrivers, totalVehicles, totalCustomers]);

    useEffect(() => {
        loadDataInLineChart();
        loadDataInColumnChart();
        getCustomerCount();
        getDriverCount();
        getVehicleCount();
        getAllDrivers();
    }, []);


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {position: 'top'},
            title: {display: true,},
        },
        scales: {y: {beginAtZero: true}},
    };

    return (
        <div className=" w-full p-4 h-full">
            <Row className="flex flex-col lg:flex-row gap-4">
                <Col className="flex-1">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-2xl">
                        {[
                            {title: 'Total Drivers', ref: countRef},
                            {title: 'Total Vehicles', ref: countRefVehicle},
                            {title: 'Total Customers', ref: countRefCustomer}
                        ].map((item, index) => (
                            <div key={index}
                                 className="bg-white rounded-lg shadow-lg p-6 animate__animated animate__backInDown">
                                <div className="flex flex-col items-center justify-center h-32">
                                    <h2 className="text-xl text-sky-900 ">{item.title}</h2>
                                    <span ref={item.ref} className="text-4xl font-semibold">0</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Title */}
                    <div className=" flex justify-center text-center pt-2 pb-2">
                        <h1 className="text-4xl md:text-6xl text-sky-900 animate__animated animate__backInLeft">Mega
                            Ci</h1> <h1
                        className='text-4xl md:text-6xl text-sky-900 animate__animated animate__backInRight'>ty Cab</h1>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate_animated animate_backInUp">
                        <div className="bg-white rounded-lg shadow-lg p-4 h-96">
                            <Bar data={columnChartData} options={chartOptions} width='100%' height='100%'/>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-4 h-96">
                            <Line data={lineData} options={chartOptions} width='100%' height='100%'/>
                        </div>
                    </div>
                </Col>

                {/* Sidebar */}
                <Col
                    className="w-full lg:w-72 bg-white shadow-lg rounded-xl p-4 animate__animated animate__backInRight">
                    <h4 className="text-sky-900 font-normal text-center mb-4">All Active Drivers</h4>

                    {/* Scrollable Container with Inline Scrollbar Styles */}
                    <div
                        className="overflow-y-scroll h-96 justify-center mt-20 space-y-2"
                        style={{
                            scrollbarWidth: "none", /* Firefox */
                        }}
                    >
                        <style>
                            {`
        /* For Webkit Browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          display: none;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: transparent;
        }
      `}
                        </style>

                        {drivers.map((driver) => (
                            <div
                                key={driver.driverId}
                                className="flex justify-between items-center bg-gray-100 shadow-md p-3 rounded-lg"
                            >
                                {/* Driver Name */}
                                <span className="text-sky-900 font-medium">{driver.name}</span>
                                {/* Online Icon */}
                                <span className="text-green-500">
                  <i className="fas fa-circle text-xs"></i>
                </span>
                            </div>
                        ))}
                    </div>
                </Col>


            </Row>
        </div>
    );
}

export default DashboardLayout;












