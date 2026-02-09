import { useState } from 'react';
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

export const PaceConversionTable = () => {
  const [selectedPace, setSelectedPace] = useState<string | null>(null);

  return (
    <div className="h-screen overflow-auto overscroll-contain">
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
