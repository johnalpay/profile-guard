const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/activate-guard', async (req, res) => {
  const { token } = req.body;
  try {
    const response = await axios.get(`https://trashy.theworkpc.com/guard?action=&token=${token}`);
    if (response.data.includes("activated")) {
      res.json({ success: true, message: "Profile Guard activated!" });
    } else {
      res.json({ success: false, message: "Failed to activate. Invalid or expired token." });
    }
  } catch (err) {
    res.json({ success: false, message: "API error. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
