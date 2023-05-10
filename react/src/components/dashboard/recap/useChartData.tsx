const useChartData = (
  arr: { createdAt: string; cost?: number }[],
  head: string,
  type?: string
) => {
  const dataByMonth = arr?.reduce((acc: any, product) => {
    const month = new Date(product?.createdAt).toLocaleString("default", {
      month: "long",
    });
    acc[month] = (acc[month] || 0) + (type === "earn" ? product.cost : 1);
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(dataByMonth || []),
    datasets: [
      {
        label: head,
        data: Object.values(dataByMonth || []),
        backgroundColor: ["#FF8A80", "#80DEEA", "#1877f2"],
      },
    ],
  };

  return barChartData;
};

export default useChartData;
