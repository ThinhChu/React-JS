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
import { useTranslation } from "react-i18next";

const Dashboard = (props) => {
  const { t } = useTranslation();

  const [dataDashboard, setDataDashboard] = useState([
    { name: t("admin.dashboard.t-user"), value: 0 },
    { name: t("admin.dashboard.t-quiz"), value: 0 },
    { name: t("admin.dashboard.t-question"), value: 0 },
    { name: t("admin.dashboard.t-answer"), value: 0 },
  ]);

  const fetchDashboardOverview = async () => {
    let res = await getDashboardOverview();
    if (res && res.EC === 0) {
      let data = [
        {
          name: t("admin.dashboard.t-user"),
          value: res.DT.users.total,
        },
        {
          name: t("admin.dashboard.t-quiz"),
          value: res.DT.others.countQuiz,
        },
        {
          name: t("admin.dashboard.t-question"),
          value: res.DT.others.countQuestions,
        },
        {
          name: t("admin.dashboard.t-answer"),
          value: res.DT.others.countAnswers,
        },
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
        <div className="heading-dashboard">{t("admin.dashboard.title")}</div>
        {dataDashboard && (
          <div className="info-number-dashboard-container">
            <div className="box-info-number">
              {dataDashboard.map((item, key) => {
                return (
                  <div className="item-info-number" key={`item-${key}`}>
                    <div className="title-info-number">
                      {t("admin.dashboard.t-total")} {item.name}
                    </div>
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
