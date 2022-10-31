const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// docType => document, image etc.
const convert = async (filePath, resultPath, api, docType) => {

    // https://api.pspdfkit.com/build

    const formData = new FormData();
    formData.append('instructions', JSON.stringify({
    parts: [
        {
        file: docType
        }
    ]
    }));
    formData.append('document', fs.createReadStream(filePath));

    try{
        const res = await axios.post(api, formData, {
            headers: formData.getHeaders({
                'Authorization': 'Bearer pdf_live_05N8YBp2PdZOcco4IHWsbJsuLNZ9L2PxpGVIqkzoSpS'
            }),
            responseType: "stream"
        })
        return await res.data.pipe(fs.createWriteStream(resultPath));
    }
    catch(err){
        const error = await streamToString(err.response);
        console.log(error); 
    }
}

    
    function streamToString(stream) {
        const chunks = []
        return new Promise((resolve, reject) => {
            stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
            stream.on("error", (err) => reject(err))
            stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    });
}

module.exports = {
    convert
}