import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import Carret from './Carret';
import DraggedField from '../DraggedField';
import PreviewCarret from '../PreviewCarret';
import Wrapper from './Wrapper';

// eslint-disable-next-line react/display-name
const DraggedFieldWithPreview = forwardRef(
  (
    {
      goTo,
      groupUid,
      isDragging,
      name,
      onClickEdit,
      onClickRemove,
      selectedItem,
      showLeftCarret,
      showRightCarret,
      size,
      style,
      type,
    },
    refs
  ) => {
    const isHidden = name === '_TEMP_';
    const [dragStart, setDragStart] = useState(false);
    const opacity = isDragging ? 0.2 : 1;
    const isFullSize = size === 12;
    const display = isFullSize && dragStart ? 'none' : '';
    const width = isFullSize && dragStart ? 0 : '100%';
    const withLongerHeight =
      ['json', 'text', 'file', 'media', 'group', 'richtext'].includes(type) &&
      !dragStart;
    const carretStyle = withLongerHeight ? { height: '102px' } : {};

    return (
      <div
        style={{ width: `${(1 / 12) * size * 100}%` }}
        onDrag={() => {
          if (isFullSize && !dragStart) {
            setDragStart(true);
          }
        }}
        onDragEnd={() => {
          if (isFullSize) {
            setDragStart(false);
          }
        }}
      >
        <Wrapper
          ref={refs.dropRef}
          withLongerHeight={withLongerHeight}
          style={style}
        >
          {dragStart && isFullSize && (
            <PreviewCarret style={{ marginRight: '-10px' }} />
          )}
          <>
            {showLeftCarret && <Carret style={carretStyle} />}

            <div className="sub" style={{ width, opacity }}>
              <DraggedField
                goTo={goTo}
                groupUid={groupUid}
                isHidden={isHidden}
                name={name}
                onClick={onClickEdit}
                onRemove={onClickRemove}
                ref={refs.dragRef}
                selectedItem={selectedItem}
                style={{ padding: 0, margin: 0, display }}
                type={type}
                withLongerHeight={withLongerHeight}
              ></DraggedField>
            </div>
            {showRightCarret && <Carret right style={carretStyle} />}
          </>
        </Wrapper>
      </div>
    );
  }
);

DraggedFieldWithPreview.defaultProps = {
  goTo: () => {
    console.log('l');
  },
  groupUid: null,
  isDragging: false,
  onClickEdit: () => {},
  onClickRemove: () => {},
  selectedItem: '',
  showLeftCarret: false,
  showRightCarret: false,
  size: 1,
  style: {},
  type: 'string',
};

DraggedFieldWithPreview.propTypes = {
  goTo: PropTypes.func,
  groupUid: PropTypes.string,
  isDragging: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func,
  onClickRemove: PropTypes.func,
  selectedItem: PropTypes.string,
  showLeftCarret: PropTypes.bool,
  showRightCarret: PropTypes.bool,
  size: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default DraggedFieldWithPreview;