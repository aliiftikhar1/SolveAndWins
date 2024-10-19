
import Card from "../dashboard/card/card";
import Chart from "../dashboard/chart/chart";
import styles from "../dashboard/dashboard.module.css";
import Transactions from "../dashboard/transactions/transactions";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {/* {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))} */}
        </div>
        {/* <Transactions />
        <Chart /> */}
        <div className="h-full flex justify-center items-center">

          <h1 className="text-2xl font-bold">
            Admin Dashboard
          </h1>
        </div>
      </div>
  
    </div>
  );
};

export default Dashboard;
