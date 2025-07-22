import { useQuery } from "@tanstack/react-query";
import React from "react";
import productQueryOption from "../../queryOptions/productQueryOption";

const TestProducts = () => {
  // const { data: productsData } = useQuery(
  //   productQueryOption({ page: 3, limit: 20 }, { staleTime: 6000 })
  // );
  const { data: productsData } = useQuery(
    productQueryOption({ page: 3, limit: 20, id: 126 }, { staleTime: 6000 })
  );

  console.log(productsData);

  return (
    <React.Fragment>
      <section>
        {/* <pre>{JSON.stringify(productsData, null, 2)}</pre> */}

        {Array.isArray(productsData) ? (
          <>
            {productsData.map((p) => (
              <div key={p.id}>{p.title}</div>
            ))}
          </>
        ) : (
          <div>{productsData && productsData?.title}</div>
        )}
      </section>
    </React.Fragment>
  );
};

export default TestProducts;
