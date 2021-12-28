import express from 'express';
import cors from 'cors';
const app = express();

const ingredients = [
    {
        "id": "1",
        "item": "Bacon"
    },
    {
        "id": "2",
        "item": "Eggs"
    },
    {
        "id": "3",
        "item": "Milk"
    },
    {
        "id": "4",
        "item": "Butter"
    }
];

app.use(cors({
    origin: ['http://127.0.0.1:5500']
}));

app.get('/ingredients', (req, res) =>{
    res.send(ingredients);
});

app.listen(6069, () => {
    console.log('Server running at port 6069');
});