import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import Wf from './models/wfSchema.js'
import Household from './models/householdSchema.js'

const app = express()
app.use(express.json())

app.use(cors())

const port = 8000
app.post("/detect", async (req, res) => {
    const detectedObj = req.body;
    console.log(detectedObj.obj);
    const object = detectedObj.obj;

    try {
        const product_returned = await Wf.findOne({
            product: object
        })

        if (!product_returned) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        else {
            return res.json({
                waterfootprint: JSON.stringify(product_returned.waterfootprint)
            })
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const appliance_returned = await Household.findOne({
            appliance: object
        })

        if (!appliance_returned) {
            return res.status(404).json({
                message: "Appliance not found"
            });
        }
        else {
            return res.json({
                waterfootprint: JSON.stringify(product_returned.waterfootprint)
            })
        }
    } catch (error) {
        console.log(error);
    }

});



app.listen(port, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${port}`);
});