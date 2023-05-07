from flask import Flask, render_template
from flask_app import app 

# ... (other routes) ...

@app.route('/blackjack')
def blackjack():
    return render_template('blackjack.html')
