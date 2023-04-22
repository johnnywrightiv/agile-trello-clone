import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCardLabelAction, addCardLabelAction, fetchCardByIdAction } from '../../features/cardDetailSlice';

function CardLabels() {
  const cardId = useSelector((state) => state.columnAndCardInfo.cardId);
  const cardLabelData = useSelector((state) => state.cardById.card.labels)
  const cardLabels = cardLabelData.map(({labelColor, title}) => { return { labelColor, title } })
  
  const [showLabels, setShowLabels] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(cardLabels);

  const labelOptions = [
    { labelColor: '#F3CFCF', title: 'Label 1' },
    { labelColor: '#FFD8C6', title: 'Label 2' },
    { labelColor: '#A7E0B5', title: 'Label 3' },
    { labelColor: '#82C9E5', title: 'Label 4' },
    { labelColor: '#D8CADD', title: 'Label 5' }
  ];

  const dispatch = useDispatch();

  useEffect(() => {

  }, [cardLabelData])
  const handleLabelButtonEdit = () => {
    setShowLabels(true);
  };

  const handleLabelButtonHide = () => {
    setShowLabels(false);
  }

  const handleLabelSelection = async (selectedLabel) => {
    // if label is already selected, remove it from the selectedLabels
    if (selectedLabels.length > 0 && selectedLabels.some(label => label.labelColor === selectedLabel.labelColor)) {
        // find index of matching label in local state
        const labelToRemoveIndex = selectedLabels.findIndex(label => label.labelColor === selectedLabel.labelColor);
        const labelToDeleteId = cardLabelData[labelToRemoveIndex]._id;
        // remove label from card
        await dispatch(deleteCardLabelAction(labelToDeleteId));
        dispatch(fetchCardByIdAction(cardId));
        // remove label from selectedLabels local state
        const updatedSelectedLabels = selectedLabels.filter(label => label.labelColor !== selectedLabel.labelColor);
        console.log(updatedSelectedLabels);
        setSelectedLabels(updatedSelectedLabels);
    } else {
        // if label is not selected, add it to selectedLabels local state and the card database
        const requestBody = {
            title: selectedLabel.title,
            labelColor: selectedLabel.labelColor,
            cardId: cardId
        }
        console.log(requestBody);
        await dispatch(addCardLabelAction(requestBody));
        dispatch(fetchCardByIdAction(cardId))
        setSelectedLabels(prevSelectedLabels => [...prevSelectedLabels, selectedLabel]);
    }
  };

  const renderSelectedLabels = () => {
    if (cardLabels && selectedLabels.length > 0) {
      return (
        <span>
            {selectedLabels.map((label, index) => (
              <span key={index} style={{ backgroundColor: label.labelColor, marginRight: "5px"}}>
                {label.title}
              </span>
            ))}
          </span>
      )
    } else {
      return null;
    }
  }

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
      {renderSelectedLabels()}
      {showLabels && (
        <span>
          {labelOptions.map((option, index) => (
            <Form.Check
              type="checkbox"
              key={index}
              label={option.title}
              checked={selectedLabels.some(label => label.labelColor === option.labelColor)}
              onChange={() => handleLabelSelection(option)}
              style={{ backgroundColor: option.labelColor }}
            />
          ))}
        </span>
      )}
      <hr />
    </>
  );
}

export default CardLabels;