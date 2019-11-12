
const config = require("./config.json");

const Discord = require("discord.js");
const Inko = require("inko");

const inko = new Inko();

function isNotHaveSingle(string) {
    return string.split("").every(char => {
        return (!(char >= "ㄱ" && char <= "ㅢ") || isException(char));
    })
}

function isException(char) {
    return char === "ㅋ";
}

const client = new Discord.Client();

client.on("ready", () => {
    console.log("ready!")
});

client.on("message", message => {
    if(message.author.id === "643808177212751872") {
        return;
    }
    if((/[a-z]+/).test(message.content)) {
        const refined = inko.en2ko(inko.ko2en(message.content));
        if(isNotHaveSingle(refined) || isHaveException(refined)) {
            message.channel.send(`${refined}`)
        }
    }
});

client.login(config.token);
