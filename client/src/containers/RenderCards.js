import { Card } from "react-bootstrap";
import { useSelector } from "react-redux"
import DeleteCard from "../components/DeleteCard";


const RenderCards = (columnIndex) => {
  const columns = useSelector((state) => state.boardColumns.columns);

  const index = columnIndex.columnIndex;
  const cards = columns[index].cardInfo;
  // const [ isLoading, setIsLoading ] = useState(true);
  // console.log(columnIndex);

  return (
    <>
      { cards ? <>{cards.map((card, cardIndex) => (
        <Card className="card mb-3" key={cardIndex}>
          <Card.Header className="card-title">{card.title}</Card.Header>
          <Card.Body>
            {card.text}
          </Card.Body>
          <DeleteCard cardIndex={cardIndex}/>
        </Card>
      ))} </>: <div></div>}
    </>
  )
}

export default RenderCards;