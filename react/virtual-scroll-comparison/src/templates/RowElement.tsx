import { CSSProperties, Suspense, useState } from 'react';
import Shimmer from '../components/Shimmer/Shimmer';
import ProgressiveImage from 'react-progressive-image';
interface RowElementProps {
  rowIndex: number;
  columnIndex: number;
  columnsCount: number;
  style?: CSSProperties;
  data: any;
  dataSource: string | undefined;
}

export const IMG_WIDTH = 122;
export const IMG_HEIGHT = 80;
export const GUTTER_SIZE = 24;

const RowElement = ({
  columnIndex,
  columnsCount,
  rowIndex,
  style,
  data,
  dataSource,
}: RowElementProps) => {
  const itemObj = data[rowIndex * columnsCount + columnIndex];
  const getMediaUrl = (dataSource?: string): string => {
    switch (dataSource) {
      case 'PICSUM':
        return 'https://picsum.photos/id/' + itemObj?.id + '/200/300';
      case 'TENOR':
      default:
        return itemObj?.media[0]?.nanogif?.url ?? '';
      // tenor mp4 url
      // const mediaURL = itemObj?.media[0]?.mp4?.url;
    }
  };

  const mediaURL = getMediaUrl(dataSource);

  return (
    <div style={style}>
      <ProgressiveImage src={mediaURL} placeholder="">
        {(image: any, loading: any) => {
          return <>
          <img
              width={loading? 0: IMG_WIDTH}
              height={loading? 0: IMG_HEIGHT}
              style={{ borderRadius:4, opacity: loading? 0: 1, transition: 'opacity 0.3s ease-out 0s'}}
              src={image}
            />
            {loading && <Shimmer width={IMG_WIDTH} height={IMG_HEIGHT} style={{borderRadius: 4}}/>}
            </>
        }}
      </ProgressiveImage>
    </div>
  );
};
export default RowElement;
