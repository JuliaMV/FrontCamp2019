const { Router } = require('express');
const config = require('config');
const Article = require('../models/Article');

const router = Router()

router.post(
    '/news',
    async (req, res) => {
        try {
            const { title, description, content, urlToImage, publishedAt, author, url } = req.body;
            const isExist = await Article.findOne({ url });
            if (isExist) {
                res.status(400).json({ message: 'News with this URL already created'});
                return;
            }
            const news = new Article({ title, description, content, urlToImage, publishedAt, author, url });
            await news.save();
            res.status(201).json({ message: 'News is created'});
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again later'});
        }
    }
);

router.put(
    '/news',
    async (req, res) => {
        try {
            const { title, description, content, urlToImage, publishedAt, author, url } = req.body;
            await Article.findOneAndUpdate({ url }, { title, description, content, urlToImage, publishedAt, author });
            await Article.save();
            res.status(201).json({ message: 'News is updated'});
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again later'});
        }
    }
);


router.delete(
    '/news',
    async (req, res) => {
        try {
            const { url } = req.body;
            const news = await Article.findOne({ url });
            if (!news) {
                res.status(400).json({ message: 'This article isn\'t find' });
                return;
            }
            await news.delete();
            res.status(201).json({ message: 'News is deleted'});
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again later' });
        }
    }
);

module.exports = router;
