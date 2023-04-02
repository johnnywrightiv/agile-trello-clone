const Card = require('./../models/cardModel');
const Column = require('./../models/columnModel');

// POST - get all cards
exports.getAllCards = async (req, res) => {
  const findAllCards = columnId => Card.find({ column: columnId }).select('cardId title');

  try {
    const { columnIds } = req.body;

    let totalCards = [];
    if (columnIds && columnIds.length > 0) {
      let i = 0;
      for (const columnId of columnIds) {
        const cards = await findAllCards(columnId);

        if (cards.length > 0) {
          totalCards.push(cards);
        }
      }
      return res.status(200).json({ cards: totalCards });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST - create a card
exports.createCard = async (req, res) => {
  try {
    const { title, columnId, cardId } = req.body;
    await Card.find().exec();
    const newCard = new Card({
      title,
      column: columnId,
      cardId,
    });
    const result = await newCard.save();
    const column = await Column.findOne({ columnId }).exec();
    if (!column) {
      return res
        .status(404)
        .json({ message: "Column of provided id doesn't exist" });
    }
    const newCardIds = Array.from(column.cardIds);
    newCardIds.push(result.cardId);
    column.set({ cardIds: newCardIds });
    const result2 = await column.save();
    return res.status(201).json({
      card: result,
      column: result2,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST - edit card title
exports.editCardTitle = async (req, res) => {
  try {
    const { cardId } = req.params;

    if (req.query.title) {
      const card = await Card.findOneAndUpdate(cardId, {
        content: req.body.title,
      }).exec();

      if (!card) {
        return res
          .status(404)
          .json({ message: 'Unable to find card with provided Id' });
      }
      return res
        .status(201)
        .json({  data: card.content });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// 
exports.reorderSameColumn = async (req, res) => {
  try {
    const { sameColumnId, sameColumnCardIds } = req.body;
    console.log(sameColumnId, sameColumnCardIds);
    const column = await Column.findOne({ columnId: sameColumnId });
    if (!column) {
      return res
        .status(404)
        .json({ message: 'Unable to find column of provided id' });
    }
    column.set({ cardIds: sameColumnCardIds });
    const savedColumn = await column.save();

    return res
      .status(200)
      .json({ message: 'same column reorder success', savedColumn });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

//
exports.reorderDifferentColumn = async (req, res) => {
  try {
    const {
      removedColumnId,
      addedColumnId,
      removedColumnCardIds,
      addedColumnCardIds,
    } = req.body;

    if (!removedColumnId && !addedColumnId && !removedColumnCardIds && !addedColumnCardIds) {
      return res.status(400).json({ message: 'Some fields are missing' });
    }

    const removedcolumn = await Column.findOne({ columnId: removedColumnId });
    removedcolumn.set({ cardIds: removedColumnCardIds });
    await removedcolumn.save();

    const addedcolumn = await Column.findOne({ columnId: addedColumnId });
    addedcolumn.set({ cardIds: addedColumnCardIds });
    await addedcolumn.save();

    return res
      .status(200)
      .json({ message: 'different column reorder success' });
  } catch (e) {
    return res.status(500).json({ message: err.message });
  }
}