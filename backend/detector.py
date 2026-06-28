from model import predict_image as model_predict


def predict_image(image_path):
    """
    Runs the AI model on the given image.

    Args:
        image_path (str): Path of the uploaded image.

    Returns:
        dict: Prediction result and confidence score.
    """
    return model_predict(image_path)