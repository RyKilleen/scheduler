import "./styles.css";
import { TimelineGrid } from "./TimelineGrid";

export default function App() {
  return (
    <div className="App">
      <Timeline />
    </div>
  );
}

const HOURS = 24;

const hours = Array.from(Array(HOURS));

const Timeline = () => {
  return (
    <div className="timeline">
      <TimelineGuides />
      <div className="timelineHeader">
        {hours.map((_val, i) => (
          <TimelineHour
            key={i}
            hour={i}
            end={i + 1 === hours.length ? i + 1 : undefined}
          />
        ))}
      </div>

      <TimelineGrid />
    </div>
  );
};

const TimelineGuides = () => (
  <div className="tickContainer">
    {Array.from(Array(hours.length - 1)).map((x, i) => (
      <span key={i} className="tick"></span>
    ))}
  </div>
);

const TimelineHour = ({ hour, end }) => {
  return (
    <div className="timelineHour">
      <div className="tickLabel">{hour}:00</div>
      <TimelineTicks />
      {end ? <div className="tickLabel tickLabel--end">{end}:00</div> : <></>}
    </div>
  );
};

const TimelineTicks = () => (
  <div className="timelineTicks">
    <span className="tick"></span>
    <span className="tick"></span>
    <span className="tick"></span>
  </div>
);
