import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return <div className=""></div>;
};

export default ExpenseOverview;
