import { useRef, useState, type TouchEvent } from 'react';
import { buildPaceRows } from '../utils/pace';

const rows = buildPaceRows();

const columns = [
  { key: 'pace', label: 'Pace (min/km)' },
  { key: 'speed', label: 'Speed (km/h)' },
  { key: 'duration5k', label: '5 km' },
  { key: 'duration10k', label: '10 km' },
  { key: 'durationHalfMarathon', label: 'Semi-marathon' },
  { key: 'durationMarathon', label: 'Marathon' }
] as const;

const AXIS_LOCK_THRESHOLD = 5;
const HORIZONTAL_DOMINANCE_RATIO = 1.08;
const VERTICAL_DOMINANCE_RATIO = 1.55;
const AXIS_FALLBACK_DISTANCE = 16;

export const PaceConversionTable = () => {
  const [selectedPace, setSelectedPace] = useState<string | null>(null);
  const [scrollAxisLock, setScrollAxisLock] = useState<'x' | 'y' | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setScrollAxisLock(null);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (scrollAxisLock || !touchStartRef.current) {
      return;
    }

    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // Wait for a minimum movement to avoid locking on tiny jitters.
    if (Math.max(deltaX, deltaY) < AXIS_LOCK_THRESHOLD) {
      return;
    }

    if (deltaX > deltaY * HORIZONTAL_DOMINANCE_RATIO) {
      setScrollAxisLock('x');
      return;
    }

    if (deltaY > deltaX * VERTICAL_DOMINANCE_RATIO) {
      setScrollAxisLock('y');
      return;
    }

    // If gesture remains diagonal, prefer horizontal to avoid unwanted vertical drift.
    if (Math.max(deltaX, deltaY) >= AXIS_FALLBACK_DISTANCE) {
      setScrollAxisLock('x');
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    setScrollAxisLock(null);
  };

  return (
    <div
      className="h-screen overflow-auto overscroll-contain"
      style={{
        WebkitOverflowScrolling: 'touch',
        touchAction:
          scrollAxisLock === 'x'
            ? 'pan-x'
            : scrollAxisLock === 'y'
              ? 'pan-y'
              : 'pan-x pan-y'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            {columns.map((column, index) => {
              const isFirstColumn = index === 0;

              return (
                <th
                  key={column.key}
                  className={[
                    'sticky top-0 border-b border-border bg-surfaceAlt px-3 py-3 text-left font-semibold',
                    isFirstColumn
                      ? 'left-0 z-50 min-w-[150px] border-r border-border'
                      : 'z-40 min-w-[120px]'
                  ].join(' ')}
                  scope="col"
                >
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const rowBackground = rowIndex % 2 === 0 ? 'bg-surfaceAlt' : 'bg-surface';
            const isSelected = selectedPace === row.pace;
            const selectedBackground = 'bg-selectedRow';

            return (
              <tr
                key={row.pace}
                className="group cursor-pointer"
                onClick={() => setSelectedPace(row.pace)}
              >
                {columns.map((column, index) => {
                  const isFirstColumn = index === 0;
                  const cellBackground = isSelected
                    ? selectedBackground
                    : `${rowBackground} group-hover:bg-appBg/40`;

                  return (
                    <td
                      key={`${row.pace}-${column.key}`}
                      className={[
                        `border-b border-border px-3 py-2.5 text-textPrimary ${cellBackground} transition-colors`,
                        isFirstColumn
                          ? 'sticky left-0 z-20 w-[150px] min-w-[150px] border-r border-border font-semibold'
                          : ''
                      ].join(' ')}
                    >
                      {row[column.key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
