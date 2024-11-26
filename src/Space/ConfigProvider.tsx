import React, { PropsWithChildren } from "react";
import { SizeType } from ".";

// PropsWithChildren 为组件属性自动添加 children 属性

export interface ConfigContextType {
  space?: {
    size?: SizeType;
  };
}
export const ConfigContext = React.createContext<ConfigContextType>({}); // 创建上下文

// 如何使用？

// 注入！
// const App: React.FC = () => {
//   return (
//     <ConfigContext.Provider value={{ space: { size: "large" } }}>
//       <YourComponent />
//     </ConfigContext.Provider>
//   );
// };

// 消费！
// const YourComponent: React.FC = () => {
//   const config = useContext(ConfigContext);

//   return <div>Space Size: {config.space?.size}</div>;
// };

/**
 * 再包裹一层
 */
interface ConfigProviderProps extends PropsWithChildren<ConfigContextType> {}

export function ConfigProvider(props: ConfigProviderProps) {
  const { space, children } = props;

  return (
    <ConfigContext.Provider value={{ space }}>
      {children}
    </ConfigContext.Provider>
  );
}

/**
 * 包裹 ConfigProvider 实现统一设置 size
 */
