const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const lexxyLog = (text, color) => {
	return !color ? chalk.greenBright('[ CMD ] ') + chalk.magentaBright(text) : chalk.greenBright('[ CMD ] ') + chalk.keyword(color)(text)
}

module.exports = {
	color,
	bgcolor,
    lexxyLog
}
