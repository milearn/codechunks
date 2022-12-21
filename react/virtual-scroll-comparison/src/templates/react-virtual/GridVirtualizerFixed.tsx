import React, { useRef, Fragment, useEffect } from 'react';

import { useVirtual } from 'react-virtual';
import RowElement, { IMG_HEIGHT, IMG_WIDTH, GUTTER_SIZE } from '../RowElement';
import '../styles.css';

interface ReactVirtualGridProps {
  data?: any;
  isExpanded?: boolean;
  fetchAction?: (next?: boolean) => Promise<any>;
  isLoading?: boolean;
  dataSource?: string;
}

const GridVirtualizerFixed = (props: ReactVirtualGridProps) => {
  const { data, isExpanded, fetchAction, isLoading, dataSource } = props;
  const columnsCount = isExpanded ? 4 : 2;
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtual({
    size: Math.ceil(data.length / columnsCount),
    parentRef,
    estimateSize: React.useCallback(() => IMG_HEIGHT + GUTTER_SIZE, []),
    overscan: 3,
  });

  useEffect(() => {
    if (typeof fetchAction === 'function') {
      fetchAction();
    }
  }, [fetchAction]);

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.virtualItems].reverse();

    if (!lastItem) {
      return;
    }
    if (lastItem.index * columnsCount >= data.length - columnsCount && !isLoading) {
      if (typeof fetchAction === 'function') {
        fetchAction(true);
      }
    }
  }, [fetchAction, data.length, columnsCount, isLoading, rowVirtualizer.virtualItems]);

  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: columnsCount,
    parentRef,
    estimateSize: React.useCallback(() => IMG_WIDTH + GUTTER_SIZE, []),
    overscan: 2,
  });

  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        paddingLeft: GUTTER_SIZE,
        paddingRight: GUTTER_SIZE,
      }}
    >
      <div
        style={{
          position: 'relative',
          height: `${rowVirtualizer.totalSize}px`,
          width: `${columnVirtualizer.totalSize}px`,
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <Fragment key={virtualRow.index}>
            {columnVirtualizer.virtualItems.map((virtualColumn) => (
              <div
                key={virtualColumn.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${virtualColumn.size}px`,
                  height: `${virtualRow.size}px`,
                  transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                }}
              >
                <RowElement
                  columnsCount={columnsCount}
                  rowIndex={virtualRow.index}
                  columnIndex={virtualColumn.index}
                  data={data}
                  dataSource={dataSource}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default GridVirtualizerFixed;
