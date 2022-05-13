import flask

app = flask.Flask(__name__)

@app.route("/")
def camera():

    """html
    
    Deliver the html page for
    camera.
    """

    return flask.render_template("camera.html")