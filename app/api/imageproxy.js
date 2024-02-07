export default async function handler(req, res) {
    const { imageUrl } = req.query;
    const response = await fetch(imageUrl);
    const imageBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(Buffer.from(imageBuffer));
}