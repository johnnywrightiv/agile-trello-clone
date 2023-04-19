import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function CardLabels() {
  const [showLabels, setShowLabels] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  const labelOptions = [
    { color: '#F3CFCF', name: 'Label 1' },
    { color: '#FFD8C6', name: 'Label 2' },
    { color: '#A7E0B5', name: 'Label 3' },
    { color: '#82C9E5', name: 'Label 4' },
    { color: '#D8CADD', name: 'Label 5' }
  ];

  const handleLabelButtonClick = () => {
    setShowLabels(!showLabels);
  };

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
      <h4>
        Label
        <Button variant="link" onClick={handleLabelButtonClick}>
          {showLabels ? 'Hide' : 'Edit'}
        </Button>
      </h4>
      {selectedLabels.length > 0 && (
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
