import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableList = ({ parameters, onReorder }) => {
  const [items, setItems] = useState(parameters);

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex];
    const updatedItems = [...items];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setItems(updatedItems);
    onReorder(updatedItems); // Notify parent of reordered list
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          index={index}
          item={item}
          moveItem={moveItem}
        />
      ))}
    </DndProvider>
  );
};

const DraggableItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: 'item',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'item',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="p-2 mb-2 bg-gray-200 rounded">
      {item.label}
    </div>
  );
};

export default DraggableList;
