const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const handleDocToPdf = async (req, res) => {

    const formData = new FormData();
    formData.append('instructions', JSON.stringify({
    parts: [
        {
        file: "document"
        }
    ]
    }));
    formData.append('document', fs.createReadStream('../documents/document.doc'));

    console.log(formData);

    // (async () => {
    // try {
    //     const response = await axios.post('https://api.pspdfkit.com/build', formData, {
    //         headers: formData.getHeaders({
    //             'Authorization': 'Bearer pdf_live_05N8YBp2PdZOcco4IHWsbJsuLNZ9L2PxpGVIqkzoSpS'
    //         }),
    //         responseType: "stream"
    //     })

    //     response.data.pipe(fs.createWriteStream("../documents/result.pdf"))
    // } catch (e) {
    //     // const errorString = await streamToString(e.response)
    //     console.log(e);
    // }
    // })()

    function streamToString(stream) {
    const chunks = []
    return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
        stream.on("error", (err) => reject(err))
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    })
    }

    res.send("Single file upload successfull");

}

module.exports = {
    handleDocToPdf
}