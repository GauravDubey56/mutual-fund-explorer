import { Typography } from "antd";

const PageTitle = ({ title }) => {
  const { Title } = Typography;
  return <Title level={2}>{title}</Title>;
};

export default PageTitle;
