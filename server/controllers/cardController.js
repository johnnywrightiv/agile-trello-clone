const Card = require('./../models/cardModel');
const Column = require('./../models/columnModel');

// POST - get all cards
exports.getAllCards = async (req, res) => {
  try {
    const { columnId } = req.body;

    const column = await Column.findOne({ _id: columnId })

    if (!column) {
      return res
        .status(404)
        .json({ message: 'Column with given id was not found' });
    }

    const cards = await Card.find({ columnId: columnId })
    
    return res
      .status(200)
      .json({ cards: cards, column: column });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// GET - get one card by id
exports.getOneCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findOne({ _id: cardId });

    if (!card) {
      return res
        .status(404)
        .json({ message: 'Card with given id was not found' });
    } else {
      return res.status(200).json({ card: card });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST - create a card
exports.createCard = async (req, res) => {
  try {
    const { title, text, columnId } = req.body;

    const newCard = new Card({
      title,
      text,
      columnId: columnId,
      label: null,
      labelColor: null,
    });

    const cardResult = await newCard.save();
    const column = await Column.findById(columnId);

    if (!column) {
      return res
        .status(404)
        .json({ message: "Column with provided id does not exist" });
    } else {
      const newCardOrder = Array.from(column.cardOrder);
      newCardOrder.push(cardResult._id);
      column.set({ cardOrder: newCardOrder });
      const columnResult = await column.save();

      return res.status(201).json({
        newCard: cardResult,
        column: columnResult,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// PATCH - change card title
exports.changeCardTitle = async (req, res) => {
  try {
    const { cardId } = req.params;

    const updatedCard = await Card.findOneAndUpdate({ _id: cardId }, { title: req.body.title }, { new: true })

    if (!updatedCard) {
      return res
        .status(404)
        .json({ message: 'Unable to find the that card' });
    } else {
      return res.status(200).json({ updatedCard: updatedCard });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// PATCH - change card text
exports.changeCardText = async (req, res) => {
  try {
    const { cardId } = req.params;

    const updatedCard = await Card.findOneAndUpdate({ _id: cardId }, { text: req.body.text }, { new: true })

    if (!updatedCard) {
      return res
        .status(404)
        .json({ message: 'Unable to find the that card' });
    } else {
      return res.status(200).json({ updatedCard: updatedCard });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// PATCH - change card label
exports.changeCardLabel = async (req, res) => {
  try {
    const { cardId } = req.params;

    const updatedCard = await Card.findOneAndUpdate({ _id: cardId }, { label: req.body.label, labelColor: req.body.labelColor }, { new: true })

    if (!updatedCard) {
      return res
        .status(404)
        .json({ message: 'Unable to find the that card' });
    } else {
      return res.status(200).json({ updatedCard: updatedCard });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// PATCH - reorder cards in the same column
// exports.reorderSameColumn = async (req, res) => {
//   try {
//     const { sameColumnId, sameColumnCardIds } = req.body;
//     console.log(sameColumnId, sameColumnCardIds);
//     const column = await Column.findOne({ columnId: sameColumnId });
//     if (!column) {
//       return res
//         .status(404)
//         .json({ message: 'Unable to find column of provided id' });
//     }
//     column.set({ cardIds: sameColumnCardIds });
//     const savedColumn = await column.save();

//     return res
//       .status(200)
//       .json({ message: 'Same column reorder success', savedColumn });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }

// PATCH - reorder cards in a different column
// exports.reorderDifferentColumn = async (req, res) => {
//   try {
//     const {
//       removedColumnId,
//       addedColumnId,
//       removedColumnCardIds,
//       addedColumnCardIds,
//     } = req.body;

//     if (!removedColumnId && !addedColumnId && !removedColumnCardIds && !addedColumnCardIds) {
//       return res.status(400).json({ message: 'Some fields are missing' });
//     }

//     const removedcolumn = await Column.findOne({ columnId: removedColumnId });
//     removedcolumn.set({ cardIds: removedColumnCardIds });
//     await removedcolumn.save();

//     const addedcolumn = await Column.findOne({ columnId: addedColumnId });
//     addedcolumn.set({ cardIds: addedColumnCardIds });
//     await addedcolumn.save();

//     return res
//       .status(200)
//       .json({ message: 'Different column reorder success' });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }

// DELETE - delete one card by id
exports.deleteOneCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findOneAndDelete({ _id: cardId });

    if (!card) {
      return res
        .status(404)
        .json({ message: 'Card with given id was not found' });
    } else {
      return res.status(200).json({ message: "Card deleted" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};