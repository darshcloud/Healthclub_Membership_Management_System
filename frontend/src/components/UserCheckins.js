import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VisitorCountChart = ({ selectedLocation }) => {
    const [chartData, setChartData] = useState(null);
    const [timePeriod, setTimePeriod] = useState("weekday");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [selectedOption, setSelectedOption] = useState("90_days"); // Add state for options
    const [showOptionDropdown, setShowOptionDropdown] = useState(true); // state to show/hide option dropdown

    useEffect(() => {
        // Retrieve location_id from local storage
        let locationId;
        try {
            let location= JSON.parse(localStorage.getItem('location'));
            locationId=location.location_id;
        }
        catch (err){
            console.error("Error fetching data:", err);
            // Show error message as a toast notification
            toast.dismiss();
            toast.error("Location needs to be set", {
                position: "top-right",
                autoClose: 3000, // Auto close after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }

        // Define API URL with location_id, time_period, and selected_date as path and query params
        let apiUrl;
        if (timePeriod === "day") {
            apiUrl = `http://127.0.0.1:8000/api/visitorCount/${locationId}/?time_period=${timePeriod}&selected_date=${selectedDate}`;
        } else {
            apiUrl = `http://127.0.0.1:8000/api/visitorCount/${locationId}/?time_period=${timePeriod}&options=${selectedOption}`;
        }

        // Fetch data from API
        fetch(apiUrl, {headers: {
                'Authorization': 'token ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                // Process data to extract hour and visitor_count values
                const labels = data.map((entry) => entry.hour);
                const values = data.map((entry) => entry.visitor_count);

                // Set chart data in state
                setChartData({ labels, values });
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [timePeriod, selectedDate, selectedLocation, selectedOption]);

    useEffect(() => {
        // Create chart after chartData is set
        if (chartData) {
            // Get canvas element and context
            const canvas = document.getElementById("visitorCountChart");
            const ctx = canvas.getContext("2d");

            // Create chart using Chart.js
            let myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: "Visitor Count",
                            data: chartData.values,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            ticks: {
                                // Use a callback function to format y-axis labels as whole numbers
                                callback: (value) => {
                                    if (Number.isInteger(value)) {
                                        return value;
                                    }
                                },
                            },
                        },
                    },
                },
            });
            return () => {
                console.log(chartData)
                myChart.destroy()
            }
        }
    }, [chartData]);

    // Handler for time period select change
    const handleTimePeriodChange = (e) => {
        setTimePeriod(e.target.value);
        setShowOptionDropdown(e.target.value !== "day"); // Show/hide option dropdown based on selected value
    };

// Handler for options select change
    const handleOptionsChange = (e) => {
        setSelectedOption(e.target.value);
    };

// Handler for selected date input change
    const handleSelectedDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

// Handler for submit button click
    const handleSubmit = () => {
        // Perform actions on form submission
    };

// Handler for reset button click
    const handleReset = () => {
        // Reset form values
        setTimePeriod("weekday");
        setShowOptionDropdown(false);
        setSelectedOption("90_days");
        setSelectedDate("");
    };


    return (
        <div>
            <div>
                <label htmlFor="timePeriod">Time Period:</label>
                <select
                    id="timePeriod"
                    name="timePeriod"
                    value={timePeriod}
                    onChange={(e) => {
                        setTimePeriod(e.target.value);
                        setShowOptionDropdown(e.target.value !== "day"); // Show/hide option dropdown based on selected value
                    }}
                >
                    <option value="weekday">Weekday</option>
                    <option value="weekend">Weekend</option>
                    <option value="day">Day</option>
                </select>
            </div>
            {showOptionDropdown && (
                <div>
                    <label htmlFor="options">Options:</label>
                    <select
                        id="options"
                        name="options"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="90_days">90 Days</option>
                    </select>
                </div>
            )}
            {timePeriod === "day" && (
                <div>
                    <label htmlFor="selectedDate">Selected Date:</label>
                    <input
                        type="date"
                        id="selectedDate"
                        name="selectedDate"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
            )}
            <div style={{ width: "40%", margin: "0 auto" }}>
                <canvas id="visitorCountChart" width="5" height="5"></canvas>
            </div>

            <ToastContainer />
        </div>
    );
};

export default VisitorCountChart;

