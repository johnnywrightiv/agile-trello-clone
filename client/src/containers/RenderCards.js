import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { setModalOpen } from "../features/modalOpenSlice";



const RenderCards = ({ index, id }) => {
  const columns = useSelector((state) => state.boardColumns.columns);
  const cards = columns[index].cardInfo;
  // console.log("index: " + index + "| id: " + id);
  // const [ isLoading, setIsLoading ] = useState(true);

  const dispatch = useDispatch();

  const handleClick = () => {
    console.log('click');
  }

  return (
    <>
      { cards ? <>{cards.map((card, cardIndex) => (
        <Card className="card mb-3" key={cardIndex}>
          <Card.Header className="card-title" onClick={handleClick} >{card.title}</Card.Header>
          <Card.Body>
            {card.text}
          </Card.Body>
        </Card>
      ))} </>: <div></div>}
    </>
  )
}

export default RenderCards;