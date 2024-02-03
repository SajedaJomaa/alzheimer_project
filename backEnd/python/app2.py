import sys
import tensorflow as tf
import numpy as np

from PIL import Image

sys.path.insert(1, "C:/Users/Msys/virtual_env/env2/Lib/site-packages")


# Load the saved model
model = tf.keras.models.load_model('my_tenserflow_model.h5')

# Define the class labels
class_labels = ['Mild Demented', 'Moderate Demented',
                'Non Demented', 'Very Mild Demented']

# Get the file path from command-line arguments
if len(sys.argv) < 2:
    print("Usage: python your_script.py filename")
    sys.exit(1)

file_path = sys.argv[1]

# Open and process the image file
try:
    # Open the image file
    with Image.open(file_path) as image:
        # Resize the image while maintaining its aspect ratio
        target_size = (176, 176)
        image = image.resize(target_size)
        # Convert the image to a numpy array
        image_array = np.array(image)

        # Check if the model expects three channels
        if model.input_shape[-1] == 3:
            # Duplicate the single channel to create three channels
            image_array = np.repeat(image_array[:, :, np.newaxis], 3, axis=-1)

        # Normalize the image
        image_array = image_array / 255.0
        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)

        # Perform prediction
        prediction = model.predict(image_array)
        predicted_class = np.argmax(prediction, axis=1)[0]

        result_str = f'Prediction for Alzheimer: {class_labels[predicted_class]}'

        sys.stdout.write(class_labels[predicted_class])

except FileNotFoundError:
    print(f"File not found: {file_path}")
except Exception as e:
    print(f"An error occurred: {e}")
