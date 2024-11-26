import Space from "./Space/index";
import "./App.css";
import { ConfigProvider } from "./Space/ConfigProvider";

export default function App() {
  return (
    <ConfigProvider space={{ size: 20 }}>
      <Space direction="horizontal">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
      <Space direction="vertical">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
    </ConfigProvider>
  );
}
