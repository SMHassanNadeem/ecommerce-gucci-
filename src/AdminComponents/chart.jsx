import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
);


import {
    ChoroplethController,
    GeoFeature,
    ProjectionScale,
    ColorScale,
} from "chartjs-chart-geo";
import { useEffect, useRef } from "react";

ChartJS.register(
    ChoroplethController,
    GeoFeature,
    ProjectionScale,
    ColorScale,
    Tooltip,
    Legend
);


export default function Chart({ data }) {

    const data1 = {
        labels: data?.map((item) => item.created_at.slice(0, 10)) || [],
        datasets: [
            {
                label: "Earning",
                data: data?.map((item) => item.total).reduce((acc, val) => {
                    const last = acc.length > 0 ? acc[acc.length - 1] : 0;
                    acc.push(parseInt(last) + parseInt(val));
                    return acc;
                }, []) || [],
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: "rgb(75, 192, 192)",
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
            },
        },
    };


    const productTotals = data?.reduce((acc, order) => {
        order.product.forEach((p) => {
            acc[p.title] = (acc[p.title] || 0) + p.quantity;
        });
        return acc;
    }, {}) || {};

    const data2 = {
        labels: Object.keys(productTotals),
        datasets: [
            {
                label: "Top Selling Products",
                data: Object.values(productTotals),
                backgroundColor: [
                    "rgba(76, 120, 168, 0.6)",
                    "rgba(229, 87, 86, 0.6)",
                    "rgba(114, 183, 178, 0.6)",
                    "rgba(84, 162, 75, 0.6)",
                    "rgba(238, 202, 59, 0.6)",
                    "rgba(178, 121, 162, 0.6)",
                    "rgba(157, 117, 93, 0.6)",
                    "rgba(186, 176, 172, 0.6)",
                    "rgba(255, 157, 166, 0.6)",
                    "rgba(92, 99, 112, 0.6)"
                ],
                borderColor: "gray",
                borderWidth: 1,
            },
        ],
    };
    const options1 = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            tooltip: {
                callbacks: {
                    label: function (ctx) {
                        let label = ctx.label || "";
                        let value = ctx.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    const chartRef = useRef(null);

    useEffect(() => {
        async function load() {
            if (!data || data.length === 0) return;

            const res = await fetch(
                "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
            );
            const worldMap = await res.json();
            const ctx = chartRef.current.getContext("2d");


            const userData = data.reduce((acc, item) => {
                if (!item.country) return acc;
                acc[item.country] = (acc[item.country] || 0) + (item.total || 0);
                return acc;
            }, {});


            const mapData = worldMap.features.map((feature) => ({
                feature,
                value: userData?.[feature.properties.name] || 0,
            }));

            console.log("userData:", userData);
            new ChartJS(ctx, {
                type: "choropleth",
                data: {
                    labels: worldMap.features.map((d) => d.properties.name),
                    datasets: [
                        {
                            label: "Amount by Country",
                            data: mapData,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        projection: {
                            axis: "x",
                            projection: "equalEarth",
                        },
                        color: {
                            axis: "y",
                            quantize: 70, 
                            domain: [0, 100],
                        },
                    },
                },
            });
        }
        load();
    }, [data]);


    return (
        <>
            <div className="flex flex-col gap-3 w-[88vw] h-[90vh]">
                <div className="ml-[6%] mt-4 flex gap-3 flex-wrap sm:flex-nowrap w-full sm:w-[77vw] sm:h-[45vh] sm:mb-[3vh]">
                    <div className="h-[50%] sm:h-[100%] w-[100%] sm:w-[49vw] rounded bg-gray-200">
                        <Line data={data1} options={options} />
                    </div>
                    <div className="flex justify-center w-[90%] mt-[10px] sm:mt-0 sm:w-[35%] h-[50%] sm:h-[100%] rounded bg-gray-200">
                        <Pie data={data2} options={options1} />
                    </div>
                </div>
                <div className="ml-[6%] w-[50vw] h-[100vh] border">
                    <canvas className="w-full h-full" ref={chartRef}></canvas>
                </div>
            </div>
        </>
    )
}