import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateCardLabelAction } from '../features/cardDetailSlice';

function CardLabels() {
  const card = useSelector((state) => state.cardById.card)
  const cardLabelColors = card.labelColor;
  const cardLabelNames = card.label;
  let cardLabels = [];
  
  (cardLabelColors && cardLabelNames ? cardLabels = cardLabelColors.map((color, index) => {
    // Use the Object.assign() method to create a new object
    // with the properties from the original arrays
    return Object.assign({}, {
      color,
      label: cardLabelNames[index]
    });
  }) : cardLabels = [] );
    
  
  const [showLabels, setShowLabels] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(cardLabels);

  const labelOptions = [
    { color: '#F3CFCF', name: 'Label 1' },
    { color: '#FFD8C6', name: 'Label 2' },
    { color: '#A7E0B5', name: 'Label 3' },
    { color: '#82C9E5', name: 'Label 4' },
    { color: '#D8CADD', name: 'Label 5' }
  ];

  const dispatch = useDispatch();

  const handleLabelButtonEdit = () => {
    setShowLabels(true);
  };

  const handleLabelButtonHide = async () => {
    const requestBody = {
      label: selectedLabels.name,
      labelColor: selectedLabels.color
    }
    // OR, if the body will accept an array of objects, we only need to send selectedLabels in the updateCardLabelAction
    console.log(selectedLabels);
    // await updateCardLabelAction(selectedLabels) 
    setShowLabels(false);
  }

  const handleLabelSelection = (labelIndex) => {
    // update selected labels state
    setSelectedLabels(prevSelectedLabels => {
      if (prevSelectedLabels.includes(labelIndex)) {
        // label is already selected, remove it from selected labels
        return prevSelectedLabels.filter(index => index !== labelIndex);
      } else {
        // label is not selected, add it to selected labels
        return [...prevSelectedLabels, labelIndex];
      }
    });
  };

  return (
    <>
      <Modal.Title>
        Label
        {showLabels ? 
        <Button variant="link" onClick={handleLabelButtonHide}>
          Hide
        </Button> : 
        <Button variant="link" onClick={handleLabelButtonEdit}>
          Edit
        </Button>}
      </Modal.Title>
      {cardLabels && selectedLabels.length > 0 && (
        <span>
          {selectedLabels.map(labelIndex => (
            <span key={labelIndex} style={{ backgroundColor: labelOptions[labelIndex].color, marginRight: "5px"}}>
              {labelOptions[labelIndex].name}
            </span>
          ))}
        </span>
      )}
      {showLabels && (
        <div>
          {labelOptions.map((option, index) => (
            <Form.Check
              type="checkbox"
              key={index}
              label={option.name}
              checked={selectedLabels.includes(index)}
              onChange={() => handleLabelSelection(index)}
              style={{ backgroundColor: option.color }}
            />
          ))}
        </div>
      )}
      <hr />
    </>
  );
}

export default CardLabels;
