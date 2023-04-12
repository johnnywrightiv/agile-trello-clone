import { Button } from "react-bootstrap"


const CreateCardButton = () => {
  return (
  <Button variant="light" size="sm" onClick={() => handleAddCard(columnIndex)}>+ Add New Card</Button>
  )
}