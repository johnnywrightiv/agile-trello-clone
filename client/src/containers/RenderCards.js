import { useSelector } from "react-redux"


const RenderCards = () => {
  const cards = useSelector((state) => state.cards);
  console.log(cards)
}

export default RenderCards;