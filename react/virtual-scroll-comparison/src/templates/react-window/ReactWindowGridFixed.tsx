import React, { useCallback, useEffect } from 'react';
import { FixedSizeGrid as Grid, GridOnItemsRenderedProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

import RowElement, { GUTTER_SIZE, IMG_HEIGHT, IMG_WIDTH } from '../RowElement';
import '../styles.css';
interface ReactWindowGridFixedProps {
  data?: any;
  isExpanded?: boolean;
  fetchAction?: (next?: boolean) => Promise<any>;
  isLoading?: boolean;
  dataSource?: string;
}

const ReactWindowGridFixed = (props: ReactWindowGridFixedProps) => {
  const { data, isExpanded, fetchAction, dataSource } = props;
  const columnsCount = isExpanded ? 6 : 2;
  const isItemLoaded = useCallback((index) => index < data.length, [data]);

  const loadMoreItems = useCallback(() => {
    if (typeof fetchAction === 'function') {
      return fetchAction(true);
    }
  }, [fetchAction]);

  const onItemsRenderedCb = useCallback(
    (onItemsRendered: any) => (props: GridOnItemsRenderedProps) => {
      const {
        visibleRowStartIndex,
        visibleRowStopIndex,
        visibleColumnStartIndex,
        visibleColumnStopIndex,
        overscanRowStartIndex,
        overscanRowStopIndex,
        overscanColumnStartIndex,
        overscanColumnStopIndex,
      } = props;

      const overscanStartIndex = overscanRowStartIndex * columnsCount + overscanColumnStartIndex;
      const overscanStopIndex = overscanRowStopIndex * columnsCount + overscanColumnStopIndex;
      const visibleStartIndex = visibleRowStartIndex * columnsCount + visibleColumnStartIndex;
      const visibleStopIndex = visibleRowStopIndex * columnsCount + visibleColumnStopIndex;

      onItemsRendered({
        overscanStartIndex,
        overscanStopIndex,
        visibleStartIndex,
        visibleStopIndex,
      });
    },
    [columnsCount]
  );

  useEffect(() => {
    if (typeof fetchAction === 'function') {
      fetchAction();
    }
  }, [fetchAction]);

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={data?.length + 1}
      loadMoreItems={loadMoreItems}
      threshold={columnsCount}
    >
      {({ onItemsRendered, ref }: any) => (
        <AutoSizer>
          {({ width, height }) => (
            <Grid
              columnCount={columnsCount}
              columnWidth={IMG_WIDTH + GUTTER_SIZE}
              rowCount={Math.ceil(data.length / columnsCount)}
              rowHeight={IMG_HEIGHT + GUTTER_SIZE}
              width={width - GUTTER_SIZE}
              height={height}
              itemData={data}
              ref={ref}
              overscanRowCount={2}
              onItemsRendered={onItemsRenderedCb(onItemsRendered)}
              className="Grid"
            >
              {({ columnIndex, rowIndex, style, data }) => (
                <RowElement
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                  style={style}
                  data={data}
                  columnsCount={columnsCount}
                  dataSource={dataSource}
                />
              )}
            </Grid>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default ReactWindowGridFixed;
