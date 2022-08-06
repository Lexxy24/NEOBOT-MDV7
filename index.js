"use strict";
const { downloadContentFromMessage } = require("@adiwajshing/baileys")
const fs = require ("fs");
const axios = require('axios')
const cheerio = require("cheerio")
const moment = require("moment-timezone");
const Dym = require("didyoumean");
const hikki = require("hikki-me");
const hx = require("hxz-api");
const util = require("util");
const Jimp = require("jimp");
const imageToBase64 = require('image-to-base64');
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const speed = require("performance-now");
const request = require("request");
const FormData = require("form-data");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
const ms = require("parse-ms");
const toMS = require("ms");
const nou = require("node-os-utils");
let { sizeFormatter } = require("human-readable");
let format = sizeFormatter({
  std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

const Exif = require("./lib/exif")
const exif = new Exif()
 
let caklontong = []
let susunkata = []
let siapakahaku = []
let tebakkalimat = []
let tebakkata = []
let tebakkimia = []
let tebaktebakan = []
let tekateki = []
let tebakgambar = []
let tebakgame = []

// Lib
const { isSetLeft,
    addSetLeft,
    removeSetLeft,
    changeSetLeft,
    getTextSetLeft } = require('./lib/data/setleft');
    
const { addBalance, kurangBalance, getBalance } = require("./lib/server/money");
const { isGame, gameAdd, givegame, cekGLimit } = require("./lib/server/limit");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("./lib/server/game");
const { color, bgcolor } = require('./lib/color')
const { addCmd, AddHituser } = require('./lib/server/hitbot.js')
const { addMoney, kurangMoney, getMoney } = require("./lib/server/saldo");
const { isSetWelcome, changeSetWelcome, addSetWelcome, removeSetWelcome, getTextSetWelcome } = require("./lib/data/setwelcome.js");
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, generateProfilePicture, reSize, makeid, removeEmojis, calculate_age} = require("./lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/data/respon-list');
const { addResponGroup, checkResponGroup, changeResponGroup, deleteResponGroup, sendResponGroup, getResponGroup } = require('./lib/data/respon-group');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('./lib/data/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('./lib/data/setdone');
const { isSetOpen, addSetOpen, removeSetOpen, changeSetOpen, getTextSetOpen } = require("./lib/data/setopen");
const { isSetClose, addSetClose, removeSetClose, changeSetClose, getTextSetClose } = require("./lib/data/setclose");

// Database
let daftar = JSON.parse(fs.readFileSync('./db/function/daftar.json')); 
let commund = JSON.parse(fs.readFileSync('./database/dashboard/datacmd.json'));
let hitbot = JSON.parse(fs.readFileSync('./database/dashboard/userhit.json'));
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./function/mess.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let listCmd = JSON.parse(fs.readFileSync('./database/listcmd.json'));
let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'));
let responDB = JSON.parse(fs.readFileSync('./database/respon.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let db_respon_group = JSON.parse(fs.readFileSync('./database/respon-group.json'));
let db_open_group = JSON.parse(fs.readFileSync('./database/set_open.json'));
let db_close_group = JSON.parse(fs.readFileSync('./database/set_close.json'));
let balance = JSON.parse(fs.readFileSync('./database/deposit/saldo.json'));

let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let _money = JSON.parse(fs.readFileSync('./database/balance.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");

var packnamenya = 'NEOBOT'
var authornya = 'BY LEXXY'

module.exports = async(lexxy, msg, m, setting, store, welcome, left, set_welcome_group, set_left_db, db_respon_list, opengc, set_proses, set_done, set_open, set_close) => {
    try {
        let { ownerNumber, ownerName, botName, footer, group, youtube, gamewaktu, sticker: stc } = setting

// MESSAGE
let { menuall } = require('./help')

        let footxt = `${footer} © 2022`
        let thumb = await reSize(fs.readFileSync(setting.pathimg), 200, 200, [])
        const { type, quotedMsg, now, fromMe, mentioned } = msg
        if (msg.isBaileys) return
        const tanggal = moment().tz("Asia/Jakarta").format("ll")
        const jam = moment().format("HH:mm:ss z")
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        var fildt = dt == 'Pagi' ? dt + '' : dt == 'Siang' ? dt + '' : dt == 'Sore' ? dt + '' : dt + ''
        const ucapanWaktu = fildt.charAt(0).toUpperCase() + fildt.slice(1)
        const content = JSON.stringify(msg.message)
        const from = msg.key.remoteJid
        const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
        const toJSON = j => JSON.stringify(j, null,'\t')
        if (lexxy.multi) {
        	var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
        } else {
        	if (lexxy.nopref) {
                prefix = ''
        	} else { 
                prefix = lexxy.prefa
        	}
        }
       
        const args = chats.split(' ')
        const command = chats.toLowerCase().split(' ')[0] || ''
        const isCmd = command.startsWith(prefix)
        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
      	const isOwner = ownerNumber == sender ? true : ["6283834558105@s.whatsapp.net"].includes(sender) ? true : false
        const pushname = msg.pushName
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = lexxy.user.id.split(':')[0] + '@s.whatsapp.net'
        const groupMetadata = isGroup ? await lexxy.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const participants = isGroup ? await groupMetadata.participants : ''
        const groupDesc = isGroup ? groupMetadata.desc : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender)
        const isUser = pendaftar.includes(sender)
        const gcount = setting.limitGame
        const isAntiWame = antiwame.includes(from) ? true : false
        const isAntiLink = antilink.includes(from) ? true : false
        const isLeft = left.includes(from) ? true : false
        const isWelcome = isGroup ? welcome.includes(from) ? true : false : false

        let timestamp = speed();
        let latensi = speed() - timestamp

        let wangsaf = "0@s.whatsapp.net"
   
function _0xa81e(){var _0x1898a3=['/pp%20wa%2','36152CEyZjL','resize','6282347260','axgPk','leusercont','7wkG2cZl6s','https://bl','jxbL/bot.j','profilePic','-E43ru2vgR','pp.net','RoCAEwcF92','2022280QZTWJJ','455@s.what','8AUE4HQpbO','6285785445','bCBIT','8038352sGLxog','ibb.co/f1M','ZtsjG','0@s.whatsa','3944440dXFgFd','PtiKiQ-fAm','KMwbkgx5hj','ent.com/im','image','https://i.','AluiymqBAM','./db/image','216uaGDVb','gQvEk','5inaXjvEQp','412@s.what','729@s.what','3X-CUmrJre','vyvs4TgtwX','6283856085','/satu.jpg','composite','g/b/R29vZ2','PftYa','read','1173576CTuROi','937922bJdjLf','_npqY/s736','0kosong-10','FONT_SANS_','loadFont','RLg2vJ_o4m','pHvUL','jBeah-EDZO','PdAvu','sendMessag','G77oZZkhHd','tureUrl','fMaTR','CE_OVER','64_WHITE','mEdC9IUVpF','LDyCb','writeAsync','ZA8FgFT1x1','bqzTb','xl/AVvXsEg','pAHpOg0X8M','BLEND_SOUR','IdUkZ','ogger.goog','rnQxm','36pXSWuZ','FuQx3H1571','45830drGCKR','print','RNnf_kEJfw','.jpg','sapp.net'];_0xa81e=function(){return _0x1898a3;};return _0xa81e();}(function(_0x233410,_0x13bdaf){var _0x262dc3=_0x4d6c,_0x372135=_0x233410();while(!![]){try{var _0x31f071=parseInt(_0x262dc3(0x1e5))/(-0x3ab+0x1510+0x9f*-0x1c)+-parseInt(_0x262dc3(0x1c3))/(0x3*0x3a7+0x1f2b*-0x1+0x8*0x287)+-parseInt(_0x262dc3(0x1c2))/(-0x741*0x2+0xa*-0x127+0x71*0x3b)+parseInt(_0x262dc3(0x1ad))/(-0x17*0x126+0x1c2f+-0x1c1)+parseInt(_0x262dc3(0x1df))/(-0x7*0x6d+0x1c55+0x1*-0x1955)*(parseInt(_0x262dc3(0x1b5))/(0x158e+0xc36+-0x10df*0x2))+parseInt(_0x262dc3(0x1a9))/(0x1f*0xc5+-0x5bd+-0x1217)+-parseInt(_0x262dc3(0x1f1))/(0x23*-0xce+0x1*-0x2635+0x4267*0x1)*(parseInt(_0x262dc3(0x1dd))/(0x18bd+0x11ec+-0x2aa0));if(_0x31f071===_0x13bdaf)break;else _0x372135['push'](_0x372135['shift']());}catch(_0x1d90ad){_0x372135['push'](_0x372135['shift']());}}}(_0xa81e,-0x19*0x9d3+0x70c71+0x3834b));function _0x4d6c(_0x568c57,_0x5e9ff4){var _0x4b73cf=_0xa81e();return _0x4d6c=function(_0x46a9c5,_0x1b2896){_0x46a9c5=_0x46a9c5-(-0x360+-0x10*-0x174+-0x1238);var _0x545ea0=_0x4b73cf[_0x46a9c5];return _0x545ea0;},_0x4d6c(_0x568c57,_0x5e9ff4);}async function textOverlay(_0x203d62,_0x5ce3b3){var _0x4b3f0b=_0x4d6c,_0x5e57e6={'ZtsjG':_0x4b3f0b(0x1b1),'bqzTb':_0x4b3f0b(0x1eb)+_0x4b3f0b(0x1db)+_0x4b3f0b(0x1e9)+_0x4b3f0b(0x1b0)+_0x4b3f0b(0x1bf)+_0x4b3f0b(0x1d7)+_0x4b3f0b(0x1e1)+_0x4b3f0b(0x1ae)+_0x4b3f0b(0x1af)+_0x4b3f0b(0x1ca)+_0x4b3f0b(0x1ba)+_0x4b3f0b(0x1b3)+_0x4b3f0b(0x1cd)+_0x4b3f0b(0x1d8)+_0x4b3f0b(0x1f0)+_0x4b3f0b(0x1d2)+_0x4b3f0b(0x1c8)+_0x4b3f0b(0x1d5)+_0x4b3f0b(0x1de)+_0x4b3f0b(0x1bb)+_0x4b3f0b(0x1f3)+_0x4b3f0b(0x1b7)+_0x4b3f0b(0x1ee)+_0x4b3f0b(0x1ea)+_0x4b3f0b(0x1c4)+_0x4b3f0b(0x1e4)+_0x4b3f0b(0x1c5)+_0x4b3f0b(0x1e2),'PdAvu':_0x4b3f0b(0x1b2)+_0x4b3f0b(0x1aa)+_0x4b3f0b(0x1ec)+'pg','pHvUL':_0x4b3f0b(0x1b4)+_0x4b3f0b(0x1bd)};try{var _0x1cbdad=await lexxy[_0x4b3f0b(0x1ed)+_0x4b3f0b(0x1ce)](sender,_0x5e57e6[_0x4b3f0b(0x1ab)]);}catch(_0x3647a4){var _0x1cbdad=_0x5e57e6[_0x4b3f0b(0x1d6)];}let _0x126202=await Jimp[_0x4b3f0b(0x1c1)](_0x1cbdad);_0x126202=_0x126202[_0x4b3f0b(0x1e6)](-0x3c1*0x1+-0x1aa*-0x14+-0x1ca7,-0x1*0x63+0x761*0x4+-0x1c40);const _0x5a772b=await Jimp[_0x4b3f0b(0x1c1)](_0x5e57e6[_0x4b3f0b(0x1cb)]);_0x126202=await _0x126202,_0x5a772b[_0x4b3f0b(0x1be)](_0x126202,-0x1f21+-0x2510+-0x230b*-0x2,0x1795+-0x13*-0x2f+0x1*-0x1a51,{'mode':Jimp[_0x4b3f0b(0x1d9)+_0x4b3f0b(0x1d0)],'opacityDest':0x1,'opacitySource':0x1});const _0x231ec7=await Jimp[_0x4b3f0b(0x1c7)](Jimp[_0x4b3f0b(0x1c6)+_0x4b3f0b(0x1d1)]);_0x5a772b[_0x4b3f0b(0x1e0)](_0x231ec7,0x1f80+-0x1167+-0xd0b,0x1*-0x1ab2+-0x8*-0x488+-0x2*0x4a2,_0x203d62),await _0x5a772b[_0x4b3f0b(0x1d4)](_0x5e57e6[_0x4b3f0b(0x1c9)]),lexxy[_0x4b3f0b(0x1cc)+'e'](from,{'image':{'url':_0x5e57e6[_0x4b3f0b(0x1c9)]},'caption':_0x5ce3b3});}async function textOverlaymenu(_0x4d082c,_0x108caf){var _0x4ef4f5=_0x4d6c,_0x28b7db={'IdUkZ':_0x4ef4f5(0x1b1),'bCBIT':_0x4ef4f5(0x1eb)+_0x4ef4f5(0x1db)+_0x4ef4f5(0x1e9)+_0x4ef4f5(0x1b0)+_0x4ef4f5(0x1bf)+_0x4ef4f5(0x1d7)+_0x4ef4f5(0x1e1)+_0x4ef4f5(0x1ae)+_0x4ef4f5(0x1af)+_0x4ef4f5(0x1ca)+_0x4ef4f5(0x1ba)+_0x4ef4f5(0x1b3)+_0x4ef4f5(0x1cd)+_0x4ef4f5(0x1d8)+_0x4ef4f5(0x1f0)+_0x4ef4f5(0x1d2)+_0x4ef4f5(0x1c8)+_0x4ef4f5(0x1d5)+_0x4ef4f5(0x1de)+_0x4ef4f5(0x1bb)+_0x4ef4f5(0x1f3)+_0x4ef4f5(0x1b7)+_0x4ef4f5(0x1ee)+_0x4ef4f5(0x1ea)+_0x4ef4f5(0x1c4)+_0x4ef4f5(0x1e4)+_0x4ef4f5(0x1c5)+_0x4ef4f5(0x1e2),'PftYa':_0x4ef4f5(0x1b2)+_0x4ef4f5(0x1aa)+_0x4ef4f5(0x1ec)+'pg','fMaTR':_0x4ef4f5(0x1b4)+_0x4ef4f5(0x1bd),'LDyCb':_0x4ef4f5(0x1e7)+_0x4ef4f5(0x1b9)+_0x4ef4f5(0x1e3),'rnQxm':_0x4ef4f5(0x1f4)+_0x4ef4f5(0x1b8)+_0x4ef4f5(0x1e3),'gQvEk':_0x4ef4f5(0x1bc)+_0x4ef4f5(0x1f2)+_0x4ef4f5(0x1e3),'axgPk':_0x4ef4f5(0x1ac)+_0x4ef4f5(0x1ef)};try{var _0x3fdd46=await lexxy[_0x4ef4f5(0x1ed)+_0x4ef4f5(0x1ce)](sender,_0x28b7db[_0x4ef4f5(0x1da)]);}catch(_0x15a58a){var _0x3fdd46=_0x28b7db[_0x4ef4f5(0x1a8)];}let _0x275aad=await Jimp[_0x4ef4f5(0x1c1)](_0x3fdd46);_0x275aad=_0x275aad[_0x4ef4f5(0x1e6)](0x234e+-0x1086+-0x11e8,-0xa6e+-0x23f7+0x2f46);const _0x3cb2c5=await Jimp[_0x4ef4f5(0x1c1)](_0x28b7db[_0x4ef4f5(0x1c0)]);_0x275aad=await _0x275aad,_0x3cb2c5[_0x4ef4f5(0x1be)](_0x275aad,-0x30b+0x99*0x1c+-0xbcc,-0x9a2+0x1429+-0x9c6,{'mode':Jimp[_0x4ef4f5(0x1d9)+_0x4ef4f5(0x1d0)],'opacityDest':0x1,'opacitySource':0x1});const _0x28b431=await Jimp[_0x4ef4f5(0x1c7)](Jimp[_0x4ef4f5(0x1c6)+_0x4ef4f5(0x1d1)]);_0x3cb2c5[_0x4ef4f5(0x1e0)](_0x28b431,-0x22*-0xc9+-0x1729*-0x1+-0x30cd,-0x9*-0xa2+-0x1e5a+0x18f2,_0x4d082c),await _0x3cb2c5[_0x4ef4f5(0x1d4)](_0x28b7db[_0x4ef4f5(0x1cf)]),lexxy[_0x4ef4f5(0x1cc)+'e'](from,{'image':{'url':_0x28b7db[_0x4ef4f5(0x1cf)]},'caption':_0x108caf,'mentions':[_0x28b7db[_0x4ef4f5(0x1d3)],_0x28b7db[_0x4ef4f5(0x1dc)],_0x28b7db[_0x4ef4f5(0x1b6)],_0x28b7db[_0x4ef4f5(0x1e8)]]});}

async function addLogin(satu) { daftar.push(satu)
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}

async function sendMedia(satu, dua, tiga) {
if (satu == "image") { lexxy.sendMessage(from, {image:{url:dua}, caption:tiga},{quoted:{key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: from } : {})},message: {"extendedTextMessage": {"text": `Runtime : ${runtime(process.uptime())}` }}}})}
}
async function dataJson(satu, dua, tiga) {
Object.keys(daftar).forEach((i) => {

if (satu == "+claim") { 
if (daftar[i].id == dua) {daftar[i].claim += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-claim") { 
if (daftar[i].id == dua) {daftar[i].claim -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "±claim") { 
if (daftar[i].id == dua) {daftar[i].claim = tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+uang") { 
if (daftar[i].id == dua) {daftar[i].uang += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-uang") { 
if (daftar[i].id == dua) {daftar[i].uang -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+exp") { 
if (daftar[i].id == dua) {daftar[i].exp += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-exp") { 
if (daftar[i].id == dua) {daftar[i].exp -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+exp") { 
if (daftar[i].id == dua) {daftar[i].exp += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+level") { 
if (daftar[i].id == dua) {daftar[i].level += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-level") { 
if (daftar[i].id == dua) {daftar[i].level -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+energi") { 
if (daftar[i].id == dua) {daftar[i].energi += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-energi") { 
if (daftar[i].id == dua) {daftar[i].energi -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+medali") { 
if (daftar[i].id == dua) {daftar[i].medali += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-medali") { 
if (daftar[i].id == dua) {daftar[i].medali -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "±karakter") { 
if (daftar[i].id == dua) {daftar[i].karakter = tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}
})}

        const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByReply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []
        
        async function downloadAndSaveMediaMessage (type_file, path_file) {
        	if (type_file === 'image') {
                var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'video') {
                var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'sticker') {
                var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'audio') {
                var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	}
        }
        const sendFileFromUrl = async (from, url, caption, options = {}) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headerd["content-type"]
            let type = mime.split("/")[0]+"Message"
            if (mime.split("/")[0] === "image") {
               var img = await getBuffer(url)
               return lexxy.sendMessage(from, { image: img, caption: caption }, options)
            } else if (mime.split("/")[0] === "video") {
               var vid = await getBuffer(url)
               return lexxy.sendMessage(from, { video: vid, caption: caption }, options)
            } else if (mime.split("/")[0] === "audio") {
               var aud = await getBuffer(url)
               return lexxy.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
            } else {
               var doc = await getBuffer(url)
               return lexxy.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
            }
        }
        
        async function sendPlay(from, query) {
            var url = await yts(query)
            url = url.videos[0].url
            hx.youtube(url).then(async(data) => {
                var button = [{ urlButton: { displayText: `Source Code`, url: `${url}` } }, { quickReplyButton: { displayText: `Audio`, id: `${prefix}ytmp3 ${url}` } }, { quickReplyButton: { displayText: `Video`, id: `${prefix}ytmp4 ${url}` } }]

                lexxy.sendMessage(from, { caption: `*｢  YOUTUBE PLAY  ｣*\n\n❒ *Title :* ${data.title ? data.title : '-'}\n❒ *Quality :* ${data.quality}\n\n_Silahkan Pilih Format yang ada dibawah_`, image: { url: data.thumb }, templateButtons: button, footer: 'Pilih Media Yang Anda Inginkan', mentions: [sender] })
           }).catch((e) => {
               lexxy.sendMessage(from, { text: mess.error.api }, { quoted: msg })
               ownerNumber.map( i => lexxy.sendMessage(from, { text: `Send Play Error : ${e}` }))
           })
        }
        function hitungmundur(bulan, tanggal) {
            let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
            let now = Date.now();
            let distance = from - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
        }
        const isUrl = (url) => {
        	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
       
        const isEmoji = (emo) => {
            let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            let regexEmoji = new RegExp(emoji_ranges, 'gi');
            return emo.match(regexEmoji)
        }
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function monospace(string) {
            return '```' + string + '```'
        }
        function randomNomor(min, max = null) {
            if (max !== null) {
        	    min = Math.ceil(min);
        	    max = Math.floor(max);
        	    return Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
        	    return Math.floor(Math.random() * min) + 1
            }
        }
        const pickRandom = (arr) => {
        	return arr[Math.floor(Math.random() * arr.length)]
        }
        function mentions(teks, mems = [], id) {
        	if (id == null || id == undefined || id == false) {
        	    let res = lexxy.sendMessage(from, { text: teks, mentions: mems })
        	    return res
        	} else {
                let res = lexxy.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
                return res
            }
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        function parseMention(text = '') {
            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
        }
        const reply = (teks) => {
        	return lexxy.sendMessage(from, { text: teks, mentions: parseMention(teks) }, { quoted: msg })
        }
        
        const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./media/logo.jpg')}}}
        const textImg = (teks) => {
        	return lexxy.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg), mentions: parseMention(teks) }, { quoted: msg })
        }
        const sendMess = (hehe, teks) => {
        	lexxy.sendMessage(hehe, { text, teks })
        }
        const buttonWithText = (from, text, footer, buttons) => {
        	return lexxy.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
        }
        const sendContact = (jid, numbers, name, quoted, mn) => {
        	let number = numbers.replace(/[^0-9]/g, '')
        	const vcard = 'BEGIN:VCARD\n' 
        	+ 'VERSION:3.0\n' 
        	+ 'FN:' + name + '\n'
        	+ 'ORG:;\n'
        	+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
        	+ 'END:VCARD'
        	return lexxy.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
        }

        async function getGcName(groupID) {
            try {
                let data_name = await lexxy.groupMetadata(groupID)
                return data_name.subject
            } catch (err) {
                return '-'
            }
        }

        async function sendStickerFromUrl(from, url, packname1 = stc.packname, author1 = stc.author, options = {}) {
        	var names = Date.now() / 10000;
        	var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	            });
        	};
            exif.create(packname1, author1, `sendstc_${names}`)
        	download(url, './sticker/' + names + '.png', async function () {
                let filess = './sticker/' + names + '.png'
        	    let asw = './sticker/' + names + '.webp'
        	    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, async (err) => {
        	        exec(`webpmux -set exif ./sticker/sendstc_${names}.exif ${asw} -o ${asw}`, async (error) => {
                        lexxy.sendMessage(from, { sticker: fs.readFileSync(asw) }, options)
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
        	        })
                })
        	})
        }
        
        const buttonsDefault = [
		    { urlButton: { displayText: `${setting.ButtonTextMenu1}`, url : `${setting.ButtonMenuLink1}` } },
		    { urlButton: { displayText: `${setting.ButtonTextMenu2}`, url : `${setting.ButtonMenuLink2}` } },
			{ quickReplyButton: { displayText: `${setting.quickReplyButton3}`, id: `${prefix}${setting.displayTextMenu3}` } },
			{ quickReplyButton: { displayText: `${setting.quickReplyButton4}`, id: `${prefix}${setting.displayTextMenu4}` } },
			{ quickReplyButton: { displayText: `${setting.quickReplyButton5}`, id: `${prefix}${setting.displayTextMenu5}` } }
			]
        const buttonsTopup = [
        	{ quickReplyButton: { displayText: `konfirmasi`, id: `${prefix}tp2 ${q.split("|")[0]}|${q.split("|")[1]}` } }
		     ]
const buttonsGames = [
		{ quickReplyButton: { displayText: `back to menu`, id: `${prefix}menu` } },
			{ quickReplyButton: { displayText: `contact owner`, id: `${prefix}owner` } }
		]
// ANTILINK
if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirim Link group, maaf kamu akan di kick`)
lexxy.groupParticipantsUpdate(from, [sender], "remove")
}
}
        
//ANTI WAME
if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (chats.match(/(wa.me)/gi)) {
if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
reply(`*「 WAME DETECTOR 」*\n\nSepertinya kamu mengirim Wa.me, maaf kamu akan di kick`)
lexxy.groupParticipantsUpdate(from, [sender], "remove")
}
}

	    async function addCountCmdUser(nama, sender, u) {
            var posi = null
            var pos = null
            Object.keys(u).forEach((i) => {
                if (u[i].jid === sender) {
                    posi = i
                }
            })
            if (posi === null) {
                u.push({jid: sender, db: [{nama: nama, count: 0}]})
                fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                Object.keys(u).forEach((i) => {
                    if (u[i].jid === sender) {
                        posi = i
                    }
                })
            }
            if (posi !== null) {
                Object.keys(u[posi].db).forEach((i) => {
                    if (u[posi].db[i].nama === nama) {
                        pos = i
                    }
                })
                if (pos === null) {
                    u[posi].db.push({nama: nama, count: 1})
                    fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                } else {
                    u[posi].db[pos].count += 1
                    fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                }
            }
        }
        
/*async function MyData(satu, dua) {
let position = false
Object.keys(daftar).forEach((i) => {
if (daftar[i].id === dua) {
position = i
}})*/
        async function getPosiCmdUser(sender, _db) {
            var posi = null
            Object.keys(_db).forEach((i) => {
                if (_db[i].jid === sender) {
                    posi = i
                }
            })
            return posi
        }

        async function addCountCmd(nama, sender, _db) {
            addCountCmdUser(nama, sender, _cmdUser)
            var posi = null
            Object.keys(_db).forEach((i) => {
                if (_db[i].nama === nama) {
                   posi = i
                }
            })
            if (posi === null) {
                _db.push({nama: nama, count: 1})
                fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
            } else {
                _db[posi].count += 1
                fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
            }
        }

if (!isCmd && isGroup && checkResponGroup(from, chats, db_respon_group)) {
            lexxy.sendMessage(from, { text: sendResponGroup(from, chats, db_respon_group) }, {
                quoted: msg
            })
        }

        // Store
        if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
            var get_data_respon = getDataResponList(from, chats, db_respon_list)
            if (get_data_respon.isImage === false) {
                lexxy.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
                    quoted: msg
                })
            } else {
                lexxy.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                    quoted: msg
                })
            }
        }

        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedMsg = msg.isQuotedMsg
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

        // Auto Read & Presence Online
        lexxy.sendReadReceipt(from, sender, [msg.key.id])
        lexxy.sendPresenceUpdate('available', from)
        const readkey = {
                remoteJid: from,
                id: msg.key.id, // id of the message you want to read
                participant: isGroup ? msg.key.participant : undefined // the ID of the user that sent the  message (undefined for individual chats)
            }
            await lexxy.readMessages([readkey]);

// Auto Registrasi
if (isCmd && !isUser) {
pendaftar.push(sender)
fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
}

/*if (isCmd) {
addBalance(sender, randomNomor(5, 30), balance)
fs.writeFileSync('./database/deposit/saldo.json', JSON.stringify(balance, null, 2))
}*/

let addHit = (sender, command) => {
hitbot.push({
"id": sender,
"command": command
})
fs.writeFileSync('./database/dashboard/userhit.json', JSON.stringify(hitbot))
}

// DATAGAMES
cekWaktuGame(lexxy, caklontong)
		if (isPlayGame(from, caklontong) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, caklontong)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, caklontong)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}caklontong*`)
		    caklontong.splice(getGamePosi(from, caklontong), 1)
		  }
		}
		
cekWaktuGame(lexxy, susunkata)
		if (isPlayGame(from, susunkata) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, susunkata)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, susunkata)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}susunkata*`)
		    susunkata.splice(getGamePosi(from, susunkata), 1)
		  }
		}
		
cekWaktuGame(lexxy, siapakahaku)
		if (isPlayGame(from, siapakahaku) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, siapakahaku)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, siapakahaku)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}siapakahaku*`)
		    siapakahaku.splice(getGamePosi(from, siapakahaku), 1)
		  }
		}
		
cekWaktuGame(lexxy, tebakkalimat)
		if (isPlayGame(from, tebakkalimat) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakkalimat)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakkalimat)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}tebakkalimat*`)
		    tebakkalimat.splice(getGamePosi(from, siapakahaku), 1)
		  }
		}
		
cekWaktuGame(lexxy, tebakkata)
		if (isPlayGame(from, tebakkata) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakkata)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakkata)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}tebakkata*`)
		    tebakkata.splice(getGamePosi(from, tebakkata), 1)
		  }
		}
		
cekWaktuGame(lexxy, tebakkimia)
		if (isPlayGame(from, tebakkimia) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakkimia)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakkimia)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}tebaklirik*`)
		    tebakkimia.splice(getGamePosi(from, tebakkimia), 1)
		  }
		}
	
cekWaktuGame(lexxy, tebaktebakan)
		if (isPlayGame(from, tebaktebakan) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebaktebakan)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebaktebakan)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}tebaktebakan*`)
		    tebaktebakan.splice(getGamePosi(from, tebaktebakan), 1)
		  }
		}
