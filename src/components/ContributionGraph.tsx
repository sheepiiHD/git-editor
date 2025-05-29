import React, { memo, useMemo, useState } from 'react';
import { formatISO, eachDayOfInterval, startOfWeek, endOfWeek, subYears } from 'date-fns';
import '../styles.css';

export type ContributionData = Record<string, number>;

interface Props {
  contributions: ContributionData;
  startOfWeekOnSunday?: boolean;
  onCellClick?: (date: string, count: number) => void;
  deleteMode?: boolean;
  singleMode?: boolean;
}

const CELL_SIZE = 14; // px (incl margin)

const COLORS = [
  '#ebedf0', // level 0
  '#c6e48b',
  '#7bc96f',
  '#239a3b',
  '#196127',
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count < 5) return 1;
  if (count < 10) return 2;
  if (count < 20) return 3;
  return 4;
}

const ContributionGraph: React.FC<Props> = memo((props: Props) => {
  const { contributions, startOfWeekOnSunday = false, onCellClick, deleteMode = false, singleMode = false } = props;
  const [hoverInfo, setHoverInfo] = useState<{ x: number; y: number; date: string; count: number } | null>(null);

  // Build 52 weeks worth of dates (same as GitHub)
  const weeks = useMemo(() => {
    const today = new Date();
    const yearAgo = subYears(today, 1);
    // We want to start on the beginning of the week to align columns
    const startDate = startOfWeek(yearAgo, { weekStartsOn: startOfWeekOnSunday ? 0 : 1 });
    const endDate = endOfWeek(today, { weekStartsOn: startOfWeekOnSunday ? 0 : 1 });

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });
    const byWeeks: Date[][] = [];

    for (let i = 0; i < allDays.length; i += 7) {
      byWeeks.push(allDays.slice(i, i + 7));
    }

    return byWeeks as Date[][];
  }, [startOfWeekOnSunday]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, date: string, count: number) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setHoverInfo({ x: rect.left + rect.width / 2, y: rect.top, date, count });
  };

  const handleMouseLeave = () => setHoverInfo(null);

  const cellStyle = (count: number) => ({
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: COLORS[getLevel(count)],
  });

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex' }}>
        {weeks.map((week: Date[], weekIndex: number) => (
          <div key={weekIndex} style={{ display: 'flex', flexDirection: 'column' }}>
            {week.map((day: Date, dayIndex: number) => {
              const key = formatISO(day, { representation: 'date' });
              const count = contributions[key] ?? 0;
              return (
                <div
                  key={dayIndex}
                  className="gcg-cell"
                  style={cellStyle(count)}
                  onMouseDown={() => onCellClick?.(key, count)}
                  onMouseEnter={e => {
                    if ((deleteMode || singleMode) && e.buttons === 1) {
                      onCellClick?.(key, count);
                    }
                    handleMouseEnter(e, key, count);
                  }}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          </div>
        ))}
      </div>
      {hoverInfo && (
        <div
          style={{
            position: 'fixed',
            top: hoverInfo.y - 40,
            left: hoverInfo.x,
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 12,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 1000,
          }}
        >
          {hoverInfo.count} contribution{hoverInfo.count !== 1 ? 's' : ''} on {hoverInfo.date}
        </div>
      )}
    </div>
  );
});

ContributionGraph.displayName = 'ContributionGraph';

export default ContributionGraph; 