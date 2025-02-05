const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  const { recipientId, content } = req.body;

  try {
    const message = await Message.create({
      sender: req.user.id,
      recipient: recipientId,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user.id })
      .populate('sender', 'name email')
      .sort({ timestamp: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

module.exports = { sendMessage, getMessages };
