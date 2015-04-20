from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/<path>')
def pure_angular(path=None):
    return render_template('pure_angular.html')


@app.route('/react')
def angular_with_react():
    return render_template('angular_with_react.html')