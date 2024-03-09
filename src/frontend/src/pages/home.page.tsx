import { Empty } from "antd";
import { MainLayout } from "../layouts/MainLayout";

export const HomePage: React.FC<React.PropsWithChildren> = () => {
  return (
    <MainLayout>
      <Empty description="This page is not available right now." />
    </MainLayout>
  );
};
