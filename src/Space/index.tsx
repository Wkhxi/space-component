import classNames from "classnames";
import React, { useContext, useMemo } from "react";
import "./index.scss";
import { ConfigContext } from "./ConfigProvider";

export type SizeType = "small" | "middle" | "large" | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;

  size?: SizeType | [SizeType, SizeType];
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode; // jsx
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SizeType) {
  return typeof size === "string" ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = (props) => {
  const { space } = useContext(ConfigContext);

  const {
    className,
    style,
    children,
    size = space?.size || "small",
    direction = "horizontal",
    align,
    split,
    wrap = false,
    ...otherProps
  } = props;

  const mergeAlign =
    direction === "horizontal" && align === undefined ? "center" : align;

  /**
   * 合并 class
   */
  const cn = classNames(
    "space",
    `space-${direction}`,
    { [`space-align-${mergeAlign}`]: mergeAlign },
    className
  );

  /**
   * 遍历子节点 给每个 子节点外套一层div
   */
  const childNodes = React.Children.toArray(props.children); // React.Children.toArray 会对 children 做扁平化处理
  const nodes = childNodes.map((v: any, idx) => {
    const key = v?.key || `space-item-${idx}`;
    return (
      <>
        <div className="space-item" key={key}>
          {v}
        </div>
        {idx < childNodes.length && split && (
          <span className={`${className}-split`} style={style}>
            {split}
          </span>
        )}
      </>
    );
  });

  const otherStyles: React.CSSProperties = {};

  // 根据 size 调整间距
  const [horizontalSize, verticalSize] = useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(
        (item) => getNumberSize(item)
      ),
    [size]
  );

  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  if (wrap) {
    otherStyles.flexWrap = "wrap";
  }

  return (
    <div
      className={cn}
      style={{
        ...otherStyles,
        ...style,
      }}
      {...otherProps}
    >
      {nodes}
    </div>
  );
};

export default Space;
