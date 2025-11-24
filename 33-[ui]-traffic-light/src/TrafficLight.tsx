import { useEffect, useState, type FC } from "react";
import type { Color, Config } from "./App";

interface TrafficLightProps {
  config: Config;
  layout?: "vertical" | "horizontal";
  initialColor?: Color;
}

const TrafficLight: FC<TrafficLightProps> = ({
  config,
  layout = "vertical",
  initialColor = "green",
}) => {
  const [activeLight, setActiveLight] = useState<Color>(initialColor);

  useEffect(() => {
    const { duration, next } = config[activeLight];

    const timer = setTimeout(() => {
      setActiveLight(next);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [config, activeLight]);

  return (
    <div
      aria-live="polite"
      aria-label={`Current light: ${activeLight}`}
      className={[
        "traffic-light-container",
        layout === "vertical" && "traffic-light-container--vertical",
      ]
        .filter((cls) => !!cls)
        .join(" ")}
    >
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === activeLight ? config[color].backgroundColor : "gray"
          }
        />
      ))}
    </div>
  );
};

export default TrafficLight;

const Light = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <div
      aria-hidden={true}
      className="traffic-light"
      style={{ backgroundColor }}
    />
  );
};
