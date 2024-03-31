import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { Input, Select } from "antd";
import { Card } from "antd";
import moment from "moment";
import DummyBarChart from "./BarChart";

const defaultdata = {
    totalSaleAmount: "",
    totalSoldItems: "",
    totalUnsoldItems: "",
};

const YourComponent = () => {
    const [data, setData] = useState([]);
    console.log("data", data);
    // const [filteredData, setFilteredData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("03");
    console.log("selectedMonth", selectedMonth);
    const [cardData, setCardData] = useState(defaultdata);
    const [bar, setBar] = useState();

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Date of Sale",
            dataIndex: "dateOfSale",
            key: "dateOfSale",
        },
        {
            title: "Sold",
            dataIndex: "sold",
            key: "sold",
            render: (sold) => (sold ? "Yes" : "No"), // Render 'Yes' if sold is true, 'No' otherwise
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/getlist?month=${selectedMonth}`
                );
                setData(response.data?.transactions);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const card = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/statistics?month=${selectedMonth}`
                );
                setCardData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const BarData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/barchart?month=${selectedMonth}`
                );
                setBar(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        BarData();
        card();
    }, [selectedMonth]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };
    const handleInputField = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (!searchValue) {
            return;
        }
        const filteredData = data.filter((item) => {
            const { title, description, price } = item;
            return (
                title.toLowerCase().includes(searchValue) ||
                description.toLowerCase().includes(searchValue) ||
                price.toString().toLowerCase().includes(searchValue) // Convert price to string before comparison
            );
        });
        setData(filteredData);
    };

    return (
        <div className="Container pt-5">
            <>
                <div className="row">
                    <div className="col-md-3">
                        <div style={{ marginTop: "5%" }}>
                            <Input
                                placeholder="Search"
                                onChange={handleInputField}
                                style={{
                                    marginBottom: "10px",
                                    width: "60%",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <span style={{ padding: "1px", color: "orange" }}>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleMonthChange}
                                style={{
                                    fontSize: "16px",
                                    padding: "8px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    backgroundColor: "#f5f5f5",
                                }}
                            >
                                <option value="">Select a month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </span>
                    </div>
                    <div className="col-md-3">
                        <Card
                            style={{
                                width: 200,
                                borderRadius: "10%",
                                boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.1)",
                                marginLeft: "40%",
                                backgroundColor: "#FF8E2A",
                            }}
                        >
                            <p>Total Sale amount : {cardData?.totalSaleAmount}</p>
                            <p>Total Sold Items : {cardData?.totalSoldItems}</p>
                            <p>Total Unsold Items : {cardData?.totalUnsoldItems}</p>
                        </Card>
                    </div>
                </div>
                <div className="Container">
                    <div className="row">
                    <div className="col-md-4">
                        <DummyBarChart bar={bar} />
                    </div>
                    <div className="col-md-8">
                        <span style={{padding:'6% 5% 0% 5%'}}>
                        <Table
                        dataSource={data}
                        columns={columns}
                        pagination={{ pageSize: 2 }}
                        className="custom-table"
                    />
                        </span>

                    </div>
                </div>
                </div>

            </>
        </div>
    );
};

export default YourComponent;
