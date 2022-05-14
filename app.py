import flask
import flas_ngrok

app = flask.Flask(__name__)
app = flas_ngrok.run_with_ngrok(app)

@app.route("/")
def camera():

    """html
    
    Deliver the html page for
    camera.
    """

    return flask.render_template("camera.html")