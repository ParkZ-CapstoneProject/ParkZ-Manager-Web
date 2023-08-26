import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
// import EarningCard from "./EarningCard";
// import PopularCard from "./PopularCard";
// import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
// import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
// import TotalIncomeLightCard from "./TotalIncomeLightCard";
// import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "store/constant";
import AppWidgetSummary from "ui-component/charts/AppWidgetSummary";
import PieDoneCancel from "ui-component/charts/PieDoneCancel";
import LineChart from "ui-component/charts/LineChart";
import Loading from "ui-component/back-drop/Loading";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();

  const [doneCancelData, setDoneCancelData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [staticCard, setStaticCard] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const responseDoneCancel = await fetch(
      `${apiUrl}/chart/pie/done-cancel-booking?managerId=${userData._id}`
    );
    const dataDoneCancel = await responseDoneCancel.json();
    if (dataDoneCancel) {
      setDoneCancelData(dataDoneCancel.data);
    }

    const responseStatic = await fetch(
      `${apiUrl}/chart/card/statistic-card?managerId=${userData._id}`
    );
    const dataStatic = await responseStatic.json();
    if (dataStatic) {
      setStaticCard(dataStatic.data);
    }

    const responseRevenue = await fetch(
      `${apiUrl}/chart/line/month-or-week-revenue?managerId=${userData._id}&month=1`
    );
    const dataRevenue = await responseRevenue.json();
    if (dataRevenue) {
      setRevenueData(dataRevenue.data);
    }
    setLoading(false);
  };

  if (isLoading) {
    return <Loading loading={isLoading} />;
  }

  return (
    <Grid container spacing={gridSpacing} marginTop={1}>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Tổng đơn đặt"
          total={staticCard?.numberOfOrders}
          icon={"mdi:printer-point-of-sale-plus"}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Tổng doanh thu"
          total={staticCard?.totalOfRevenue}
          color="info"
          icon={"raphael:dollar"}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Số đơn trong ngày"
          total={staticCard?.numberOfOrdersInCurrentDay}
          color="warning"
          icon={"ant-design:windows-filled"}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Số đơn đang chờ"
          total={staticCard?.waitingOrder}
          color="error"
          icon={"game-icons:time-trap"}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={8}>
        <LineChart
          title="Doanh thu"
          subheader="Theo ngày trong tháng"
          chartData={revenueData}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <PieDoneCancel
          title="Đơn hủy và thành công"
          chartData={[
            {
              label: "Đơn thành công",
              value: doneCancelData?.numberOfDoneBooking,
            },
            // { label: "Asia", value: 5435 },
            // { label: "Europe", value: 1443 },
            { label: "Đơn hủy", value: doneCancelData?.numberOfCancelBooking },
          ]}
          chartColors={[
            theme.palette.primary.main,
            // theme.palette.info.main,
            // theme.palette.warning.main,
            theme.palette.error.main,
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
