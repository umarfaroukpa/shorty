const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/url-tracking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const ClickSchema = new mongoose.Schema({
    url: String,
    timestamp: { type: Date, default: Date.now },
    referrer: String,
    country: String,
});

const Click = mongoose.model('Click', ClickSchema);

app.post('/api/track-click', async (req, res) => {
    const { url, referrer, country } = req.body;
    const click = new Click({ url, referrer, country });
    await click.save();
    res.sendStatus(200);
});

app.get('/api/analytics', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL query parameter is required' });
    }
    const clicks = await Click.find({ url });
    const totalClicks = clicks.length;

    const referrers = clicks.reduce((acc, click) => {
        acc[click.referrer] = (acc[click.referrer] || 0) + 1;
        return acc;
    }, {});

    const countries = clicks.reduce((acc, click) => {
        acc[click.country] = (acc[click.country] || 0) + 1;
        return acc;
    }, {});

    res.json({ totalClicks, referrers, countries });
});

app.listen(5000, () => console.log('Server running on port 5000'));
