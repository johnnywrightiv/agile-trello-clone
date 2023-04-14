import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { deleteCardAction } from "../features/cardsSlice";
import { fetchColumnsAction } from "../features/columnsSlice";


const RenderCards = (columnIndex) => {
  const columns = useSelector((state) => state.boardColumns.columns);
  const boardId = useSelector((state) => state.boardById.board._id);
  const index = columnIndex.columnIndex;
  const cards = columns[index].cardInfo;
  // const [ isLoading, setIsLoading ] = useState(true);
  // console.log(columnIndex);
  const dispatch = useDispatch();


  const handleClick = async (cardIndex) => {
    const index = columnIndex.columnIndex;
    const cards = columns[index].cardOrder;
    const cardId = cards[cardIndex]
  
    await dispatch(deleteCardAction(cardId));
    await dispatch(fetchColumnsAction(boardId));
  }


  return (
    <>
      { cards ? <>{cards.map((card, cardIndex) => (
        <Card className="card mb-3" key={cardIndex}>
          <Card.Header className="card-title">{card.title}</Card.Header>
          <Card.Body>
            {card.text}
          </Card.Body>
          <Card.Footer>
            <FontAwesomeIcon className="float-right" onClick={() => handleClick(cardIndex)} icon={faTrashCan} />
          </Card.Footer>
        </Card>
      ))} </>: <div></div>}
    </>
  )
}

export default RenderCards;