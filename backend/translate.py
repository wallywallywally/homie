from deep_translator import GoogleTranslator

def translate(msg, language):
    translated = GoogleTranslator(source='auto', target=language).translate(msg)
    return translated

if __name__ == "__main__":
    text = "Hello, my name is yilin"
    translated_text = translate(text, "de")
    print(translated_text)