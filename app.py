import flask
import flask_ngrok

app = flask.Flask(__name__)
flask_ngrok.run_with_ngrok(app)

@app.route("/")
def camera():

    """html
    
    Deliver the html page for
    camera.
    """

    return flask.render_template("camera.html")

@app.route("/image", methods=["POST"])
def image():

    """image

    Return POST data.
    """

    image_file = request.files['image']

app.run()
