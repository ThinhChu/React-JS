import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getDashboardOverview } from "../../services/apiDashboard";
import "../../assets/scss/dashboardPage.scss";
import { useEffect, useState } from "react";

const Dashboard = (props) => {
  const [dataDashboard, setDataDashboard] = useState([
    { name: "Users", value: 0 },
    { name: "Quizzes", value: 0 },
    { name: "Questions", value: 0 },
    { name: "Answers", value: 0 },
  ]);
  const fetchDashboardOverview = async () => {
    let res = await getDashboardOverview();
    if (res && res.EC === 0) {
      let data = [
        { name: "Users", value: res.DT.users.total },
        { name: "Quizzes", value: res.DT.others.countQuiz },
        { name: "Questions", value: res.DT.others.countQuestions },
        { name: "Answers", value: res.DT.others.countAnswers },
      ];
      setDataDashboard(data);
    }
  };

  useEffect(() => {
    fetchDashboardOverview();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="heading-dashboard">Admin Dashboard</div>
        {dataDashboard && (
          <div className="info-number-dashboard-container">
            <div className="box-info-number">
              {dataDashboard.map((item) => {
                return (
                  <div className="item-info-number">
                    <div className="title-info-number">{`Total ${item.name}`}</div>
                    <div className="number">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dataDashboard}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
