process.env.TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''

import { setUpAndRunBot } from './telegramBot'

setUpAndRunBot();