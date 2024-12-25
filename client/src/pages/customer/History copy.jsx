import TabMenu from "../../components/other/TabMenu";

const History = () => {
      const data = [
        {
          id: 1,
          name: "Trong ngân hàng",
          Element: <span>📦 This is the App content.</span>,
        },
        {
          id: 2,
          name: "Liên ngân hàng",
          Element: <span>📄 These are your Messages.</span>,
        },
      ];
  return (
    <div className="">
      <TabMenu tabs={data} />
    </div>
  );
};
export default History;
