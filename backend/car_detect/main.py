import numpy as np
import sys
from sklearn.tree import DecisionTreeClassifier
from tensorflow.keras.preprocessing import image
import cv2 as cv
from joblib import load

image_name = sys.argv[1]

dtc = load('C:/Users/profe/OneDrive/Desktop/wall2/WALL/backend/car_detect/dtc.joblib')
image_address = 'C:/Users/profe/OneDrive/Desktop/wall2/WALL/backend/uploads/' + str(image_name)
img = image.load_img(image_address, target_size=(200,200))
img = np.array(img)
img = cv.Canny(img,200,200)
img = img.reshape(40000)
print(dtc.predict([img])[0])
sys.stdout.flush()