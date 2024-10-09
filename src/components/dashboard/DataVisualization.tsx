import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  ChartOptions,
} from "chart.js";
import { FaChartPie, FaChartBar, FaChartLine } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DataVisualization: React.FC = () => {
  const { categoryExpenses, monthlyTrends } = useAppSelector(
    (state) => state.dashboard
  );

  const doughnutChartData = {
    labels: categoryExpenses.map((item) => item.category),
    datasets: [
      {
        data: categoryExpenses.map((item) => item.amount),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#EC4899",
          "#6366F1",
          "#14B8A6",
          "#F97316",
          "#06B6D4",
        ],
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: monthlyTrends.map((item) => item.month),
    datasets: [
      {
        label: "Income",
        data: monthlyTrends.map((item) => item.income),
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        borderColor: "#10B981",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: monthlyTrends.map((item) => item.expenses),
        backgroundColor: "rgba(239, 68, 68, 0.6)",
        borderColor: "#EF4444",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: monthlyTrends.map((item) => item.month),
    datasets: [
      {
        label: "Net Income",
        data: monthlyTrends.map((item) => item.income - item.expenses),
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const commonOptionsConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    ...commonOptionsConfig,
  };

  const barOptions: ChartOptions<"bar"> = {
    ...commonOptionsConfig,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineOptions: ChartOptions<"line"> = {
    ...commonOptionsConfig,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Expense Distribution"
          icon={<FaChartPie />}
          gradient="from-blue-400 to-blue-600"
          iconColor="text-blue-100"
        >
          <Doughnut data={doughnutChartData} options={doughnutOptions} />
        </ChartCard>
        <ChartCard
          title="Income vs Expenses"
          icon={<FaChartBar />}
          gradient="from-green-400 to-green-600"
          iconColor="text-green-100"
        >
          <Bar data={barChartData} options={barOptions} />
        </ChartCard>
        <ChartCard
          title="Net Income Trend"
          icon={<FaChartLine />}
          gradient="from-purple-400 to-purple-600"
          iconColor="text-purple-100"
        >
          <Line data={lineChartData} options={lineOptions} />
        </ChartCard>
      </div>
    </div>
  );
};

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  gradient: string;
  iconColor: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  icon,
  children,
  gradient,
  iconColor,
}) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-lg p-4 shadow-md`}>
    <div className="flex items-center mb-3">
      <div className={`p-2 rounded-full ${iconColor} bg-white bg-opacity-20`}>
        {icon}
      </div>
      <h3 className="text-sm font-semibold ml-3 text-white">{title}</h3>
    </div>
    <div className="h-48 bg-white bg-opacity-90 rounded-md p-2">{children}</div>
  </div>
);

export default DataVisualization;
