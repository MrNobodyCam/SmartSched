from telebot import TeleBot, types
from config import API_TOKEN
import utils.api_client as api_client

bot = TeleBot(API_TOKEN)

# Command handlers
def start_command(message, bot):
    keyboard = types.InlineKeyboardMarkup()
    keyboard.add(
        types.InlineKeyboardButton('Yes', callback_data='start_yes'),
        types.InlineKeyboardButton('No', callback_data='start_no')
    )
    bot.send_message(message.chat.id, "Do you want to use Telegram Bot with SmartSched?", reply_markup=keyboard)


def help_command(message, bot):
    help_text = (
        "Available commands:\n"
        "/start - Welcome message\n"
        "/help - List of commands\n"
        # Add more commands here as needed
    )
    bot.send_message(message.chat.id, help_text)


@bot.callback_query_handler(func=lambda call: True)
def callback_query(call):
    if call.data == "start_yes":
        bot.send_message(call.message.chat.id, f"Your Chat ID: {call.message.chat.id}")
        msg = bot.send_message(call.message.chat.id, "Please provide your email address:")
        bot.register_next_step_handler(msg, ask_for_email)
    elif call.data == "start_no":
        bot.send_message(call.message.chat.id, "Okay, maybe next time!")
    else:
        bot.answer_callback_query(call.id, "Unknown command.")

def ask_for_email(message):
    email = message.text
    # You can add email validation here if needed
    bot.send_message(message.chat.id, f"Thank you! We have received your email: {email}")
    response = api_client.post_data('telegram/register-bot', {'email': email, 'chat_id': message.chat.id})
    bot.send_message(message.chat.id, response.get('message'))

# Message handlers
@bot.message_handler(commands=['start'])
def send_welcome(message):
    start_command(message, bot)

@bot.message_handler(commands=['help'])
def handle_help(message):
    help_command(message, bot)

@bot.message_handler(func=lambda msg: True)
def echo_all(message):
    bot.reply_to(message, message.text)
@bot.message_handler(func=lambda message: True)
def echo_all(message):
    bot.reply_to(message, message.text)

# Start polling
if __name__ == "__main__":
    try:
        print("Bot is polling...")
        bot.polling(none_stop=True)
    except Exception as e:
        print(f"Error: {e}")