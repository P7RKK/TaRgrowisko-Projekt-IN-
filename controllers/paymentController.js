const paypalClient = require('../utils/paypal');
const Auction = require('../models/Auction');

// Tworzenie transakcji PayPal
const createPayPalTransaction = async (req, res) => {
  const { auctionId } = req.body;

  try {
    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ message: 'Aukcja nie została znaleziona' });
    }

    if (!auction.isActive) {
      return res.status(400).json({ message: 'Aukcja jest już zakończona' });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'PLN',
            value: auction.currentPrice.toFixed(2),
          },
          description: `Aukcja: ${auction.title}`,
        },
      ],
    });

    const order = await paypalClient.execute(request);

    res.status(201).json({
      message: 'Transakcja PayPal została utworzona',
      orderId: order.result.id,
    });
  } catch (error) {
    console.error('Błąd tworzenia transakcji PayPal:', error.message);
    res.status(500).json({ message: 'Błąd tworzenia transakcji', error: error.message });
  }
};

// Finalizowanie transakcji PayPal
const capturePayPalTransaction = async (req, res) => {
  const { orderId, auctionId } = req.body;

  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await paypalClient.execute(request);

    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ message: 'Aukcja nie została znaleziona' });
    }

    auction.isActive = false;
    await auction.save();

    res.status(200).json({
      message: 'Płatność PayPal została pomyślnie przetworzona',
      capture,
    });
  } catch (error) {
    console.error('Błąd finalizacji transakcji PayPal:', error.message);
    res.status(500).json({ message: 'Błąd finalizacji transakcji', error: error.message });
  }
};

module.exports = {
  createPayPalTransaction,
  capturePayPalTransaction,
};