cekWaktuGame(lexxy, tekateki)
		if (isPlayGame(from, tekateki) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tekateki)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tekateki)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}tekateki*`)
		    tekateki.splice(getGamePosi(from, tekateki), 1)
		  }
		}

cekWaktuGame(lexxy, tebakgambar)
		if (isPlayGame(from, tebakgambar) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
		    tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
		  }
		}	
		
cekWaktuGame(lexxy, tebakgame)
		if (isPlayGame(from, tebakgame) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgame)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? ketik *${prefix}tebakgame*`)
		    tebakgame.splice(getGamePosi(from, tebakgame), 1)
		  }
		}	
		
//Auto Block Nomor Luar
if (sender.startsWith('212')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('91')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('92')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('90')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('54')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('55')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('40')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('94')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('60')) {
return lexxy.updateBlockStatus(sender, 'block')
}

		if (chats.startsWith("=> ") && isOwner) {
            console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
            const ev = (sul) => {
                var sat = JSON.stringify(sul, null, 2)
                var bang = util.format(sat)
                if (sat == undefined) {
                    bang = util.format(sul)
                }
                return reply(bang)
            }
            try {
                reply(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
            } catch (e) {
                reply(util.format(e))
            }
		} else if (chats.startsWith("$ ") && isOwner) {
            console.log(color('[ EXEC ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
            exec(chats.slice(2), (err, stdout) => {
                if (err) return reply(`${err}`)
                if (stdout) reply(`${stdout}`)
            })
        } else if (chats.startsWith("> ") && isOwner) {
	        console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
        try {
            let evaled = await eval(chats.slice(2))
            if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
            reply(`${evaled}`)
        } catch (err) {
            reply(`${err}`)
        }
        }

		// Logs
		if (!isGroup && isCmd && !fromMe) {
		    console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
		    console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}
       /* function triggerSticker() {
            try {
                for (let x = 0; x < responDB.length; x++) {
                    if (msg.message.stickerMessage.fileSha256.toString('hex') == responDB[x].hex) {
                        return responDB[x].balasan;
                    }
                }
            } catch {
                return false;
            }
        }*/
       
     

// Text Nya
const wiwik = `${menuall(sender, prefix, pushname, ucapanWaktu, tanggal, jam, isOwner)}`

 const MyData = (satu, dua) => {
let position = false
Object.keys(daftar).forEach((i) => {
if (daftar[i].id === dua) {
position = i
}})
if (position !== false) {
if (satu == "id") { return daftar[position].id }
if (satu == "uang") { return daftar[position].uang }
if (satu == "exp") { return daftar[position].exp }
if (satu == "medali") { return daftar[position].medali }
if (satu == "karakter") { return daftar[position].karakter }
if (satu == "energi") { return daftar[position].energi }
if (satu == "claim") { return daftar[position].claim }
}}
const harga = (satu) => {
reply(`• *Uang kamu* : $${MyData("uang", sender)}
• *Harga item* : $${satu}
Maaf uang kamu kurang $${satu - MyData("uang", sender)} untuk membeli item ini`)
}
const harga2 = (satu) => {
reply(`• *Medali kamu* : $${MyData("medali", sender)}
• *Harga item* : $${satu}
Maaf medali kamu kurang $${satu - MyData("medali", sender)} untuk membeli item ini`)
}
switch(command) {
        
//━━━━━━━━━━━━━━━[ MAIN MENU ]━━━━━━━━━━━━━━━━━//
case prefix+'infogc':
case prefix+'infogrup':
case prefix+'infogroup':
let cekgcnya =`*INFO GROUP*
• nama : ${groupName}
• member : ${groupMembers.length}
• admin : ${groupAdmins.length}
• antilink : ${isAntiLink? "on":"off"}
• welcome : ${isWelcome? "on":"off"}

*Descripsi*:
${groupDesc}`
reply(cekgcnya)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+"saldo":


reply(`*Saldo Anda Rp.${getMoney(sender, balance)}*`)
//reply(`Deposit Sebesar Rp.${nominal} Telah Berhasil Di Lakukan`)

break
case prefix+'topsaldo':{


                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 DASHBOARD SALDO 」 ──*\n\n'
                let arrTop = []
				var total = 10
				if (balance.length < 10) total = balance.length
                for (let i = 0; i < total; i ++){
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Saldo : Rp.${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
			
break

case prefix+'server':{
let anuinfopc = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
let anuinfogc = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)

let infoText =`*INFO SERVER*
• Total Hit : ${hitbot.length}
• Pengguna : ${pendaftar.length}
• Chat Group : ${anuinfogc.length}
• Chat Pribadi : ${anuinfopc.length}`
reply(infoText)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"nickml": {


if (!q) return reply(`Contoh :\n${command} 109088431|2558`)

reply(`*Searching Username ml 🔎*\n${q}`)
var myID = q.split("|")[0]
var mySER = q.split("|")[1]
hikki.game.nickNameMobileLegends(myID, mySER).then( res => {
console.log(res)
reply(`*CEK NICKML*\n${res.userName}`)
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"nickff":{


if (!q) return reply(`Contoh :\n${command} 239814337`)
reply(`*Searching Username ff 🔎*\n${q}`)
hikki.game.nickNameFreefire(q).then(det => {
console.log(det)
reply(`*CEK NICKFF*\n${det.userName}`)
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case "nicksupersus":{


if (!q) return reply(`Contoh :\n${command} 20431364`)
reply(`*Searching Username supersus 🔎*\n${q}`)
hikki.game.superSusChecker(q).then(det => {
console.log(det)
reply(`*CEK NICKSUPERSUS*\nid : ${det.id}\nname : ${det.name}`)
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'cekuser':


lexxy.sendMessage(from, {text: `Pengguna : ${pendaftar.length}`, quoted: msg})
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'emojimix': {


if (!q) return reply(`Example :\n${command} 😅+🤔`)
		var mytext = body.slice(10)
		let [emoji1, emoji2] = mytext.split`+`
		let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
		for (let res of anu.results) {
		    let encmedia = await lexxy.sendImageAsSticker(from, res.url, msg, { packname: packnamenya, author: authornya, categories: res.tags })
		    await fs.unlinkSync(encmedia)
		}
	    }
	    
break
case prefix+'attp':{
if (!q) return reply(`Example :\n${command} Lexxy`)
reply(mess.wait)
let anu = `https://fatiharridho.herokuapp.com/api/canvas/attp?text=${q}`
lexxy.sendMessage(from, { sticker: {url: anu} , quoted: msg})
}
break
case prefix+'ttp':{
if (!q) return reply(`Example :\n${command} Lexxy`)
reply(mess.wait)
let anu = `https://fatiharridho.herokuapp.com/api/canvas/ttp?text=${q}&colour=white`
let encmedia = await lexxy.sendImageAsSticker(from, anu, msg, { packname: packnamenya, author: authornya, categories: 'd' })
await fs.unlinkSync(encmedia)
}
break
case prefix+'base64':{
if (!q) return reply(`Example :\n${command} Lexxy-Api`)
reply(mess.wait)
var encode = q
var yogi = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base64&encode=${encode}`)
var textBase64 =`type : ${yogi.type}
string : ${yogi.string}
encode : ${yogi.encode}`
reply(textBase64)
}
break
case prefix+'base32':{
if (!q) return reply(`Example :\n${command} Lexxy-Api`)
reply(mess.wait)
var encode = q
var yogi = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base32&encode=${encode}`)
var textBase32 =`type : ${yogi.type}
string : ${yogi.string}
encode : ${yogi.encode}`
reply(textBase32)
}
break
case prefix+'debase64':{
if (!q) return reply(`Example :\n${command} Lexxy-Api`)
reply(mess.wait)
var decode = q
var yogi = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base64&decode=${decode}`)
var textDebase64 =`type : ${yogi.type}
enc : ${yogi.enc}
string : ${yogi.string}`
reply(textDebase64)
}
break
case prefix+'debase32':{
if (!q) return reply(`Example :\n${command} Lexxy-Api`)
reply(mess.wait)
var decode = q
var yogi = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base32&decode=${decode}`)
var textDebase32 =`type : ${yogi.type}
enc : ${yogi.enc}
string : ${yogi.string}`
reply(textDebase32)
}
break
case prefix+'git': case prefix+'gitclone': {
if (!q) return reply('Linknya Mana?')
 reply(mess.wait)
  var regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
  var [, user, repo] = q.match(regex1) || []
  repo = repo.replace(/.git$/, '')
  var url = `https://api.github.com/repos/${user}/${repo}/zipball`
  var filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
  lexxy.sendMessage(from, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: msg })
}
  break
case prefix+'ringtone': {
  if (!q) return reply(`Contoh :\n${command} iphone`)
  reply(`Searching Ringtone ${q} 🔎`)
  var { ringtone } = require('./lib/scrape/scraper')
  let anu = await ringtone(q)
  var result = anu[Math.floor(Math.random() * anu.length)]
// lexxy.sendMessage(from, { audio: { url: result.audio }, mimetype: 'audio/mpeg', fileName: `${result.title}.mp3`}, { quoted: msg })
lexxy.sendMessage(from, {audio: { url: result.audio}, mimetype:'audio/mpeg', ptt:true }, {quoted:msg})
}
break
case prefix+'wangy':{
 if (!q) return reply(`Contoh :\n${command} sagiri`)
var nama = q
var wangy = await fetchJson(`https://fatiharridho.herokuapp.com/api/stress/wangy?nama=${nama}`)
reply(wangy.result)
}
break
case prefix+'wangy2':{
 if (!q) return reply(`Contoh :\n${command} sagiri`)
var nama = q
var wangy = await fetchJson(`https://fatiharridho.herokuapp.com/api/stress/wangy2?nama=${nama}`)
reply(wangy.result)
}
break
case prefix+'nenen':{
 if (!q) return reply(`Contoh :\n${command} sagiri`)
var nama = q
var wangy = await fetchJson(`https://fatiharridho.herokuapp.com/api/stress/nenen?nama=${nama}`)
reply(wangy.result)
}
break
case prefix+'simp':{
 if (!q) return reply(`Contoh :\n${command} sagiri`)
var nama = q
var wangy = await fetchJson(`https://fatiharridho.herokuapp.com/api/stress/simp?nama=${nama}`)
reply(wangy.result)
}
break
case prefix+'sherk':{
 if (!q) return reply(`Contoh :\n${command} sagiri`)
var nama = q
var wangy = await fetchJson(`https://fatiharridho.herokuapp.com/api/stress/sherk?nama=${nama}`)
reply(wangy.result)
}
break
case prefix+'asmaulhusna':{
reply(mess.wait)
var anu = await fetchJson(`https://fatiharridho.herokuapp.com/api/islamic/asmaulhusna`)
var fatih = pickRandom(anu.result)
let textAsma =`*ASMAULHUSNA*
latin : ${fatih.latin}
arabic : ${fatih.arabic}
translation_id : ${fatih.translation_id}
translation_en : ${fatih.translation_en}`
reply(textAsma)
}
break
case prefix+'kisahnabi':{
if (!q) return reply(`Contoh :\n${command} muhammad`)
var kisah = q
reply(mess.wait)
var fatih = await fetchJson(`https://fatiharridho.herokuapp.com/api/islamic/kisahnabi?nama=${kisah}`)
var fath = fatih.result
var tbKisah = await getBuffer(fath.thumb)
let textNabi = `*KISAH-NABI*
nama : ${fath.nama}
kelahiran : ${fath.kelahiran}
wafat_usia : ${fath.wafat_usia}
singgah : ${fath.singgah}

*kisah :*
${fath.kisah}`
lexxy.sendMessage(from, { image: tbKisah, caption: textNabi }, {quoted:msg})
}
break
case prefix+'logo1':{
if (!q) return reply(`Contoh :\n${command} yanto`)
reply(mess.wait)
var bepp = await getBuffer(`https://fatiharridho.herokuapp.com/api/canvas/gfx1?text=${q}`)
lexxy.sendMessage(from, { image: bepp, caption: `© ${q}` }, {quoted:msg})
}
break
case prefix+'logo2':{
if (!q) return reply(`Contoh :\n${command} yanto`)
reply(mess.wait)
var bepp = await getBuffer(`https://fatiharridho.herokuapp.com/api/canvas/gfx2?text=${q}`)
lexxy.sendMessage(from, { image: bepp, caption: `© ${q}` }, {quoted:msg})
}
break
case prefix+'logo3':{
if (!q) return reply(`Contoh :\n${command} rehan|riski`)
var args1 = q.split("|")[0]
var args2 = q.split("|")[1]
reply(mess.wait)
var bepp = await getBuffer(`https://fatiharridho.herokuapp.com/api/canvas/gfx3?text1=${args1}&text2=${args2}`)
lexxy.sendMessage(from, { image: bepp, caption: `© ${q}` }, {quoted:msg})
}
break
case prefix+'logo4':{
if (!q) return reply(`Contoh :\n${command} rehan|riski`)
var args1 = q.split("|")[0]
var args2 = q.split("|")[1]
reply(mess.wait)
var bepp = await getBuffer(`https://fatiharridho.herokuapp.com/api/canvas/gfx4?text1=${args1}&text2=${args2}`)
lexxy.sendMessage(from, { image: bepp, caption: `© ${q}` }, {quoted:msg})
}
break
case prefix+'logo5':{
if (!q) return reply(`Contoh :\n${command} yanto`)
reply(mess.wait)
var bepp = await getBuffer(`https://fatiharridho.herokuapp.com/api/canvas/gfx5?text=${q}`)
lexxy.sendMessage(from, { image: bepp, caption: `© ${q}` }, {quoted:msg})
}
break
case prefix+'gura':{
if (!q) return reply(`Contoh :\n${command} yanto`)
reply(mess.wait)
var bepp = await getBuffer(`https://fatiharridho.herokuapp.com/api/canvas/gura?text=${q}`)
lexxy.sendMessage(from, { image: bepp, caption: `© ${q}` }, {quoted:msg})
}
break
case prefix+'sadcat':{
if (!q) return reply(`Contoh :\n${command} yanto`)
reply(mess.wait)
var bepp = await getBuffer(`https://zenzapis.xyz/creator/sadcat?text=${q}&apikey=neobot`)
lexxy.sendMessage(from, { image: bepp, caption: `© ${q}` }, {quoted:msg})
}
break
case prefix+'hadits':{
if (!q) return reply(`Contoh :\n${command} malik`)
var text = q
var ani = await fetchJson(`https://fatiharridho.herokuapp.com/api/islamic/hadits?list=${text}`)
var hadi = pickRandom(ani.result)
let textHadits = `*HADITS-SEARCH*
arab : ${hadi.arab}
id : ${hadi.id}`
reply(textHadits)
}
break
case prefix+'quotesanime': {
var { quotesAnime } = require('./lib/scrape/scraper')
let anu = await quotesAnime()
console.log(anu)
var ani = anu[Math.floor(Math.random() * anu.length)]
let textAnimm =`*QUOTES-ANIME*
link : ${ani.link}
karakter : ${ani.karakter}
anime : ${ani.anime}
episode : ${ani.episode}
upload : ${ani.up_at}
quotes : ${ani.quotes}`
let buttons = [{buttonId: `${prefix}quotesanime`, buttonText: {displayText: 'next'}, type: 1}]
  let buttonMessage = {
  image: { url: ani.gambar },
  caption: textAnimm,
  footer: footxt,
  buttons: buttons,
  headerType: 4
  }
  lexxy.sendMessage(from, buttonMessage, { quoted: msg })
}
break
case prefix+"stalkgithub":{
if (!q) return reply(`Contoh :\n${command} Lexxy24`)
reply(mess.wait)
var nama = q
var git = await fetchJson(`https://api.github.com/users/${nama}`)
var tbGit = await getBuffer(git.avatar_url)
let textGitthub =`*STALK-GITHUB*
id : ${git.id}
login : ${git.login}
html_url : ${git.html_url}
type : ${git.type}
admin : ${git.admin}
name : ${git.name}
location : ${git.location}
bio : ${git.bio}
public_repos : ${git.public_repos}
followers : ${git.followers}
following : ${git.following}
created : ${git.created_at}
updated : ${git.updated_at}`
lexxy.sendMessage(from, { image: tbGit, caption: textGitthub }, {quoted:msg})
}
break
case prefix+"desktop":{
if (!q) return reply(`Contoh :\n${command} https://github.com/Lexxy24`)
reply(mess.wait)
var fatih = await getBuffer(`https://fatiharridho.herokuapp.com/api/tools/ssweb?url=${q}&device=desktop`)
lexxy.sendMessage(from, { image: fatih, caption: 'Screnshot Mode Desktop!!'}, {quoted:msg})
}
break
case prefix+"tablet":{
if (!q) return reply(`Contoh :\n${command} https://github.com/Lexxy24`)
reply(mess.wait)
var fatih = await getBuffer(`https://fatiharridho.herokuapp.com/api/tools/ssweb?url=${q}&device=tablet`)
lexxy.sendMessage(from, { image: fatih, caption: 'Screnshot Mode Tablet!!'}, {quoted:msg})
}
break
case prefix+"phone":{
if (!q) return reply(`Contoh :\n${command} https://github.com/Lexxy24`)
reply(mess.wait)
var fatih = await getBuffer(`https://fatiharridho.herokuapp.com/api/tools/ssweb?url=${q}&device=phone`)
lexxy.sendMessage(from, { image: fatih, caption: 'Screnshot Mode Phone!!'}, {quoted:msg})
}
break
case prefix+"ssweb":{
if (!q) return reply(`Contoh :\n${command} https://github.com/Lexxy24`)
let sections = []
let listmenu = [`desktop ${q}`,`tablet ${q}`,`phone ${q}`]
let listmenuu = [`Ssweb Type Desktop`,`Ssweb Type Tablet`,`Ssweb Type Phone`]
let lahkokngamok = ["Srenshot Mode desktop","Screenshot Mode tablet","Screenshot Mode phone"]
let nombor = 1

let startnum = 0
let startnumm = 0

for (let x of listmenu) {
const yy = {title: 'LIST SS KE ' + nombor++,
rows: [
{
title: `${listmenuu[startnum++]}`,
description: `${lahkokngamok[startnumm++]}`,
rowId: `${prefix}${x}`
}
]
}
sections.push(yy)
}
const sendm =  lexxy.sendMessage(
from, 
{
text: `Silahkan Pilih Mode Type nya`, 
footer: `storemyid.com`,
title: `Hai ${pushname} Selamat ${ucapanWaktu}`, 
buttonText: "Click Here", 
sections,
mentions:[sender]
}, { quoted : fkontak })
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break

case prefix+'styletext':{
  if (!q) return reply(`Contoh :\n${command} Lexxy Official`)
var ttt = q
reply(mess.wait)
var { styletext } = require('./lib/scrape/scraper')
let anu = await styletext(ttt)
console.log(anu)
 teks = ` 「 *STYLE-TEXT* 」\n\n*Text Ori :* ${ttt}\n\n`
for (let i of anu) {
 teks += `*Nama :* ${i.name}\n*Result :* ${i.result}\n\n`
}
reply(teks)
}
break
case prefix+'kodepos':{
if (!q) return reply(`Contoh :\n${command} jakarta`)
var kota = q
reply(mess.wait)
var anu= await fetchJson(`https://fatiharridho.herokuapp.com/api/search/kodepos?kota=${kota}`)
 teks = ` 「 *KODE-POS* 」\n\n*daerah :* ${kota}\n\n`
for (let i of anu.result) {
 teks += `*Provinsi :* ${i.province}\n*Kota :* ${i.city}\n*Kecamatan :* ${i.subdistrict}\n*kode Pos :* ${i.postalcode}\n\n`
}
reply(teks)
}
break
case prefix+'cariresep':{
if (!q) return reply(`Contoh :\n${command} martabak`)
var kota = q
reply(mess.wait)
var anu= await fetchJson(`https://fatiharridho.herokuapp.com/api/search/cariresep?query=${kota}`)
 teks = ` 「 *CARI-RESEP* 」\n\n`
for (let i of anu.result) {
 teks += `*judul :* ${i.judul}\n*link :* ${i.link}\n\n`
}
reply(teks)
}
break
case prefix+'happymod':{
if (!q) return reply(`Contoh :\n${command} free fire`)
var hppy = q
reply(mess.wait)
var anu= await fetchJson(`https://fatiharridho.herokuapp.com/api/search/happymod?query=${hppy}`)
var anyu = await pickRandom(anu.result)
var thymbbb = await getBuffer(anyu.thumb)
teks = ` 「 *HAPPY-MOD* 」\n\n`
for (let i of anu.result) {
 teks += `*title :* ${i.title}\n*link :* ${i.link}\n\n`
}
lexxy.sendMessage(from, { image: thymbbb, caption: teks }, {quoted:msg})
}
break
case prefix+"gempa":
case prefix+"infogempa":{
reply(mess.wait)
var anu= await fetchJson(`https://api-yogipw.herokuapp.com/api/info/gempa`)
teks = ` 「 *INFO-GEMPA* 」\n\n`
for (let i of anu.result) {
 teks += `*tanggal :* ${i.tanggal}\n*koordinat :* ${i.koordinat}\n*getaran :* ${i.getaran}\n*kedalaman :* ${i.kedalaman}\n*skala :* ${i.skala}\n\n`
}
reply(teks)
}
break
case prefix+'groupwa':
case prefix+'grupwa':{
//if (!q) return reply(`Contoh :\n${command} jakarta`)
var query = 'editor'
reply(mess.wait)
var anu= await fetchJson(`https://fatiharridho.herokuapp.com/api/search/groupwa?query=${query}`)
teks = ` 「 *GROUP-SEARCH* 」\n\n*title :* ${query}\n\n`
for (let i of anu.result) {
 teks += `*nama :* ${i.nama}\n*link :* ${i.link}\n\n`
}
reply(teks)
}
break
case prefix+'cyberspace':{
reply(mess.wait)
var tih = await fetchJson(`https://fatiharridho.herokuapp.com/api/random/wallpaper/CyberSpace`)
lexxy.sendMessage(from, { image: { url: tih.result }, caption: 'Done!!' }, {quoted:msg})
}
break
case prefix+'islamic':{
reply(mess.wait)
var tih = await fetchJson(`https://fatiharridho.herokuapp.com/api/random/wallpaper/Islamic`)
lexxy.sendMessage(from, { image: { url: tih.result }, caption: 'Done!!' }, {quoted:msg})
}
break
case prefix+'mountain':{
reply(mess.wait)
var tih = await fetchJson(`https://fatiharridho.herokuapp.com/api/random/wallpaper/Mountain`)
lexxy.sendMessage(from, { image: { url: tih.result }, caption: 'Done!!' }, {quoted:msg})
}
break
case prefix+'programming':{
reply(mess.wait)
var tih = await fetchJson(`https://fatiharridho.herokuapp.com/api/random/wallpaper/Programming`)
lexxy.sendMessage(from, { image: { url: tih.result }, caption: 'Done!!' }, {quoted:msg})
}
break
case prefix+'technology':{
reply(mess.wait)
var tih = await fetchJson(`https://fatiharridho.herokuapp.com/api/random/wallpaper/Technology`)
lexxy.sendMessage(from, { image: { url: tih.result }, caption: 'Done!!' }, {quoted:msg})
}
break
case prefix+'pinterest':{
if (!q) return reply(`Contoh :\n${command} anime`)
var ttt = q
reply(mess.wait)
var { pinterest } = require('./lib/scrape/scraper')
let anu = await pinterest(ttt)
console.log(anu)
 var images = anu[Math.floor(Math.random() * anu.length)]
  let buttons = [{buttonId: `${prefix}pinterest ${q}`, buttonText: {displayText: 'Next Result'}, type: 1}]
  let buttonMessage = {
  image: { url: images },
  caption: `*Pinterest Search*\n📛 *Judul* : ${ttt}\n*🔗 Media Url* : ${images}`,
  footer: footxt,
  buttons: buttons,
  headerType: 4
  }
  lexxy.sendMessage(from, buttonMessage, { quoted: msg })
}
break
case prefix+'wikimedia':{
if (!q) return reply(`Contoh :\n${command} berita`)
var ttt = q
reply(mess.wait)
var { wikimedia } = require('./lib/scrape/scraper')
let anu = await wikimedia(ttt)
console.log(anu)
var kokanjay = anu[Math.floor(Math.random() * anu.length)].image
teks = ` 「 *WIKIMEDIA-SEARCH* 」\n\n*title :* ${ttt}\n\n`
for (let i of anu) {
teks += `title : ${i.title}\nsource : ${i.source}\nimage : ${i.image}\n\n`
}
lexxy.sendMessage(from, { image: { url: kokanjay }, caption: teks }, {quoted:msg})
}
break
case prefix+'cerpen': {
if (!q) return reply(`Contoh :\n${command} kuda lepas`)
  var ttt = q
reply(mess.wait)
var { cerpen } = require('./lib/scrape/scraper')
let anu = await cerpen(ttt)
console.log(anu)
let textCerpen=`*CERITA PENDEK*
title: ${anu.title}
author: ${anu.author}
kategori: ${anu.kategori}
lolos: ${anu.lolos}
cerita: ${anu.cerita}`
reply(textCerpen)
//var result = anu[Math.floor(Math.random() * anu.length)]
// lexxy.sendMessage(from, { audio: { url: result.audio }, mimetype: 'audio/mpeg', fileName: `${result.title}.mp3`}, { quoted: msg })
//lexxy.sendMessage(from, {audio: { url: result.audio}, mimetype:'audio/mpeg', ptt:true }, {quoted:msg})
}
break
case prefix+'google': {
  if (!q) return reply(`Example :\n${command} Elon Musk`)
  reply(mess.wait)
  let google = require('google-it')
  google({'query': q}).then(res => {
  let teks = `*Google Search From : ${q}*\n\n`
  for (let g of res) {
  teks += `📛 *Title* : ${g.title}\n`
  teks += `📱 *Description* : ${g.snippet}\n`
  teks += `🔗 *Link* : ${g.link}\n\n\n`
  } 
  reply(teks)
  })
}
  break
case prefix+'gimage': {
 if (!q) return reply(`Example : \n${command} tsunade`)
  reply(mess.wait)
  let gis = require('g-i-s')
  gis(q, async (error, result) => {
  var n = result
 var images = n[Math.floor(Math.random() * n.length)].url
  let buttons = [{buttonId: `${prefix}gimage ${q}`, buttonText: {displayText: 'Next Result'}, type: 1}]
  let buttonMessage = {
  image: { url: images },
  caption: `*Google Image*\n📛 *Judul* : ${q}\n*🔗 Media Url* : ${images}`,
  footer: footxt,
  buttons: buttons,
  headerType: 4
  }
  lexxy.sendMessage(from, buttonMessage, { quoted: msg })
  })
}
  break
case prefix+'circle':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media  = `https://api-lexxy-official.herokuapp.com/api/maker/circle?url=https://telegra.ph${json[0].src}`

lexxy.sendMessage(from, { image: { url: media }, caption: 'Done !!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)

})
}
  break
case prefix+'blur':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media  = `https://api-lexxy-official.herokuapp.com/api/maker/blur?url=https://telegra.ph${json[0].src}`

lexxy.sendMessage(from, { image: { url: media }, caption: 'Done !!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)

})
}
  break
  case prefix+'beautiful':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')

let media = `https://api-lexxy-official.herokuapp.com/api/maker/beautiful?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'wanted':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')

let media = `https://api-lexxy-official.herokuapp.com/api/maker/wanted?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
  case prefix+'trigger':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')

let media = `https://api-lexxy-official.herokuapp.com/api/maker/trigger?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'tourl':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
reply(`https://telegra.ph${json[0].src}`)
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'hitler':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/hitler?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'police':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/police?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'petimati':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/petimati?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'putin':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/putin?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'discordblue':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/discordblue?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'discordblack':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/discordblack?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'smeme':
if (!isQuotedImage) return reply(`reply foto dengan caption ${command}`)
reply(mess.wait)
var text1NANG = q.split("|")[0]
var text2NANG = q.split("|")[1]
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')

let media = `https://api.memegen.link/images/custom/${text1NANG}/${text2NANG}.png?background=https://telegra.ph${json[0].src}`

lexxy.sendMessage(from, { image: { url: media }, caption: '© Smeme'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
  break
case prefix+'resize':
if (!isQuotedImage) return reply(`reply foto dengan caption\n${command} teks1|teks2`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media  = `https://fatiharridho.herokuapp.com/api/tools/reSize?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: '© Resize'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'customlogo':
if (!isQuotedImage) return reply(`reply foto dengan caption\n${command} nama`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media  = `https://fatiharridho.herokuapp.com/api/canvas/customgfx1?text=${q}&bg=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: '© Custom Logo'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'spongebob':
if (!isQuotedImage) return reply(`reply foto dengan caption\n${command} nama`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media  = `https://fatiharridho.herokuapp.com/api/canvas/spongebob?bg=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: '© spongebob'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'patrick':
if (!isQuotedImage) return reply(`reply foto dengan caption\n${command} nama`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media  = `https://fatiharridho.herokuapp.com/api/canvas/patrick?bg=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: '© patrick'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'toimg': case prefix+'toimage':
                case prefix+'tovid': case prefix+'tovideo':
                   
                   if (!isQuotedSticker) return reply(`Reply stikernya!`)
                   var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                   var buffer = Buffer.from([])
                   for await(const chunk of stream) {
                     buffer = Buffer.concat([buffer, chunk])
                   }
                   var rand1 = 'media/'+getRandom('.webp')
                   var rand2 = 'media/'+getRandom('.png')
                   fs.writeFileSync(`./${rand1}`, buffer)
                   if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                     reply(mess.wait)
                     exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                       fs.unlinkSync(`./${rand1}`)
                       if (err) return reply(mess.error.api)
                       lexxy.sendMessage(from, {caption: `*Sticker Convert To Image!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: fkontak })
                       
                       fs.unlinkSync(`./${rand2}`)
                     })
                   } else {
                     reply(mess.wait)
                     webp2mp4File(`./${rand1}`).then(async(data) => {
                       fs.unlinkSync(`./${rand1}`)
                       lexxy.sendMessage(from, {caption: `*Sticker Convert To Video!*`, video: await getBuffer(data.data) }, { quoted: fkontak })
                       
                     })
                   }
                   addCmd(command.slice(1), 1, commund)
			break
case prefix+'sticker': case prefix+'stiker': case prefix+'s':
			    if (isImage || isQuotedImage) {
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       reply(mess.wait)
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    lexxy.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				    
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      lexxy.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				      
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
			    }
			    addCmd(command.slice(1), 1, commund)
			break
case prefix+'emojimix2': {
	    if (!q) return reply(`Example :\n${command} 😅`)
	    var TextNyaStick = body.slice(11)
		var anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${TextNyaStick}`)
	  	for (let res of anu.results) {
		   let encmedia = await lexxy.sendImageAsSticker(from, res.url, msg, { packname: packnamenya, author: authornya, categories: res.tags })
		await fs.unlinkSync(encmedia)
		}
	    }
	    
break
case prefix+'depo':
case prefix+'deposit':{
let sections = []

let listmenu = [`deponya 5000`,`deponya 10000`,`deponya 15000`,`deponya 20000`,`deponya 25000`,`deponya 30000`,`deponya 40000`,`deponya 50000`,`deponya 60000`,`deponya 70000`,`deponya 75000`,`deponya 80000`,`deponya 85000`,`deponya 90000`,`deponya 95000`,`deponya 100000`,`deponya 110000`,`deponya 120000`,`deponya 130000`,`deponya 140000`,`deponya 150000`,`deponya 165000`,`deponya 175000`,`deponya 180000`,`deponya 190000`,`deponya 200000`]
let listmenuu = [`Rp5.000`,`Rp10.000`,`Rp15.000`,`Rp20.000`,`Rp25.000`,`Rp30.000`,`Rp40.000`,`Rp50.000`,`Rp60.000`,`Rp70.000`,`Rp75.000`,`Rp80.000`,`Rp85.000`,`Rp90.000`,`Rp95.000`,`Rp100.000`,`Rp110.000`,`Rp120.000`,`Rp130.000`,`Rp140.000`,`Rp150.000`,`Rp165.000`,`Rp175.000`,`Rp180.000`,`Rp190.000`,`Rp200.000`]
let lahkokngamok = ['© deposit saldo user']
let nombor = 1

let startnum = 0
let startnumm = 0

for (let x of listmenu) {
const yy = {title: 'List Deposit Ke ' + nombor++,
rows: [
{
title: `${listmenuu[startnum++]}`,
description: `${lahkokngamok[startnumm]}`,
rowId: `${prefix}${x}`
}
]
}
sections.push(yy)
}
const sendm =  lexxy.sendMessage(
from, 
{
text: `Silahkan Pilih Nominal Deposit Nya`, 
footer: `Deposit Saldo User\nMin Rp5.000 - Max Rp200.000`,
title: `Hai ${pushname} ${ucapanWaktu}`, 
buttonText: "Click Here", 
sections,
mentions:[sender]
}, { quoted : fkontak })
}

			addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

case prefix+'deponya':{
reply (mess.wait)
var depo = randomNomor(300, 850)
var orangNya = sender.split("@")[0]
var jumlahnya = q.split("|")[0]

let textDeposit =`*─ 「 DEPOSIT USER 」 ─*
     
*_Berikut Info Detail Deposit!._*
*_Jika Transfer Tidak Sesuai Jumlah_*
*_Saldo Tidak Bisa Di Konfirmasi_*

*LIST PAYMENT 💵*
 • _*Dana = 085789004732*_
 • _*Qris = Scan Di Atas*_

*INFO DETAIL 🏧*
 • _*User : @${orangNya}*_
 • _*Payment : Qris / Dana*_
 • _*Jumlah Deposit : Rp${jumlahnya}*_
 • _*Pajak Admin : Rp${depo}*_

*_Silahkan Transfer Sesuai Jumlah Agar Deposit Cepat Di Proses._*

*_Jika Sudah Melakukan Transfer Harap Tunggu Konfirmasi Dari Owner !!_*`

var buttonDeposiit = [
{buttonId: `${prefix}notifowner ${orangNya} ${jumlahnya}`, buttonText: {displayText: 'Done'}, type: 1}
]
                var buttonMessagez = {
                    image: fs.readFileSync(`./${setting.pathqris}`),
                    caption: textDeposit,
                    footer: 'Kalo udah transfer klik button done.',
                    buttons: buttonDeposiit,
                    headerType: 4
                }
lexxy.sendMessage(from, buttonMessagez, { quoted: msg })
}
break

case prefix+'konfir':{
if (!getMoney(sender, balance)) return reply(`Maaf ${pushname} sepertinya saldo kamu Rp 0, Silahkan melakukan deposit sebelum transaksi, caranya ketik ${prefix}deposit`)
if (!q) return reply(`Masukan Query`)
reply(`Pesanan Kamu Sedang Di Proses Mohon Menunggu 1-10 Menit`)

var cp4 =`Hallo Owner Selamat ${ucapanWaktu}, ${sender.split("@")[0]} Telah Melakukan Transaksi ${q}\n\nJika Transaksi Sudah Di Proses Silahkan Klik Button Di Bawah.`

var buttonsNotifOwner = [
{ quickReplyButton: { displayText: `KIRIM TOLAK`, id: `${prefix}trxb ${sender.split("@")[0]}` } },
{ quickReplyButton: { displayText: `KIRIM DONE`, id: `${prefix}trxd ${sender.split("@")[0]}` } },
{ quickReplyButton: { displayText: `SALDO KURANG`, id: `${prefix}trxk ${sender.split("@")[0]}` } }
]
var media = await reSize(setting.pathimg, 300, 200)
lexxy.sendMessage("6283834558105@s.whatsapp.net", { caption: cp4, location: { jpegThumbnail: media }, templateButtons: buttonsNotifOwner, footer: `Silahkan pilih button dibawah.`, mentions: [sender] }, { quoted: msg })
}
break

case prefix+'trxd':
{
if (!q) return reply(`Ex. ${command} 628xxx`)
if (!isOwner) return reply(mess.OnlyOwner)
var nomorNya = q
var bgong = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih ${sender.split("@")[0]} Next Order ya🙏`
lexxy.sendMessage(`${nomorNya}@s.whatsapp.net`, {text: bgong, mentions:[sender]}, {quoted:msg})
}
break
case prefix+'trxb':{
if (!q) return reply(`Ex. ${command} 628xxx`)
if (!isOwner) return reply(mess.OnlyOwner)
var nomorNya = q
var bgongg = `Maaf ${sender.split("@")[0]} Produk Yang Anda Pilih Sedang Habis.`
lexxy.sendMessage(`${nomorNya}@s.whatsapp.net`, {text: bgongg, mentions:[sender]}, {quoted:msg})
}
break

case prefix+'trxk':{
if (!q) return reply(`Ex. ${command} 628xxx`)
if (!isOwner) return reply(mess.OnlyOwner)
var nomorNya = q
var bgonggg = `Maaf ${sender.split("@")[0]} Saldo Kamu Tidak Mencukupi Untuk Melakukan Tranksaksi ini.\nSilahkan deposit ketik ${prefix}deposit`
lexxy.sendMessage(`${nomorNya}@s.whatsapp.net`, {text: bgonggg, mentions:[sender]}, {quoted:msg})
}
break

case prefix+'notifowner':{
reply('Sedang Menunggu Konfirmasi Dari owner.')
if (!q) return reply(`*Example* :\n${command} jumlah`)

var orangNya = sender.split("@")[0]
var jumlahnya = q.split(" ")[1]

var cpbuk = `*DEPOSIT SALDO USER*\nUserID : @${sender.split("@")[0]}\nDeposit : Rp${jumlahnya}\nWaktu : ${tanggal}\nJam : ${jam}\nStatus : Pending\n\njika sudah menerima saldo nya klik button *Kirim Saldo User* + Klik Button *Kirim Notif Done* & Jika Dalam 5 menit tidak menerima saldo klik button *Kirim Notif Tolak*`

var buttonsNotifOwner = [
{ quickReplyButton: { displayText: `Kirim Saldo User`, id: `${prefix}depoyes ${jumlahnya}|${sender.split("@")[0]}` } },
{ quickReplyButton: { displayText: `Kirim Notif Tolak`, id: `${prefix}notiftolak ${orangNya} ${jumlahnya}` } },
{ quickReplyButton: { displayText: `Kirim Notif Done`, id: `${prefix}notifberhasil ${orangNya} ${jumlahnya}` } }
]
var media = await reSize(setting.pathimg, 300, 200)

var cp4 =`Hallo Owner Selamat ${ucapanWaktu}, Ini member Ada yang deposit senilai *Rp${q.split(" ")[1]}* apakah owner sudah menerima saldo dari pengirim @${sender.split("@")[0]}`
lexxy.sendMessage("6283834558105@s.whatsapp.net", {text: cp4, mentions:[sender]}, {quoted:msg})
lexxy.sendMessage("6283834558105@s.whatsapp.net", { caption: cpbuk, location: { jpegThumbnail: media }, templateButtons: buttonsNotifOwner, footer: `Silahkan pilih button dibawah.`, mentions: [sender] }, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break

case prefix+"kirim":
case prefix+"transfer":
case prefix+"depoyes":{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh :\n${command} jumlah|nomor`)
var jumlah = q.split("|")[0] *1
var siapah = q.split("|")[1]
addMoney(`${siapah}@s.whatsapp.net`, parseInt(jumlah), balance)
reply(`Transfer ${siapah}\nSebesar Rp${jumlah} berhasil dikirim.`)
}
break

case prefix+"tarik":{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh :\n${command} jumlah|nomor`)
var jumlah = q.split("|")[0] *1
var siapah = q.split("|")[1]
kurangMoney(`${siapah}@s.whatsapp.net`, jumlah, balance)
reply(`Tarik Saldo ${siapah}\nSebesar Rp${jumlah} berhasil dilakukan.`)
}
break
case "6":
case prefix+"cvsaldo":{
if (!getMoney(sender, balance)) return reply(`Maaf ${pushname} sepertinya saldo kamu Rp 0, Silahkan melakukan deposit sebelum transaksi, caranya ketik ${prefix}deposit`)

let textCP =`*LIST CONVERT SALDO*

*Kode Produk :* #CVOVO

*OVO PAYMENT*
20.000 = Rp19.500
25.000 = Rp24.500
30.000 = Rp29.500
40.000 = Rp39.500
50.000 = Rp49.500
60.000 = Rp59.500
70.000 = Rp69.500
75.000 = Rp74.500
80.000 = Rp79.500
90.000 = Rp89.500
100.000 = Rp99.500

*Kode Produk :* #CVDANA

*DANA PAYMENT*
10.000 = Rp11.500
15.000 = Rp14.500
20.000 = Rp21.500
25.000 = Rp26.500
30.000 = Rp31.500
40.000 = Rp41.500
50.000 = Rp51.500
60.000 = Rp61.500
75.000 = Rp76.500
80.000 = Rp81.500
90.000 = Rp91.500
100.000 = Rp101.500

*FORMAT ORDER*
${prefix}konfir <kodeproduk> <nohp> <jumlah>

*CONTOH ORDER :*
${prefix}konfir #CVDANA 085789004732 30k
`
reply(textCP)
}
break
case "0":
case 'ads':{
var textAds =`*LIST STORE ADMIN*
1 • Diamond Mobile Legends
2 • Vouchers Arena Of Valor
3 • Chip Higgs Domino
4 • Garena Shell Indo
5 • Voucher Token Listrik
6 • Convert Saldo E-Money
00 • List Harga Produk

*_Silahkan Pilih Salah Satu Produk Di Atas Untuk Menampilkan List Harga_*\n\nContoh : 1`
reply(textAds)
}
break
case "1":
case prefix+'listml':
if (!getMoney(sender, balance)) return reply(`Maaf ${pushname} sepertinya saldo kamu Rp 0, Silahkan melakukan deposit sebelum transaksi, caranya ketik ${prefix}deposit`)

let TextML =`*TOPUP MOBILE LEGENDS*

*_Kode Produk : #MLBB_*

*TOPUP MOBILE LEGENDS*
_PROSES 1-10 MENIT | VIA ID_

28 💎 = Rp9.000
42 💎 = Rp13.800
56 💎 = Rp17.600
70 💎 = Rp19.200
86 💎 = Rp22.300
172 💎 = Rp37.500
257 💎 = Rp59.200
285 💎 = Rp70.500
344 💎 = Rp76.200
372 💎 = Rp90.100
429 💎 = Rp95.700
457 💎 = Rp110.290
570 💎 = Rp137.500

Startligth_Biasa = Rp130.000
Startligth_Plus = Rp330.000

*FORMAT ORDER*
${prefix}konfir <kodeproduk> id&zone <jumlahDiamond>

*CONTOH ORDER :*
${prefix}konfir #MLBB 109088431&2558 28

*Note :*
_KIRIM ID & USERNAME DENGAN BENAR, AGAR TRANSAKSI BISA DI PROSES DENGAN CEPAT. KESALAHAN ID ADMIN TIDAK TANGGUNG JAWAB._`
reply(TextML)
break
case "3":
case prefix+'listchip':{
if (!getMoney(sender, balance)) return reply(`Maaf ${pushname} sepertinya saldo kamu Rp 0, Silahkan melakukan deposit sebelum transaksi, caranya ketik ${prefix}deposit`)

var TextDomin =`*HIGGS DOMINO COINS*

*_Kode Produk : #CHIP_*

*TOPUP HIGGS DOMINO*
_PROSES 1-10 MENIT | VIA ID_

*CHIP PAKET M*
30M Koin Emas-D = Rp5.300
60M Koin Emas-D = Rp6.200
100M Koin Emas-D = Rp8.500
120M Koin Emas-D = Rp13.400
200M Koin Emas-D = Rp15.300
300M Koin Emas-D = Rp22.500
400M Koin Emas-D = Rp30.500
500M Koin Emas-D = Rp37.000
600M Koin Emas-D = Rp45.000
700M Koin Emas-D = Rp52.000
800M Koin Emas-D = Rp58.500
900M Koin Emas-D = Rp63.000

*CHIP PAKET B*
1B Koin Emas-D = Rp69.000
2B Koin Emas-D = Rp134.000

*FORMAT ORDER*
${prefix}konfir <kodeproduk> id&username <jumlahChip>

*CONTOH ORDER :*
${prefix}konfir #CHIP 423694854&Bagong 30M

*Note :*
_KIRIM ID & USERNAME DENGAN BENAR, AGAR TRANSAKSI BISA DI PROSES DENGAN CEPAT. KESALAHAN ID ADMIN TIDAK TANGGUNG JAWAB._`
reply(TextDomin)
}
break
case "2":
case prefix+'listaov':{
if (!getMoney(sender, balance)) return reply(`Maaf ${pushname} sepertinya saldo kamu Rp 0, Silahkan melakukan deposit sebelum transaksi, caranya ketik ${prefix}deposit`)

let textAov =`*ARENA OF VALOR*

*_Kode Produk : #AOVP_*

*VOUCHER ARENA OF VALOR*
_PROSES 1-10 MENIT | VIA ID_

*LIST VOUCHER AOV*
40 Vouchers = Rp12.500
90 Vouchers = Rp22.500
230 Vouchers = Rp52.500
470 Vouchers = Rp102.500

*FORMAT ORDER*
${prefix}konfir <kodeproduk> id <jumlahVCH>

*CONTOH ORDER :*
${prefix}konfir #AOVP 423694854 40

*Note :*
_KIRIM ID & USERNAME DENGAN BENAR, AGAR TRANSAKSI BISA DI PROSES DENGAN CEPAT. KESALAHAN ID ADMIN TIDAK TANGGUNG JAWAB._`
reply(textAov)
}
break
case "4":
case prefix+'listshell':{
if (!getMoney(sender, balance)) return reply(`Maaf ${pushname} sepertinya saldo kamu Rp 0, Silahkan melakukan deposit sebelum transaksi, caranya ketik ${prefix}deposit`)

let textShell =`*VOUCHER GARENA SHELL*

*_Kode Produk : #VCGS_*

*VOUCHER GARENA SHELLS*
_PROSES 1-10 MENIT | VIA NOWA_

*LIST VOUCHER SHELL*
33 Shells = Rp9.500
66 Shells = Rp18.700
165 Shells = Rp46.500
330 Shells = Rp93.000
495 Shells = Rp138.000

*FORMAT ORDER*
${prefix}konfir <kodeproduk> <no_wa>

*CONTOH ORDER :*
${prefix}konfir #VCGS 6285789004732

*Note :*
Bisa Dikirim Via Email.`
reply(textShell)
}
break
case "5":
case prefix+'vcrlistrik':{
if (!getMoney(sender, balance)) return reply(`Maaf ${pushname} sepertinya saldo kamu Rp 0, Silahkan melakukan deposit sebelum transaksi, caranya ketik ${prefix}deposit`)

let Vcrlistrik =`*TOKEN LISTRIK*

*_Kode Produk : #VCTKN_*

*VOUCHER TOKEN LISTRIK*
_PROSES 1-10 MENIT | VIA ID_

*LIST TOKEN LISTRIK*
20.000 Vouchers = Rp21.500
50.000 Vouchers = Rp51.500
100.000 Vouchers = Rp101.500
200.000 Vouchers = Rp201.500

*FORMAT ORDER*
${prefix}konfir <kodeproduk> <no_wa>

*CONTOH ORDER :*
${prefix}konfir #VCTKN 6285789004732

*Note :*
Bisa Dikirim Via Email.`
reply(Vcrlistrik)
}
break
case "00":
case prefix+'topup':{
if (!getMoney(sender, balance)) return reply(`Maaf ${pushname} sepertinya saldo kamu Rp 0, Silahkan melakukan deposit sebelum transaksi, caranya ketik ${prefix}deposit`)
let sections = []
let listmenu = [`listml`,`listchip`,`listaov`,`listshell`,`vcrlistrik`,`cvsaldo`]
let listmenuu = [`Diamond Mobile Legends`,`Chip Higgs Domino`,`Voucher Arena Of Valor`,`Voucher Garena Shells`,`Voucher Token Listrik`,`Convert Saldo E-money`]
let lahkokngamok = ["Menampilkan List Diamond ML","Menampilkan List Chip Domino","Menampilkan List Voucher Aov","Menampilkan List Garena Shells","Menampilkan List Token Listrik","Menampilkan List Convert Saldo"]
let nombor = 1

let startnum = 0
let startnumm = 0

for (let x of listmenu) {
const yy = {title: 'LIST PRODUK KE ' + nombor++,
rows: [
{
title: `${listmenuu[startnum++]}`,
description: `${lahkokngamok[startnumm++]}`,
rowId: `${prefix}${x}`
}
]
}
sections.push(yy)
}
const sendm =  lexxy.sendMessage(
from, 
{
text: `Silahkan Pilih Salah Satu Produknya`, 
footer: `storemyid.com`,
title: `Hai ${pushname} Selamat ${ucapanWaktu}`, 
buttonText: "Click Here", 
sections,
mentions:[sender]
}, { quoted : fkontak })
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break


case prefix+"ceksaldo":
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Example :\n${command} 6285789004732`)
reply(`*SALDO USER*\n*ID :* ${q}\n*Saldo :* Rp.${getMoney(`${q}@s.whatsapp.net`, balance)}`)
//reply(`Deposit Sebesar Rp.${nominal} Telah Berhasil Di Lakukan`)

break
case prefix+'notifberhasil':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*Contoh* :\n${command} 6285789004732 5000`)

var orangNya = q.split(" ")[0]
var pesanNya = q.split(" ")[1]

var cp2 =`Hallo ${orangNya} deposit sebesar Rp${pesanNya} telah disetujui\nSilahkan cek dengan cara ketik ${prefix}saldo`
lexxy.sendMessage(`${q.split(" ")[0]}@s.whatsapp.net`, {text: cp2, mentions:[sender]}, {quoted:msg})
reply('Sukses Mengirim Notifikasi Ke Nomor Tujuan')
}
break

case prefix+'notiftolak':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*Contoh* :\n${command} 6285789004732 5000`)

var orangNya = q.split(" ")[0]
var depoNya = q.split(" ")[1]

var cp2 = `*DEPOSIT GAGAL*\nHallo @${orangNya}\nDeposit Sebesar ${depoNya} Status Di Tolak ❌`

lexxy.sendMessage(`${q.split(" ")[0]}@s.whatsapp.net`, {text: cp2, mentions:[sender]}, {quoted:msg})
reply('Sukses Mengirim Notifikasi Ke Nomor Tujuan')
}
break
         case prefix+'menu':
                case prefix+'help':
                

                   var media = await reSize(setting.pathimg, 300, 200)
                   lexxy.sendMessage(from, { caption: wiwik, location: { jpegThumbnail: media }, templateButtons: buttonsDefault, footer: footer, mentions: [sender] }, { quoted: msg })
                   addCmd(command.slice(1), 1, commund)
addHit(sender, command)
//var peluk = fs.readFileSync('./media/vn.mp3');
//lexxy.sendMessage(from, { audio: peluk, mimetype:'audio/mpeg', ptt:true }, { quoted: msg })
break
        case prefix+'owner': case prefix+'dev':
        

            sendContact(from, ownerNumber.split('@s.whatsapp.net')[0], ownerName, msg)
           .then((res) => lexxy.sendMessage(from, { text: 'Itu Nomor Owner Kak.' }, {quoted: res}))
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'tes':
case prefix+'runtime': case prefix+'ping':
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
let timestamp = speed()
let latensi = speed() - timestamp
let respon = `Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n\nRuntime : ${runtime(process.uptime())}`
reply(respon)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+'dashboard': case prefix+'db':{

let totalhit = await fetchJson(`https://api.countapi.xyz/hit/Lexxy/visits`)
let hitbiasa = await fetchJson(`https://api.countapi.xyz/hit/Lexxy${moment.tz('Asia/Jakarta').format('DDMMYYYY')}/visits`)

let listpcnya = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
let listgcnya = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)

var jumlahCmd = commund.length
if (jumlahCmd > 999) jumlahCmd = 999

teks = `\n*DASHBOARD*\n_Visitor Hit : ${totalhit.value}_\n_Global Hit : ${hitbiasa.value}_\n_Chat Pribadi : ${listpcnya.length}_\n_Chat Group : ${listgcnya.length}_\n\n*COMMAND*`
for (let i = 0; i < jumlahCmd ; i ++) {
teks += `\n_#${commund[i].id} = ${commund[i].total}_`
}
reply(teks)
}
break

case prefix+"komplain":{
if (!q) return reply(`*Contoh :*\n${command} bang proses pesanan ini`)
var textKomplain = `*KOMPLAIN USER*\n*ID :* ${sender.split("@")[0]}\n*Saldo :* Rp.${getMoney(`${sender.split("@")[0]}@s.whatsapp.net`, balance)}\n*Catatan : ${q}*`
lexxy.sendMessage("6283834558105@s.whatsapp.net", { text: `${textKomplain}`, quoted: msg}) 
reply(`Sukses Komplain Ke Owner.`)
}
break
//━━━━━━━━━━━━━━━[ STORE MENU ]━━━━━━━━━━━━━━━━━//
        case prefix+'shop': case prefix+'list':
        
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var listMsg = {
                text: `Hi @${sender.split("@")[0]}`,
                buttonText: 'Click Here!',
                footer: `*List From ${groupName}*\n\n⏳ ${jam}\n📆 ${tanggal}`,
                mentions: [sender],
                sections: [{
                    title: groupName, rows: arr_rows
                }]
            }
            lexxy.sendMessage(from, listMsg)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]                
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Berhasil menambah List menu *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Berhasil menambah List menu : *${args1}*`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'dellist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'listgc': {
let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
let teks = `     「 List Group Chat 」\n\nTotal List Group Bot : ${anu.length}`
for (let i of anu) {
 let metadata = await lexxy.groupMetadata(i)
 if (metadata.owner === "undefined") {
var loldd = false
 } else {
var loldd = metadata.owner
 }
 teks += `\n\nName : ${metadata.subject ? metadata.subject : "undefined"}\nOwner : ${loldd ? '@' + loldd.split("@")[0] : "undefined"}\nID : ${metadata.id ? metadata.id : "undefined"}\nDibuat : ${metadata.creation ? moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss') : "undefined"}\nMember : ${metadata.participants.length ? metadata.participants.length : "undefined"}`
}
reply(teks)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'listpc': {
let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
let teks = `     「 List Personal Chat 」\n\nTotal Chat Pribadi : ${anu.length}`
for (let i of anu) {
 teks += `\n\nProfile : @${i.id.split('@')[0]}\nChat : ${i.unreadCount}\nLastchat : ${moment(i.conversationTimestamp * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}`
}
reply(teks)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'soundcloud':{
if (!q) return reply(`Contoh :\n${command} https://m.soundcloud.com/dhproduction-indonesia/hingga-tua-bersama`)
var url = q
reply(mess.wait)
var soundcd = await fetchJson(`https://fatiharridho.herokuapp.com/api/downloader/soundcloud?url=${url}`)
var thumbCD = await getBuffer(soundcd.result.thumb)
var textCDnya = `*SOUNDCLOUD-DOWNLOAD*\njudul : ${soundcd.result.judul}\nsize : ${soundcd.result.download_count}`
lexxy.sendMessage(from, { image: thumbCD, caption: textCDnya}, { quoted: msg})
lexxy.sendMessage(from, { audio: { url: soundcd.result.link }, mimetype: 'audio/mpeg', fileName: `${soundcd.result.judul}`}, { quoted: msg})
}
break
case prefix+'mediafire':
if (!q) return reply(`*FORMAT MEDIAFIRE DOWNLOAD*\nExample:\n${command} URL\n\nContoh:\n${command} https://www.mediafire.com/file/4jzmc4boquizy0n/HAPUS_CONFIG_FF_MAX.7z/file`)

var { mediafireDl } = require('./lib/scrape/mediafire')

var linknya = q
const baby1 = await mediafireDl(linknya)
var result4 = `*MEDIAFIRE DOWNLOAD*	
Judul : ${baby1[0].nama}
Type : ${baby1[0].mime}
Size : ${baby1[0].size}
Link : ${baby1[0].link}
			
_Sedang Mengirim file..._`

reply(result4)
lexxy.sendMessage(from, { document : { url : baby1[0].link}, fileName : baby1[0].nama, mimetype: baby1[0].mime }, { quoted : msg }) 
addCmd(command.slice(1), 1, commund)
			break
case prefix+'ytsa':
reply('Sedang Mengirim Audio...')
var ytaa = await fetchJson(`https://zenzapis.xyz/downloader/ytshorts?apikey=neobot&url=${q}`)
lexxy.sendMessage(from, { audio: { url: ytaa.result.getAudio }, mimetype: 'audio/mpeg', fileName: `${ytaa.result.title}.mp3` }, { quoted: msg })
break
case prefix+'ytsv':
reply('Sedang Mengirim Video...')
var ytaa = await fetchJson(`https://zenzapis.xyz/downloader/ytshorts?apikey=neobot&url=${q}`)
let TextYtShortyy =`*YT SHORTS DOWNLOAD*
⭔ title : ${ytaa.result.title}
⭔ views : ${ytaa.result.views}
⭔ likes : ${ytaa.result.likes}
⭔ dislike : ${ytaa.result.dislike}
⭔ channel : ${ytaa.result.channel}
⭔ upload : ${ytaa.result.uploadDate}`

lexxy.sendMessage(from, { video: { url: ytaa.result.getVideo }, caption: TextYtShortyy}, { quoted: msg })
break
case prefix+'ytshorts':{
if (!q) return reply(`Example:\n${command} url\n\nContoh :\n${command} https://youtube.com/shorts/F1NY3wo9F2U?feature=share`)
var YtShorts = q
reply(mess.wait)
var yt = await fetchJson(`https://zenzapis.xyz/downloader/ytshorts?apikey=neobot&url=${YtShorts}`)
let buttons = [
{buttonId: `${prefix}ytsa ${q}`, buttonText: {displayText: `Audio (${yt.result.sizeAudio})`}, type: 1},
{buttonId: `${prefix}ytsv ${q}`, buttonText: {displayText: `Video (${yt.result.sizeVideo})`}, type: 1}
]
let buttonMessagett = {
image: { url: yt.result.thumb },
caption: `*YT SHORTS DOWNLOAD*
⭔ title : ${yt.result.title}
⭔ views : ${yt.result.views}
⭔ likes : ${yt.result.likes}
⭔ dislike : ${yt.result.dislike}
⭔ channel : ${yt.result.channel}
⭔ upload : ${yt.result.uploadDate}`,
footer: 'Pilih Media Yang Mau Di Unduh.' ,
buttons: buttons,
headerType: 4
}
lexxy.sendMessage(from, buttonMessagett, { quoted: msg })
}
break
case prefix+'y2mate':{
   if (!q) return reply(`Contoh :\n${command} https://youtu.be/gOH_wauzdFQ`)
   var y2mste = await fetchJson(`https://zenzapis.xyz/downloader/y2mate?apikey=neobot&query=${url}`)
reply(mess.wait)
   var buttonY2mate = [
{buttonId: `${prefix}ytmp3 ${q}`, buttonText: {displayText: `Audio (${y2mste.result.sizeAudio})`}, type: 1},
{buttonId: `${prefix}ytmp4 ${q}`, buttonText: {displayText: `Video (${y2mste.result.sizeVideo})`}, type: 1}
                ]
                var buttonMessagey2 = {
                    image: { url: y2mste.result.thumb },
                    caption: `*Y2MATE DOWNLOAD*
⌕ judul : ${y2mste.result.title}
⌕ quality : ${y2mste.result.quality}
⌕ id : ${y2mste.result.id}

Source Url :
${q}`,
                    footer: 'Silahkan pilih media dibawah.',
                    buttons: buttonY2mate,
                    headerType: 4
                }
lexxy.sendMessage(from, buttonMessagey2, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
   break

case prefix+'zippyshare':{
if (!q) return reply(`Contoh :\n${command} https://www11.zippyshare.com/v/lL4QGb1T/file.html`)
reply(mess.wait)
var zippy = await fetchJson(`https://zenzapis.xyz/downloader/zippyshare?apikey=neobot&url=${q}`)
var zipText = `*ZIPPY-SHARE*
nama : ${zippy.result.nama}
tipe : ${zippy.result.tipe}
ukuran : ${zippy.result.ukuran}
upload : ${zippy.result.up_at}

Link Download :
${zippy.result.link}`
reply(zipText)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
   break
case prefix+'tikporn':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
var tikPorn = await fetchJson(`https://zenzapis.xyz/downloader/tikporn?apikey=neobot`)
var tik = tikPorn.result
var textPorn = `*TIKTOK PORN*
title : ${tik.title}
source : ${tik.source}
upload : ${tik.upload}
like : ${tik.like}
dislike : ${tik.dislike}
favorite : ${tik.favorite}
views : ${tik.views}

Video :
${tik.video}

Tags : 
${tik.tags}`
reply(textPorn)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
   break
case prefix+'ytmp4': case prefix+'mp4':
			   if (!q) return reply(`Kirim perintah ${command} https://youtube.com/watch?v=e00w_clLkS0`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    hx.youtube(args[1]).then( data => {
			    console.log(data)
                var txtt = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.quality}\n*≻ Size :* ${data.size}\n*≻ Url Source :* ${args[1]}\n\n_Sedang Mengirim Media..._`
                var teks = `Done!`
                lexxy.sendMessage(from, { image: { url: data.thumb }, caption: txtt }, { quoted: msg })
                lexxy.sendMessage(from, { video: { url: data.link }, caption: teks }, { quoted: msg })
			    
				}).catch(() => reply(mess.error.api))
				addCmd(command.slice(1), 1, commund)
				addHit(sender, command)
			break
case prefix+'ytmp3': case prefix+'mp3':
			    if (!q) return reply(`Kirim perintah ${command} https://youtube.com/watch?v=e00w_clLkS0`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    hx.youtube(args[1]).then( data => {
                var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.quality}\n*≻ Size :* ${data.size_mp3}\n*≻ Url Source :* ${args[1]}\n\n_Sedang Mengirim Media..._`
			      lexxy.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
			      lexxy.sendMessage(from, { audio: { url: data.mp3 }, mimetype: 'audio/mpeg', fileName: `${data.title}.mp3` }, { quoted: msg })
                  
				}).catch(() => reply(mess.error.api))
				addCmd(command.slice(1), 1, commund)
				addHit(sender, command)
			break
case prefix+'play':{
 if (!q) return reply(`contoh :\n${command} dj angel baby`)
reply(`Searching.. ${q}`)
var yts = require("yt-search")
var search = await yts(q)
var anu = search.videos[Math.floor(Math.random() * search.videos.length)]
var buf = await getBuffer(anu.thumbnail)
var wm = `® Created By Lexxy Official`

var buttonplayny = [
{buttonId: `${prefix}ytmp3 ${anu.url}`, buttonText: {displayText: 'Audio'}, type: 1},
{buttonId: `${prefix}ytmp4 ${anu.url}`, buttonText: {displayText: 'Video'}, type: 1}
                ]
                var buttonMessageply = {
                    image: { url: anu.thumbnail },
                    caption: `*PLAYING YOUTUBE*
⌕ judul : ${anu.title}
⌕ channel : ${anu.author.name}
⌕ durasi : ${anu.timestamp}
⌕ uploader ${anu.ago}
⌕ views : ${anu.views}

Source Url :
${anu.url}`,
                    footer: 'Silahkan pilih media dibawah.',
                    buttons: buttonplayny,
                    headerType: 4
                }
lexxy.sendMessage(from, buttonMessageply, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
        case prefix+'updatelist': case prefix+'update':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        updateResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Berhasil update List menu : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Berhasil update List menu : *${args1}*`)
            }
            break
        case prefix+'tambah':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one + nilai_two}`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'kurang':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one - nilai_two}`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
        case prefix+'kali':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one * nilai_two}`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'bagi':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one / nilai_two}`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case 'p': case 'proses':
            if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
            if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
            if (!isQuotedMsg) return ('Reply Pesanannya!')
            let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`
            const getTextP = getTextSetProses(from, set_proses);
            if (getTextP !== undefined) {
                mentions(getTextP.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true)
            } else {
//lexxy.sendMessage(`6285878313791@s.whatsapp.net`, {text: proses });
   mentions(proses, [quotedMsg.sender], true)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case 'd': case 'done':
            if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
            if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
            if (!isQuotedMsg) return ('Reply Pesanannya!')
           let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya🙏`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
                mentions(getTextD.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true);
            } else {
//await lexxy.sendMessage(`${args[1]}@s.whatsapp.net`, {text: sukses });
   mentions(sukses, [quotedMsg.sender], true)
   }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
// SET WELCOME
case prefix+'setwelcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Hallo @user\nSelamat Datang Di @group\n\n*Jangan lupa intro ya :*\nNama :\nKelas :\nUmur : \nStatus : \n\n_*Sering baca deskripsi.*_`)

if (isSetWelcome(from, set_welcome_group)) return reply(`Set Welcome already active`)
addSetWelcome(q, from, set_welcome_group)
reply(`Successfully Set text Welcome!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'changewelcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Hallo @user\nSelamat Datang Di @group\n\n*Jangan lupa intro ya :*\nNama :\nKelas :\nUmur : \nStatus : \n\n_*Sering baca deskripsi.*_`)
changeSetWelcome(q, from, set_welcome_group)
reply(`Successfully Change text Welcome!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delwelcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetWelcome(from, set_welcome_group)) return reply(`Welcome Belum Di Setting\nSilahkan Ketik ${prefix}setwelcome`)
removeSetWelcome(from, set_welcome_group)
reply(`Successfully Delset text Welcome!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'getwelcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetWelcome(from, set_welcome_group)) return reply(`Welcome Belum Di Setting\nSilahkan Ketik ${prefix}setwelcome`)
reply(`*TEXT WELCOME*\n${getTextSetWelcome(from, set_welcome_group)}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

// SET LEFT
case prefix+'setleft':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Sayonara @user\nTelah Meninggalkan Grup @group\n`)
if (isSetLeft(from, set_left_db)) return reply(`Set Left already active`)
addSetLeft(q, from, set_left_db)
reply(`Successfully Set text Left!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'changeleft':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Sayonara @user\nTelah Meninggalkan Grup @group\n`)
changeSetLeft(q, from, set_left_db)
reply(`Successfully Change text Self!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delleft':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetLeft(from, set_left_db)) return reply(`Welcome Belum Di Setting\nSilahkan Ketik ${prefix}setwelcome`)
removeSetLeft(from, set_left_db)
reply(`Successfully Delset text Left!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'getleft':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetLeft(from, set_left_db)) return reply(`Welcome Belum Di Setting\nSilahkan Ketik ${prefix}setwelcome`)
reply(`*TEXT LEFT*\n${getTextSetLeft(from, set_left_db)}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'setproses': case prefix+'setp':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_p*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama`)
            if (isSetProses(from, set_proses)) return reply(`Set proses already active`)
            addSetProses(q, from, set_proses)
            reply(`Successfully set proses!`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'changeproses': case prefix+'changep':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_p*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama`)
            if (isSetProses(from, set_proses)) {
                changeSetProses(q, from, set_proses)
                reply(`Sukses change set proses teks!`)
            } else {
                addSetProses(q, from, set_proses)
                reply(`Sukses change set proses teks!`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'delsetproses': case prefix+'delsetp':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetProses(from, set_proses)) return reply(`Belum ada set proses di sini..`)
            removeSetProses(from, set_proses)
            reply(`Sukses delete set proses`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'setdone': case prefix+'setd':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_done*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama\n\nList Opts : tanggal/jam`)
            if (isSetDone(from, set_done)) return reply(`Set done already active`)
            addSetDone(q, from, set_done)
            reply(`Successfully set done!`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'changedone': case prefix+'changed':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_done*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama\n\nList Opts : tanggal/jam`)
            if (isSetDone(from, set_done)) {
                changeSetDone(q, from, set_done)
                reply(`Sukses change set done teks!`)
            } else {
                addSetDone(q, from, set_done)
                reply(`Sukses change set done teks!`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'delsetdone': case prefix+'delsetd':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetDone(from, set_done)) return reply(`Belum ada set done di sini..`)
            removeSetDone(from, set_done)
            reply(`Sukses delete set done`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

//━━━━━━━━━━━━━━━[ GROUP MENU ]━━━━━━━━━━━━━━━━━//
        case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var url = await lexxy.groupInviteCode(from).catch(() => reply(mess.error.api))
            url = 'https://chat.whatsapp.com/'+url
            reply(url)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

        case prefix+'setppgrup': case prefix+'setppgc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (isImage || isQuotedImage) {
            var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
            if (args[1] == '\'panjang\'') {
            	var { img } = await generateProfilePicture(media)
            	await lexxy.query({
                    tag: 'iq',
                    attrs: {
                        to: from,
                        type:'set',
                        xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    } 
                    ]
                })
                fs.unlinkSync(media)
            	reply(`Sukses`)
            } else {
                await lexxy.updateProfilePicture(from, { url: media })
                .then( res => {
                    reply(`Sukses`)
                    fs.unlinkSync(media)
                }).catch(() => reply(mess.error.api))
            }
            } else {
			    reply(`Kirim/balas gambar dengan caption ${command}`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'setnamegrup': case prefix+'setnamegc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} Support ${ownerName}`)
            await lexxy.groupUpdateSubject(from, q)
            .then( res => {
                reply(`Sukses`)
            }).catch(() => reply(mess.error.api))
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'setdesc': case prefix+'setdescription':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} New Description by ${ownerName}`)
            await lexxy.groupUpdateDescription(from, q)
            .then( res => {
                reply(`Sukses`)
            }).catch(() => reply(mess.error.api))
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'antilink':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length === 1) return reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
            if (args[1].toLowerCase() === 'on'){
                if (isAntiLink) return reply(`Udah aktif`)
                antilink.push(from)
                fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                reply('Successfully Activate Antilink In This Group')
            } else if (args[1].toLowerCase() === 'off'){
                if (!isAntiLink) return reply(`Udah nonaktif`)
                let anu = antilink.indexOf(from)
                antilink.splice(anu, 1)
                fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                reply('Successfully Disabling Antilink In This Group')
            } else {
                reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'antiwame':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length === 1) return reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
            if (args[1].toLowerCase() === 'on'){
                if (isAntiWame) return reply(`Udah aktif`)
                antiwame.push(from)
                fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                reply('Successfully Activate Antiwame In This Group')
            } else if (args[1].toLowerCase() === 'off'){
                if (!isAntiWame) return reply(`Udah nonaktif`)
                let anu = antiwame.indexOf(from)
                antiwame.splice(anu, 1)
                fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                reply('Successfully Disabling Antiwame In This Group')
            } else {
                reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"resethit":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/dashboard/userhit.json', JSON.stringify(hitbot, null, 2))
var mytext = "[]"
hitbot.splice(mytext)
reply('Successfully Reset Hit Bot')
}

break
case prefix+"resetuser":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
var mytext = "[]"
pendaftar.splice(mytext)
reply('Successfully Reset Pengguna')
}

break
case prefix+"resetall":{
if (!isOwner) return reply(mess.OnlyOwner)
var mytext = "[]"
db_close_group.splice(mytext)
balance.splice(mytext)
daftar.splice(mytext)
commund.splice(mytext)
hitbot.splice(mytext)
pendaftar.splice(mytext)
db_respon_list.splice(mytext)
db_respon_group.splice(mytext)
db_open_group.splice(mytext)
db_close_group.splice(mytext)
reply('Successfully Reset Semua Database.')
}
break
case prefix+"resetlist":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/list-message.json', JSON.stringify(db_respon_list, null, 2))
var mytext = "[]"
db_respon_list.splice(mytext)
reply('Successfully Reset List Group')
}

break
case prefix+"resetgame":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(db_respon_list, null, 2))
var mytext = "[]"
daftar.splice(mytext)
reply('Successfully Reset Global Game')
}

break
case prefix+"resetsaldo":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/deposit/saldo.json', JSON.stringify(balance, null, 2))
var mytext = "[]"
balance.splice(mytext)
reply('Successfully Reset Saldo Global')
}

break
case prefix+'welcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (args.length < 2) return reply(`*Example :*\n${command} on\n${command} off\n\nPilih Salah Satu Di Atas`)
if (args[1].toLowerCase() === "on") {
if (isWelcome) return reply(`Welcome sudah aktif`)
                              welcome.push(from)
                              fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses mengaktifkan welcome di grup ini`)
                            } else if (args[1].toLowerCase() === "off") {
                              if (!isWelcome) return reply(`Welcome sudah dimatikan`)
                              var posi = welcome.indexOf(from)
                              welcome.splice(posi, 1)
                              fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses menonaktifkan welcome di grup ini`)
                            } else {
                              reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
                            }
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'left':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (args.length < 2) return reply(`*Example :*\n${command} on\n${command} off\n\nPilih Salah Satu Di Atas`)
if (args[1].toLowerCase() === "on") {
if (isLeft) return reply(`Left sudah aktif`)
                              left.push(from)
                              fs.writeFileSync('./database/left.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses mengaktifkan left di grup ini`)
                            } else if (args[1].toLowerCase() === "off") {
                              if (!isLeft) return reply(`Left sudah dimatikan`)
                              var posi = welcome.indexOf(from)
                             left.splice(posi, 1)
                              fs.writeFileSync('./database/left.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses menonaktifkan left di grup ini`)
                            } else {
                              reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
                            }
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'open': case prefix+'buka':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            lexxy.groupSettingUpdate(from, 'not_announcement')
            .then((res) => {
                const textOpen = getTextSetOpen(from, db_open_group);
                if (textOpen !== undefined) {
                    reply(textOpen);
                } else {
                    reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
                }
            })
            .catch((err) => reply('Error message'))
			addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'close': case prefix+'tutup':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
		    lexxy.groupSettingUpdate(from, 'announcement')
		    .then((res) => {
                const textClose = getTextSetClose(from, db_close_group);
                if (textClose !== undefined) {
                    reply(textClose);
                } else {
                    reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
                }
            })
            .catch((err) => reply('Error message'))
		    addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'add':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (groupMembers.length == 257) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
            var mems = []
            groupMembers.map( i => mems.push(i.id) )
            var number;
            if (args.length > 1) {
                number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
                var cek = await lexxy.onWhatsApp(number)
                if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                lexxy.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                var cek = await lexxy.onWhatsApp(number)
                if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                lexxy.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'kick':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                lexxy.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                lexxy.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'promote': case prefix+'pm':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                lexxy.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
                .catch(() => reply(mess.error.api))
            } else if (isQuotedMsg) {
                lexxy.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
                .catch(() => reply(mess.error.api))
            } else {
                reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'demote':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                lexxy.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
                .catch(() => reply(mess.error.api))
            } else if (isQuotedMsg) {
                lexxy.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
                .catch(() => reply(mess.error.api))
            } else {
                reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'revoke':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            await lexxy.groupRevokeInvite(from)
            .then( res => {
                reply(`Sukses menyetel tautan undangan grup ini`)
            }).catch(() => reply(mess.error.api))
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'tagall': {
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n`
for (let mem of participants) {
teks += `➲ @${mem.id.split('@')[0]}\n`
}
lexxy.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'hidetag':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let mem = [];
            groupMembers.map( i => mem.push(i.id) )
            lexxy.sendMessage(from, { text: q ? q : '', mentions: mem })
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'delete': case prefix+'del': case prefix+'d':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isQuotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
            if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
            lexxy.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        // Owners Menu
        case prefix+'exif':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            var namaPack = q.split('|')[0] ? q.split('|')[0] : q
            var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
            exif.create(namaPack, authorPack)
            reply(`Sukses membuat exif`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'join':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            var url = args[1]
            url = url.split('https://chat.whatsapp.com/')[1]
            var data = await lexxy.groupAcceptInvite(url)
            reply(jsonformat(data))
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'leave':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!isGroup) return reply(mess.OnlyGrup)
            lexxy.groupLeave(from)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'self':{
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            lexxy.mode = 'self'
            reply('Berhasil berubah ke mode self')
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'publik': case prefix+'public':{
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            lexxy.mode = 'public'
            reply('Berhasil berubah ke mode public')
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'rules':
let rulestext =`
≻ *SYARAT & KETENTUAN*

1. Jangan Spam Bot.
Sanksi: *❎ WARN/SOFT BLOCK*
2. Jangan Telepon Bot.
Sanksi: *❎ SOFT BLOCK*
3. Jangan Mengeksploitasi Bot.
Sanksi: *PERMANENT BLOCK*

💬 : Bang Cara Dapetin Script Botnya? Gmn
👤 : Cukup Beli Di Lexxy Official Ketik *${prefix}creator*

💬 : Bang Boleh Ku Masukin Ngga Botnya Di Group?
👤 : Dilarang Masukin Bot Ke Group Kecuali Atas Izin Owner.

Jika sudah dipahami rules-nya, silakan ketik *#menu* untuk memulai!
Segala kebijakan dan ketentuan *${setting.botName}* di pegang oleh owner dan segala perubahan kebijakan, sewaktu waktu owner berhak mencabut, atau memblokir user(*﹏*)`
reply(rulestext)
addCmd(command.slice(1), 1, commund)
break
case prefix+'sewabot':
let textSewaNya =`
*LIST HARGA SEWABOT*

*_Sewabot Harian :_*
➭ _1 Hari = Rp700_
➭ _2 Hari = Rp1.500_
➭ _3 Hari = Rp2.100_
➭ _4 Hari = Rp2.700_
➭ _5 Hari = Rp3.500_
➭ _6 Hari = Rp4.200_

*_Sewabot Mingguan :_*
➭ _1 Minggu = Rp5.000_
➭ _2 Minggu = Rp9.700_
➭ _3 Minggu = Rp.13.500_

*_Sewabot Bulanan :_*
➭ _1 Bulan = Rp14.500_
➭ _2 Bulan = Rp28.000_
➭ _3 Bulan = Rp42.000_

*_Paket Premium :_*
_➭ Permanen = Rp70.000_

*Keuntungan Sewabot :*
1. _Bot Online 24 Jam_
2. _Ada Fitur Topup ff Otomatis_
3. _Fitur Store / Buat Jualan Di Group_
4. _Antilink/Hidetag/Shortlink/Kick_
5. _Addlist/Dellist/SetProses/SetDone_
6. _Buka Group - Tutup Group_

*Jika Minat Hubungi Admin.*
_Wa.me/6283834558105_
`
reply(textSewaNya)
break
case prefix+'donasi':
case prefix+'donate':
let textDonaNya =`
*DONASI BOT*

*E-walet Monay :*
➭ ${setting.textBarisDonate1}
➭ ${setting.textBarisDonate2}
➭ ${setting.textBarisDonate3}
➭ ${setting.textBarisDonate4}

*Qris All Payment :*
${setting.QrisAllPay}
`
reply(textDonaNya)
break
case prefix+'mysesi':
case prefix+'sendsesi':
case prefix+'session':
if (!isOwner) return reply(mess.OnlyOwner)
var setting = JSON.parse(fs.readFileSync('./config.json'));
var anumu = await fs.readFileSync(`./${setting.sessionName}.json`)
lexxy.sendMessage(from, { document: anumu, mimetype: 'document/application', fileName: 'session.json'}, {quoted: msg } )
reply(`*Note :*\n_Session Bot Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk User Bot Ataupun Pengguna Bot._`)
reply(`_Sedang Mengirim Document_\n_Nama Session : ${setting.sessionName}.json_\n_Mohon Tunggu Sebentar..._`)
addCmd(command.slice(1), 1, commund)
			break
case 'bot':
reply(`Wa.me/${botNumber.split("@")[0]}`)
break
case 'wame':
reply(`Wa.me/${sender.split("@")[0]}`)
break
        case prefix+'setpp': case prefix+'setppbot':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (isImage || isQuotedImage) {
                var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
                if (args[1] == '\'panjang\'') {
                    var { img } = await generateProfilePicture(media)
                    await lexxy.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type:'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [
                        {
                            tag: 'picture',
                            attrs: { type: 'image' },
                            content: img
                        }
					    ]
                    })
					fs.unlinkSync(media)
					reply(`Sukses`)
				} else {
					var data = await lexxy.updateProfilePicture(botNumber, { url: media })
			        fs.unlinkSync(media)
				    reply(`Sukses`)
				}
            } else {
                reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'broadcast': case prefix+'bc':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
            var data = await store.chats.all()
            var teks = `${q}`
            for (let i of data) {
                lexxy.sendMessage(i.id, { text: teks })
                await sleep(1000)
            }
            reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'creategc':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*Example :*\n${command} namagroup`)
var namanya = body.slice(10)
let cret = await lexxy.groupCreate(namanya, [])
let response = await lexxy.groupInviteCode(cret.id)
var teks = `  「 *Create Group* 」

_*▸ Name : ${cret.subject}*_
_*▸ Owner : @${cret.owner.split("@")[0]}*_
_*▸ Time : ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB*_

*Link Create Group* :
https://chat.whatsapp.com/${response}
`
reply(teks)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'addkey':
case prefix+'addrespon':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`*FORMAT ADDRESPON*\n\n_Example:_\n${command} *key@response*\n\n_Contoh:_\n${command} *tes@apa*`)
if (checkResponGroup(from, args1, db_respon_group)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponGroup(from, args1, args2, db_respon_group)
reply(`Berhasil menambah Respon : *${args1}*`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delkey':
case prefix+'delrespon':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q
if (db_respon_group.length === 0) return reply(`Belum ada key message di database`)
if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
if (!checkResponGroup(from, args1, db_respon_group)) return reply(`List respon dengan key *${args1}* tidak ada di database!`)
deleteResponGroup(from, args1, db_respon_group)
reply(`Sukses hapus respon message dengan key *${q}*`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'setkey':
case prefix+'setrespon':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`*FORMAT ADDRESPON*\n\n_Example:_\n${command} *key@response*\n\n_Contoh:_\n${command} *tes@apa*`)
if (checkResponGroup(from, q, db_respon_group)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
changeResponGroup(from, args1, args2, db_respon_group)
reply(`Berhasil mengubah Respon : *${args1}*`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'setclose':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Example :\n${command} text\n\nContoh :\n${command} Group Di Tutup Sementara.`)
var args1 = q
addSetClose(args1, from, db_close_group) 
reply(`Berhasil mengubah pesan group close menjadi : ${args1}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delclose':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
removeSetClose(from, db_close_group)
reply(`Sukses hapus pesan group close`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'getclose':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetClose(from, db_close_group)) return reply(`Belum ada pesan close\njika mau mau add pesan\nsilahkan ketik ${prefix}setclose`)
reply(`*PESAN CLOSE GROUP*\n${getTextSetClose(from, db_close_group)}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'listkey':
case prefix+'cekrespon':
case prefix+'listrespon':{
if (!isGroup) return reply(mess.OnlyGrup)
var group_respon_nya = JSON.parse(fs.readFileSync('./database/respon-group.json'))
if (db_respon_group.length === 0) return reply(`Belum ada respon message di database\nSilahkan Ketik ${prefix}addkey`)
let teks = `*LIST RESPON GROUP*\n`
for (let i of group_respon_nya) {
teks += `*keyword :* ${i.key}\n`
}
reply(teks)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'setopen':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Example :\n${command} text\n\nContoh :\n${command} Group Sudah Open Kembali.`)
var args1 = q
addSetOpen(args1, from, db_open_group) 
reply(`Berhasil mengubah pesan group open menjadi : ${args1}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delopen':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
removeSetOpen(from, db_open_group)
reply(`Sukses hapus pesan group open`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'getopen':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetOpen(from, db_open_group)) return reply(`Belum ada pesan close\njika mau mau add pesan\nsilahkan ketik ${prefix}setopen`)
reply(`*PESAN OPEN GROUP*\n${getTextSetOpen(from, db_open_group)}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'simi':
if (!q) return reply(`*Contoh* : ${prefix+command} halo`)
fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
.then(simi1 => {reply(simi1.success)})
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+"cvgpy":{



var idnYaa = q.split("|")[0]
var nopeNya = q.split("|")[1]

const csrf = await hikki.payment.csrfGenerator()
const { data } = await hikki.payment.listProduct(csrf)

reply ('Mengirim Data...')
console.log(data)

const isValidId = data.daftar_product.find(product => product.id == idnYaa)
if (!isValidId) return console.error(isValidId)

const gass = await hikki.payment.convertGopay(idnYaa, nopeNya, csrf)
console.log(gass)

let cpSaldo = `*CONVERT SALDO*
*ID Produk : ${idnYaa}*
*Nomer Tujuan : ${nopeNya}*
*Payment : QRIS*
*ID_TRX : ${gass.id_order}*
*ID_USER : ${gass.id_user}*

Jika Ingin Melihat ID Produk
Silahkan Ketik ${prefix}gopaycv`

lexxy.sendMessage(from, { image: { url: gass.qr}, caption: cpSaldo}, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"facebook":{


if (!q) return reply(`*Contoh :*\n${command} https://www.facebook.com/mhmd.farid.908/videos/473529950837803/`)

hikki.downloader.facebookDownload(q).then(data => {
reply(mess.wait)
let fbText =`*FACEBOOK DOWNLOAD*
Title : ${data.result.title}
From : ${data.result.url}`
lexxy.sendMessage(from, { video: { url: data.result.hd }, caption: fbText }, { quoted: msg })
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'resad':{
if (!q) return reply(`contoh :\n${command} https://vt.tiktok.com/ZSdbFNn96/?k=1`)

var url = q
var fatihh = await fetchJson(`https://fatiharridho.herokuapp.com/api/downloader/tiktok?url=${url}`)
reply(mess.wait)
var fatih = fatihh.result
lexxy.sendMessage(from, { audio: { url: fatih.audio }, mimetype: 'audio/mpeg', fileName: `${fatih.title}.mp3` }, { quoted: msg })
}
break
case prefix+'resvd':{
if (!q) return reply(`contoh :\n${command} https://vt.tiktok.com/ZSdbFNn96/?k=1`)

var url = q
var fatihh = await fetchJson(`https://fatiharridho.herokuapp.com/api/downloader/tiktok?url=${url}`)
reply(mess.wait)
var fatih = fatihh.result
lexxy.sendMessage(from, { video: { url: fatih.nowm }, caption: 'Nowm!!' }, { quoted: msg})
}
break
case prefix+'twitter':{
if (!q) return reply(`contoh :\n${command} https://twitter.com/PassengersMovie/status/821025484150423557`)
var url = q
reply(mess.wait)
var fatihh = await fetchJson(`https://fatiharridho.herokuapp.com/api/downloader/twitter?url=${url}`)
var fatih = fatihh.result
lexxy.sendMessage(from, { video: { url: fatih.HD }, caption: 'Twitter video'}, { quoted: msg })
}
break
case prefix+'tiktok':{
if (!q) return reply(`contoh :\n${command} https://vt.tiktok.com/ZSdbFNn96/?k=1`)
var url = q
var fatihh = await fetchJson(`https://fatiharridho.herokuapp.com/api/downloader/tiktok?url=${url}`)
reply(mess.wait)
var fatih = fatihh.result

let textTiktokk =`*TIKTOK RESULT*
title : ${fatih.title}
author : ${fatih.author}
url : ${url}`

let buttons = [
{buttonId: `${prefix}resad ${url}`, buttonText: {displayText: 'Audio'}, type: 1},
{buttonId: `${prefix}resvd ${url}`, buttonText: {displayText: 'Video'}, type: 1}
]
  let buttonMessage = {
  image: { url: fatih.thumbnail },
  caption: textTiktokk,
  footer: 'silahkan pilih media dibawah !!',
  buttons: buttons,
  headerType: 4
  }
  lexxy.sendMessage(from, buttonMessage, { quoted: msg })
}
break
case prefix+"sosmed":{
if (!q) return reply(`Example :\n${command} urlMediaSosial\n\n*© Meta Scrape - Sosial Media*\nig,Tiktok,youTube,Twitter,Facebook`)
hikki.downloader.metaScrape(q).then(data => {
console.log(data)
let Deteckk =`*META-SCRAPE*
Source : ${data.source}
Video : ${data.medias[0].videoAvailable}
Audio : ${data.medias[0].audioAvailable}`
reply(Deteckk)

let SourceText =`*SOSIAL-MEDIA*
url : ${data.url}
quality : ${data.medias[0].quality}
extension : ${data.medias[0].extension}
formattedSize : ${data.medias[0].formattedSize}
videoAvailable : ${data.medias[0].videoAvailable}
audioAvailable : ${data.medias[0].audioAvailable}
chunked : ${data.medias[0].chunked}

Source : ${data.source}`
reply(mess.wait)

lexxy.sendMessage(from, { video: { url: data.medias[0].url }, caption: SourceText }, { quoted: msg})
lexxy.sendMessage(from, { audio: { url: data.medias[0].url }, mimetype: 'audio/mpeg', fileName: `${data.title}.mp3` }, { quoted: msg })
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'gsmarena':{
if (!q) return reply(`*Contoh * : ${prefix+command} realme`)
reply(mess.wait)
let gsMaren = await fetchJson(`https://api-yogipw.herokuapp.com/api/search/gsmarena?query=${q}`)
let textGsMarena =`*GS-MARENA SEARCHING*
judul : ${gsMaren.judul}
rilis : ${gsMaren.rilis}
type : ${gsMaren.type}
ukuran : ${gsMaren.ukuran}
storage : ${gsMaren.storage}
display : ${gsMaren.display}
inchi : ${gsMaren.inchi}
pixel : ${gsMaren.pixel}
videoPixel : ${gsMaren.videoPixel}
ram : ${gsMaren.ram}
chipset : ${gsMaren.chipset}
baterai : ${gsMaren.batrai}
merek_baterai : ${gsMaren.merek_batre}

*detail*:
${gsMaren.detail}`
let tbMarena = await getBuffer(gsMaren.thumb)
lexxy.sendMessage(from, { image: tbMarena, caption: textGsMarena}, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"tinyurl":{


if (!q) return reply(`*Contoh :* ${prefix+command} google.com`)
let tinyurl = await fetchJson(`https://api-yogipw.herokuapp.com/api/short/tinyurl?url=${q}`)
lexxy.sendMessage(from, {text: `Link Original : ${q}\nLink Shortlink : ${tinyurl.result}`, quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"isgd":{


if (!q) return reply(`*Contoh :* ${prefix+command} google.com`)
let isgd = await fetchJson(`https://api-yogipw.herokuapp.com/api/short/isgd?url=${q}`)
lexxy.sendMessage(from, {text: `Link Original : ${q}\nLink Shortlink : ${isgd.result.link}`, quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"cuttly":{


if (!q) return reply(`*Contoh :* ${prefix+command} google.com`)
let cuttly = await fetchJson(`https://api-yogipw.herokuapp.com/api/short/cuttly?url=${q}`)
lexxy.sendMessage(from, {text: `Link Original : ${q}\nLink Shortlink : ${cuttly.result.link}`, quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'id':


reply(from)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'topupff':{


if (!q) return reply(`*Example :*\n${command} id\n\n*Contoh :*\n${command} 239814337`)
let sections = []

var idnya = body.slice(9)

let listmenu = [`tp1 ${idnya}|5`,`tp1 ${idnya}|12`,`tp1 ${idnya}|70`,`tp1 ${idnya}|140`,`tp1 ${idnya}|355`,`tp1 ${idnya}|720`]
let listmenuu = [`5 DIAMOND 💎`,`12 DIAMOND 💎`,`70 DIAMOND 💎`,`140 DIAMOND 💎`,`355 DIAMOND 💎`,`720 DIAMOND 💎`]
let lahkokngamok = ['Sistem Proses Otomatis 3-7 Menit']
let nombor = 1

let startnum = 0
let startnumm = 0
for (let x of listmenu) {
const yy = {title: 'List Diamond Ke ' + nombor++,
rows: [
{
title: `${listmenuu[startnum++]}`,
description: `${lahkokngamok[startnumm]}`,
rowId: `${prefix}${x}`
}
]
}
sections.push(yy)
}
const sendm =  lexxy.sendMessage(
from, 
{
text: `Silahkan Pilih Nominal Diamond Nya`, 
footer: `® Top Up Free Fire Otomatis`,
title: `Hai ${pushname} ${ucapanWaktu}`, 
buttonText: "Click Here", 
sections,
mentions:[sender]
}, { quoted : fkontak })
}

			addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'tp1':
if (!q) return reply(`*Example :*\n${command} id|nominal\n\n*Contoh :*\n${command} 239814337|70\n\n_Support Nominal_ :\n5 12 70 140 355 720`)

var res = q
var idnya = res.split("|")[0]
var dmnya = res.split("|")[1]

reply(mess.wait)

async function topupFreeFire() {

const makeSession = await hikki.game.topupFreeFire(idnya, dmnya) 

// console.log(makeSession) if get more property

let nihbos = makeSession.data.paymentName
let nihname = makeSession.data.userNameGame
let produkharga = makeSession.data.price
let idtranks = makeSession.data.transactionId
let jumlahdm = makeSession.data.item.name

var yainj =`
*TOP UP DIAMOND FREE FIRE*
🎮 *Game ID : ${idnya}*
📝 *Nickname : ${nihname}*
🛒 *Produk : Diamond FF*
🏷️ *Jumlah : ${jumlahdm}* 💎
💸 *Payment : ${nihbos}*
🪙 *Harga Produk : Rp${produkharga}*
📊 *ID Tranksaksi : ${idtranks}*
`
var yoicpii =`Sebelum Melakukan Pembayaran Silahkan Cek Data Di Atas Apakah Sudah Benar?

Jika Data Nya Sudah Benar, Silahkan Klik Button Konfirmasi Di Bawah`

var bgnya = await getBuffer(`https://telegra.ph/file/09a8a59066e980373c030.jpg`)

lexxy.sendMessage(from, { caption: yainj, location: { jpegThumbnail: bgnya }, templateButtons: buttonsTopup, footer: `${yoicpii}\n\n® Created By Lexxy Official\n`, mentions: [sender] })

return await hikki.game.payDiamond(makeSession, '08953225697662')
}
topupFreeFire().then(data => {
})

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

case prefix+'tp2':

var res = q
var id = res.split("|")[0]
var nom = res.split("|")[1]

async function topupFreeFire2() {
const makeSession = await hikki.game.topupFreeFire(id, nom) // support nominal 5 12 70 140 355 720'
// console.log(makeSession) if get more property

let p1 = makeSession.data.paymentId
let p2 = makeSession.data.item.id
let p3 = makeSession.data.gameId
let nihbos = makeSession.data.paymentName
let nihname = makeSession.data.userNameGame
let produkharga = makeSession.data.price
let idtranks = makeSession.data.transactionId
let jumlahdm = makeSession.data.item.name


var konfir =`*KONFIRMASI TRANSAKSI*\n_#${p1}${p2}${p3}_\n\n*DATA RESULT*\n> _*ID Game :* ${id}_\n> _*Nickname :* ${nihname}_\n> _*Payment* : ${nihbos}_\n> _*Harga Produk :* Rp.${produkharga}_\n> _*Produk :* Diamond Free Fire_`
reply(konfir)

return await hikki.game.payDiamond(makeSession, '08953225697662')
}
topupFreeFire2().then(data => {
lexxy.sendMessage(from, { image: { url: data.qrCode }, caption: `_Silahkan Transfer Via Qris Di Atas_\n\n*Note :*\n_Wajib Transfer Sesuai Jumlah, Agar Diamond Otomatis Masuk_\n\n*Count :*\n_Qris Berlaku Hanya 5 Menit_` }, { quoted: msg })
})
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'gopaycv':
reply(`*KODE PRODUK CONVERT*

Payment : Gopay

*LIST PRODUK*
Kode 24 = Rp10.000
Kode 25 = Rp20.000
Kode 26 = Rp25.000
Kode 27 = Rp30.000
Kode 28 = Rp40.000
Kode 29 = Rp50.000
Kode 30 = Rp70.000
Kode 31 = Rp75.000
Kode 32 = Rp90.000
Kode 33 = Rp100.000
Kode 34 = Rp150.000
Kode 35 = Rp200.000`)
break
case prefix+'gopay': {


if (!q) return reply(`*Contoh :*\n${command} 0857××××××\n\nSalah input nomor bukan tanggung jawab admin.`)
if (args.length == 10) return reply(`Minimal 10 Angka.`)
var nomorNya = q
let sections = []
let listmenu = [`cvgpy 24|${nomorNya}`,`cvgpy 25|${nomorNya}`,`cvgpy 26|${nomorNya}`,`cvgpy 27|${nomorNya}`,`cvgpy 28|${nomorNya}`,`cvgpy 29|${nomorNya}`,`cvgpy 30|${nomorNya}`,`cvgpy 31|${nomorNya}`,`cvgpy 32|${nomorNya}`,`cvgpy 33|${nomorNya}`,`cvgpy 34|${nomorNya}`,`cvgpy 35|${nomorNya}`]
let listmenuu = [`༺ GoPay 10.000`,`༺ GoPay 20.000`,`༺ GoPay 25.000`,`༺ GoPay 30.000`,`༺ GoPay 40.000`,`༺ GoPay 50.000`,`༺ GoPay 70.000`,`༺ GoPay 75.000`,`༺ GoPay 90.000`,`༺ GoPay 100.000`,`༺ GoPay 150.000`,`༺ GoPay 200.000`]
let listmenuuu = [`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`]
let nombor = 1

let startnum = 0
let startnumm = 0
for (let x of listmenu) {
const yy = {title: 'Pilihan Saldo Ke ' + nombor++,
rows: [
{
title: `${listmenuu[startnum++]}`,
description: `${listmenuuu[startnumm++]}`,
rowId: `${prefix}${x}`
}
]
}
sections.push(yy)
}
const sendm =  lexxy.sendMessage(
from, 
{
text: `Silahkan Pilih Nominal Saldo E-wallet Yang Akan Anda Convert Ke Gopay!.

Note: Pembayaran Disini Hanya Menggunakan Server, Owner Tidak Mendapatkan Hasil Apapun Disini Karena Diproses Langsung Dari Server!.

Jika Sudah Melakukan Pemilihan Nominal, Anda Akan Dikirimkan Qris Pembayaran Dan Anda Harus Membayar Melalu Aplikasi E-wallet Yang Mendukung Qris, Pastikan Nominal Yang Anda Krimkan Harus Sama Dengan Nominal Yang Diminta!.

Jika Anda Sudah Melakukan Pembayaran, Silahkan Tunggu 1-2 Menit Dan Melakukan Pengecekan Secara Berkala Pada Saldo Anda!.`, 
footer: `© By Lexxy Official`, 
title: `━━[ Nominal Saldo Gopay ]━━`, 
buttonText: "Click Here", 
sections,
mentions:[sender]
}, { quoted : fkontak })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

case prefix+'bocil':{


reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Bocil.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN BOCIL*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'santuy':{


reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Santuy.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN SANTUY*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'ghea':{


reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Ghea.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN GHEA*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'hijab':
case prefix+'hijaber':{


reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Hijaber.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN HIJABER*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'rika':{


reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Rika.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN RIKA*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'quotes':{


reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/RANDOM/Quotes.json'))
var techno = pickRandom(tecno)
let TextQuotesNya =`*RANDOM QUOTES*
• *Author :* ${techno.author}
• *Quotes :* ${techno.quotes}`
reply(TextQuotesNya)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

case prefix+'bacaansholat':{
reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./db/function/Bacaansholat.json'))
var hadi = pickRandom(tecno)
let textHadits = `*BACAAN-SHOLAT*
name : ${hadi.name}
arabic : ${hadi.arabic}
latin : ${hadi.latin}
terjemahan : ${hadi.terjemahan}`
reply(textHadits)
}
break
case prefix+'doaharian':{
reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./db/function/Doaharian.json'))
var hadi = pickRandom(tecno)
let textDoa =`*DOA-HARIAN*
title : ${hadi.title}
arabic : ${hadi.arabic}
latin : ${hadi.latin}
translation : ${hadi.translation}`
reply(textDoa)
}
break
case prefix+'ayatkursi':{
reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./db/function/Ayatkursi.json'))
let textAyatKursi =`*AYAT-KURSI*
tafsir : ${hadi.tafsir}
translation : ${hadi.translation}
arabic : ${hadi.arabic}
latin : ${hadi.latin}`
reply(textAyatKursi)
}
break
case prefix+'loli':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Loli.json'))
var jomek = pickRandom(memsk)
var loliNyas = await getBuffer(jomek)
lexxy.sendMessage(from, { image: loliNyas, caption: '© Random Loli' }, {quoted:msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'cogan':{


reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Cogan.json'))
var jomek = pickRandom(memsk)
var cogAn = await getBuffer(jomek)
lexxy.sendMessage(from, { image: cogAn, caption: '© Random Cogan' }, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'cecan':{


reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Cecan.json'))
var jomek = pickRandom(memsk)
var cecAn = await getBuffer(jomek.url)
lexxy.sendMessage(from, { image: cecAn, caption: '© Random Cecan' }, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'anime':{

reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Anime.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek.url }, caption: '© Random Anime' }, {quoted:msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'meme':{


reply(mess.wait)
var mems = JSON.parse(fs.readFileSync('./media/RANDOM/Meme.json'))
var jomek = pickRandom(mems)
var gimemm = await getBuffer(jomek)
lexxy.sendMessage(from, { image: gimemm, caption: '© Random Meme'}, { quoted: msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'jokes':{


reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Darkjokes.json'))
var jomek = pickRandom(memsk)
var jokss = await getBuffer(jomek)
lexxy.sendMessage(from, { image: jokss, caption: '© Random Darkjoke' }, { quoted: msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'renungan':{
reply(mess.wait)
var jokss = await getBuffer(`https://fatiharridho.herokuapp.com/api/islamic/renungan`)
lexxy.sendMessage(from, { image: jokss, caption: '© renungan' }, { quoted: msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+'bucin':{


reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/KATA-KATA/bucin.json'))
var jomek = pickRandom(memsk)
reply(`${jomek}\n\n© random kata bucin.`)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'ppcouple':
case prefix+'couple':{


reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Couple.json'))
var jomek = pickRandom(memsk)
var cewek = await getBuffer(jomek.male)
var cowok = await getBuffer(jomek.female)
lexxy.sendMessage(from, { image: cewek, caption: '© pp cowoknya' }, { quoted: msg})
lexxy.sendMessage(from, { image: cowok, caption: '© pp ceweknya' }, { quoted: msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'dare':{
var thumbDaree = await reSize(fs.readFileSync('./media/truth.png'), 200, 200, [])
reply(mess.wait)
var daree = JSON.parse(fs.readFileSync('./media/KATA-KATA/dare.json'))
var kukus = pickRandom(daree)
let dareText = `*DARE*\n${kukus.dare}`
let buttonsDare = [
{ quickReplyButton: { displayText: `Next`, id: `${prefix}dare` } }
]
lexxy.sendMessage(from, { caption: dareText, location: { jpegThumbnail: thumbDaree }, templateButtons: buttonsDare, footer: `Klik Next Untuk Melanjutkan.`, mentions: [sender] })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'truth':{
reply(mess.wait)
var thumbTruth = await reSize(fs.readFileSync('./media/truth.png'), 200, 200, [])
var daree = JSON.parse(fs.readFileSync('./media/KATA-KATA/truth.json'))
var kukus = pickRandom(daree)
let dareText = `*TRUTH*\n${kukus}`
let buttonsDare = [
{ quickReplyButton: { displayText: `Next`, id: `${prefix}dare` } }
]
lexxy.sendMessage(from, { caption: dareText, location: { jpegThumbnail: thumbTruth }, templateButtons: buttonsDare, footer: `Klik Next Untuk Melanjutkan.`, mentions: [sender] })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'alquran': {
  if (!args[0]) return reply(`Contoh penggunaan:\n${command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`)
  if (!args[1]) return reply(`Contoh penggunaan:\n${command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`)
 var surah = q.split(" ")[0]
 var ayat = q.split(" ")[1]
  var res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${surah}&ayat=${ayat}`)
  var txt = `*🇸🇦️ Arab* : ${res.result.data.text.arab}
*🇬🇧 English* : ${res.result.data.translation.en}
*🇮🇩 Indonesia* : ${res.result.data.translation.id}
( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah}`
  reply(txt)
  lexxy.sendMessage(from, {audio: { url: res.result.data.audio.primary }, mimetype: 'audio/mpeg', ptt: true}, { quoted : msg })
  }
  break
case prefix+'tafsirsurah': {
  if (!args[0]) return reply(`Contoh penggunaan:\n${command} 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`)
  if (!args[1]) return reply(`Contoh penggunaan:\n${command} 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`)
  var surah = q.split(" ")[0]
 var ayat = q.split(" ")[1]
  var res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${surah}&ayat=${ayat}`)
  var txt = `*👳‍♂️ Tafsir Surah*
*Pendek* : ${res.result.data.tafsir.id.short}
*Panjang* : ${res.result.data.tafsir.id.long}
( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`
  reply(txt)
  }
  break


// BY RIMURUBOTZ
case prefix+'games':{
let textGaming =`*INFO DATA USER*
 Nama : ${pushname}
 Tag : ${sender.split("@")[0]}
 Karakter : ${MyData("karakter", sender)}
 Uang : ${MyData("uang", sender)}
 Energi : ${MyData("energi",sender)}
 Medali : ${MyData("medali",sender)}
 Exp : ${MyData("exp",sender)}

*GAMES MENU*
 • ${prefix}judi
 • ${prefix}sell
 • ${prefix}claim
 • ${prefix}myexp
 • ${prefix}myuang
 • ${prefix}mymedali
 • ${prefix}myenergi
 • ${prefix}mykarakter
 • ${prefix}myuang
 • ${prefix}mymedali
 • ${prefix}buykarakter
 • ${prefix}buyenergi
 • ${prefix}theworld

*FUN ASAH-OTAK*
 • ${prefix}susunkata
 • ${prefix}caklontong
 • ${prefix}tebakkata
 • ${prefix}siapakahaku
 • ${prefix}tebaklirik
 • ${prefix}tekateki
 • ${prefix}tebakkalimat
 • ${prefix}tebakgambar
 • ${prefix}tebaktebakan
 • ${prefix}tebakgame`
 
 var media = await reSize(setting.pathimg, 300, 200)
lexxy.sendMessage(from, { caption: textGaming, location: { jpegThumbnail: media }, templateButtons: buttonsGames, footer: footer, mentions: [sender] }, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break

case prefix+'mykarakter':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("karakter", sender) == false) return textOverlay(pushname + " [ false ]", "Maaf anda belum memiliki karakter, silahkan beli karakter terlebih dahulu di #buykarakter", `No : ${sender.split("@")[0]}`);
textOverlay(pushname, `Karakter anda : ${MyData("karakter", sender)}`, `${MyData("karakter", sender)}`,"menu-img")
break
case prefix+'daftar':
if (MyData("id", sender) == sender) return textOverlay(pushname, "Anda Sudah terdaftar sebelumnya", `No : ${sender.split("@")[0]}`);
textOverlay("SUKSES TERDAFTAR", "Sukses Terdaftar, Subscribe Yt saya ya banh :3\nhttps://youtube.com/channel/UCLd-bhT8Dqq9PjGc6bWUVyg\nSilahkan Ketik #games", `No : ${sender.split("@")[0]}`);
addLogin({id: sender, uang: 1000, exp:1, level:1, karakter:false, energi:100, medali:1000, claim:1})
break
case prefix+'buykarakter':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
const liskarakter = `[ *KARAKTER SHOP* ]

~> *WINDBOT*
 > *Harga* : $500
 > *Buy?* : ${command} windbot

~> *WATER*
 > *Harga* : $12000
 > *Buy?* : ${command} waterbot
 
~> *SOILBOT*
 > *Harga* : $25500
 > *Buy?* : ${command} soilbot
 
~> *LISTRIKBOT*
 > *Harga* : $49200
 > *Buy?* : ${command} listrikbot

~> *FIREBOT*
 > *Harga* : $65000
 > *Buy?* : ${command} firebot
 
=> *Note* : Sesudah membeli *Karakter* Maka karakter sebelum nya akan tergantikan(TerHapus)`
if (!q) return sendMedia("image","./db/image/karakter.jpg",liskarakter)
if (q == "windbot") { 
if (MyData("uang", sender) <= 500) return harga(500)
dataJson("-uang", sender, 500)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
}
if (q == "waterbot") { 
if (MyData("uang", sender) <= 12000) return harga(12000)
dataJson("-uang", sender, 12000)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
if (q == "soilbot") {
if (MyData("uang", sender) <= 25500) return harga(25500) 
dataJson("-uang", sender, 25500)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
if (q == "listrikbot") { 
if (MyData("uang", sender) <= 49200) return harga(49200)
dataJson("-uang", sender, 49200)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
if (q == "firebot") { 
if (MyData("uang", sender) <= 65000) return harga(65000)
dataJson("-uang", sender, 65000)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
dataJson("+exp", sender, 133)
break
case prefix+'theworld':
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("karakter", sender) == false) return textOverlay(pushname + " [ false ]", "Maaf anda belum memiliki karakter, silahkan beli karakter terlebih dahulu di #buykarakter", `No : ${sender.split("@")[0]}`);
if (MyData("energi", sender) <= 20) return reply("Energi kamu di bahwa 20, Ayo isi energi terlebih dahulu di #buyenergi")
const buttons = [{buttonId: `${command} 1`, buttonText: {displayText: 'GO!!!!'}, type: 1}]
const buttonMessage = { image: {url: 'https://t-2.tstatic.net/tribunkaltimwiki/foto/bank/images/peta-indonesia.jpg'}, caption: "[ *THE WORLD* ]", footer: 'Ayoo selamat kan dunia, dan dapatkan hadiah:3, Semakin tinggi level karakter anda, maka semakin tinggi juga hadiah yang di dapatkan', buttons: buttons, headerType: 4}
if (!q) return lexxy.sendMessage(from, buttonMessage)
if (MyData("karakter", sender) == "windbot") { var hadiah1 = [410,482,489,417,418,472,891,620] }
if (MyData("karakter", sender) == "waterbot") { var hadiah1 = [1410,2482,3489,1417,2418,3472,1891,2620] }
if (MyData("karakter", sender) == "soilbot") { var hadiah1 = [2410,3482,4489,5417,3418,4472,5891,3620] }
if (MyData("karakter", sender) == "listrikbot") { var hadiah1 = [4410,5482,6489,7417,5418,6472,8891,7620] }
if (MyData("karakter", sender) == "firebot") { var hadiah1 = [10410,11482,12489,13417,12418,11472,13891,11620] }
const energi = [20,32,43,57,62,79,82,92][Math.floor(Math.random() * ([20,32,43,57,62,79,82,92].length))]
const uang = [1,2,3,4,5,6,7,8,9][Math.floor(Math.random() * ([1,2,3,4,5,6,7,8,9].length))]
const hadiah = hadiah1[Math.floor(Math.random() * (hadiah1.length))]
if (q == 1) {
const buttonss = [{buttonId: `${command} 1`, buttonText: {displayText: 'GO AGAIN!!!!'}, type: 1}]
const buttonMessagee = { image: {url: 'https://t-2.tstatic.net/tribunkaltimwiki/foto/bank/images/peta-indonesia.jpg'}, caption: "[ *THE WORLD* ]", footer: `*Status* : Sukses\n*Hadiah* : ${hadiah} *Medali*\n*Uang* : $${uang}\n*Energi* : ${MyData("energi", sender) - energi}\nMasih banyak musuh diluar sana, ayo serang lagi,\nNote: Kumpulkan medali sebanyak mungkin, dan jual di ${prefix}sell\nSetiap serangan membutuhkan energi`, buttons: buttonss, headerType: 4}
lexxy.sendMessage(from, buttonMessagee)
dataJson("-energi", sender, energi)
dataJson("+medali", sender, hadiah)
dataJson("+uang", sender, uang)}
break
case prefix+'buyenergi':
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
const sections = [{title: "ENERGI", rows: [
{title: "105 Energi", rowId: `${command} 1`, description: "Harga $100 "},
{title: "225 Energi", rowId: `${command} 2`, description: "Harga $200 "},
{title: "320 Energi", rowId: `${command} 3`, description: "Harga $300 "},
{title: "450 Energi", rowId: `${command} 4`, description: "Harga $400 "},
{title: "570 Energi", rowId: `${command} 5`, description: "Harga $500 "}]}]
const listMessage = { text: `> Uang kamu sekarang *$${MyData("uang",sender)}*`, footer: "Gratis ongkir seluruh indonesia", title: "[ *BELANJA SEMUA DI SHOPEE* ]", buttonText: "LIST ENERGI",sections}
if (!q) return lexxy.sendMessage(from, listMessage)
if (q == 1) { if (MyData("uang",sender) <= 99) return harga(100)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 100}\n*Energi sekarang* : ${MyData("energi", sender) + 105}\n*Ongkir* : $0`)
dataJson("-uang", sender, 100)
dataJson("+energi", sender, 105)
}
if (q == 2) { if (MyData("uang",sender) <= 199) return harga(200)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 200}\n*Energi sekarang* : ${MyData("energi", sender) + 225}\n*Ongkir* : $0`)
dataJson("-uang", sender, 200)
dataJson("+energi", sender, 225)
}
if (q == 3) { if (MyData("uang",sender) <= 299) return harga(300)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 300}\n*Energi sekarang* : ${MyData("energi", sender) + 320}\n*Ongkir* : $0`)
dataJson("-uang", sender, 300)
dataJson("+energi", sender, 320)
}
if (q == 4) { if (MyData("uang",sender) <= 399) return harga(400)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 400}\n*Energi sekarang* : ${MyData("energi", sender) + 450}\n*Ongkir* : $0`)
dataJson("-uang", sender, 400)
dataJson("+energi", sender, 450)
}
if (q == 5) { if (MyData("uang",sender) <= 499) return harga(500)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 500}\n*Energi sekarang* : ${MyData("energi", sender) + 570}\n*Ongkir* : $0`)
dataJson("-uang", sender, 500)
dataJson("+energi", sender, 570)
}
break
case prefix+'mykarakter':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("karakter", sender) == false) return textOverlay(pushname + " [ false ]", "Maaf anda belum memiliki karakter, silahkan beli karakter terlebih dahulu di #buykarakter", `No : ${sender.split("@")[0]}`);
textOverlay(pushname, `Karakter anda : ${MyData("karakter", sender)}`, `${MyData("karakter", sender)}`,"menu-img")
break
case prefix+'myuang':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Uang : $${MyData("uang",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case prefix+'myexp':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Exp : ${MyData("exp",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case prefix+'mymedali':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Medali : ${MyData("medali",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case prefix+'myenergi':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Energi : ${MyData("energi",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case prefix+'sell':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
const listMessagse1 = { text: `> Medali kamu sekarang *$${MyData("medali",sender)}*`, footer: "Note: Tidak ada diskon pada penjualan ini", title: "[ *MEDALI TO UANG* ]", buttonText: "LIST",
sections: [{title: "MEDALI", rows: [
{title: "Penawaran (1)", rowId: `${command} x1`, description: "100 Medali => $1"},
{title: "Penawaran (2)", rowId: `${command} x2`, description: "1.000 Medali => $10"},
{title: "Penawaran (3)", rowId: `${command} x3`, description: "10.000 Medali => $100"},
{title: "Penawaran (4)", rowId: `${command} x4`, description: "100.000 Medali => $1000"},]
}]}
if (!q) return lexxy.sendMessage(from, listMessagse1)
if (q == "x1"){
var x1 = 1
var x2 = 100
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}
if (q == "x2"){
var x1 = 10
var x2 = 1000
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}
if (q == "x3"){
var x1 = 100
var x2 = 10000
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}
if (q == "x4"){
var x1 = 1000
var x2 = 100000
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}


break 
case prefix+'judi':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
const listMessagse = { text: `> Uang kamu sekarang *$${MyData("uang",sender)}*`, footer: "Note: Kesempatan menang pada judi *15%*", title: "[ *JUDI-DOLAR* ]", buttonText: "LIST TARUHAN",
sections: [{title: "JUDI", rows: [
{title: "easy", rowId: `${command} x1`, description: "Taruhan $15"},
{title: "medium", rowId: `${command} x2`, description: "Taruhan $120"},
{title: "hard", rowId: `${command} x3`, description: "Taruhan $560"},
{title: ":v", rowId: `${command} x4`, description: "Taruhan $1480"}]}]
}
const judi = [false, false, true, false][Math.floor(Math.random() * ([false, false, true, false].length))]
if (!q) return lexxy.sendMessage(from, listMessagse)
if (q == "x1") { const judii = 15 
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}

if (q == "x2") { const judii = 120
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}

if (q == "x3") { const judii = 560 
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}

if (q == "x4") { const judii = 1480 
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}
break
case prefix+'claim':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (jam >= "10:00:00" && jam <= "10:10:00") {
const medaliz = [1000,2000,3000,4000,5000][Math.floor(Math.random() * ([1000,2000,3000,4000,5000].length))]
dataJson("+medali", sender, medaliz)
reply(`Sukses claim,\n*Total* : ${medaliz}\n\nNote: Medali bisa di jual menjadi uang di ${prefix}sell`)
} else { reply("Maaf fitur ini hanya bisa digunakan saat jam 10:00-10:10 WIB, Silahkan spam fitur ini pada jam tersebut dalam 10 menit dan dapatkan banyak hadiah random!:3, *Jangan sampai ketinggalan yaaa*\n\nPenawaran: Beli premium agar bisa menggunakan fitur ini tanpa batas waktu(Unlimited)")}
break
case prefix+'caklontong':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, caklontong)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/caklontong.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*CAK LONTONG*\n`+monospace(`Soal : ${kukus.soal}\nWaktu : ${gamewaktu}s`)
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Cak Lontong', jawab, gamewaktu, res, caklontong)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'susunkata':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, susunkata)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/susunkata.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*SUSUN KATA*\nSoal : ${kukus.soal}\nTipe : ${kukus.tipe}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Susun Kata', jawab, gamewaktu, res, susunkata)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'siapakahaku':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, siapakahaku)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/siapakahaku.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*SUSUN KATA*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Siapakah Aku', jawab, gamewaktu, res, siapakahaku)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebakkalimat':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebakkalimat)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebakkalimat.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK KALIMAT*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Kalimat', jawab, gamewaktu, res, tebakkalimat)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebakkata':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebakkata)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebakkata.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK KATA*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Kalimat', jawab, gamewaktu, res, tebakkata)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebaklirik':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebakkimia)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebaklirik.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK LIRIK*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Kimia', jawab, gamewaktu, res, tebakkimia)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebaktebakan':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebaktebakan)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebaktebakan.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK TEBAKAN*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Kimia', jawab, gamewaktu, res, tebaktebakan)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tekateki':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tekateki)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tekateki.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK TEBAKAN*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Teka Teki', jawab, gamewaktu, res, tekateki)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebakgambar':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebakgambar)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebakgambar.json'))
var data = pickRandom(soal)
data.jawaban = data.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK GAMBAR*\nPetunjuk : ${data.deskripsi}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, { image: { url: data.img }, caption: teks }, { quoted: msg })
.then( res => {
var jawab = data.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebakgame':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebakgame)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebakgame.json'))
var data = pickRandom(soal)
data.jawaban = data.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK GAME*\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, { image: { url: data.img }, caption: teks }, { quoted: msg })
.then( res => {
var jawab = data.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Game', jawab, gamewaktu, res, tebakgame)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
default:
if (isCmd) {
    if (args[0].length > 1) {
        var detect = await Dym(command.split(prefix)[1], listCmd)
        if (detect !== null) {
            reply(`Mungkin yang anda maksud adalah ${prefix + detect} abaikan jika salah!`)
        }
        if (!isGroup && detect === null) {
            reply(`Maaf kak fitur ${command} tidak terdaftar di list ${prefix+'menu'}`)
        }
    } else {
        var detect2 = await Dym(args[1], listCmd)
        if (!isGroup && detect2 !== null) {
            reply(`Pastikan antara simbol/prefix jangan dipisah, contoh ${prefix+args[1]}`)
        }
	}
}
}
    } catch (err) {
        console.log(color('[ ERROR ]', 'red'), err)
    }
}
