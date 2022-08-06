// GA USAH DI SETTING YO NTAR ERROR

const fs = require('fs')
const chalk = require('chalk')

// Website Api
global.APIs = {
	zenz: 'https://zenzapis.xyz',
}

// Apikey Website Api
global.APIKeys = {
	'https://zenzapis.xyz': 'sonelstore',
}

global.botname = 'Neo Botz'
global.packname = '@Lexxy Official'
global.premium = []
global.rkyt = []
global.prefa = ['','!','.','🐦','🐤','🗿']

global.limitawal = {
    premium: 9999999,
    free: 25,
    monayawal: 1000
}

   global.rpg = {
   darahawal: 100,
   besiawal: 15,
   goldawal: 10,
   emeraldawal: 5,
   umpanawal: 5,
   potionawal: 1
}

global.mess = {
noPetualang: 'Itssss Kamu Belum Jadi Member Petualang, Silahkan Ketik .joinrpg <namamu>',
darahAbis: 'Darah Kamu Telah Habis',
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
