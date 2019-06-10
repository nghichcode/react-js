from PIL import Image
import numpy as np

import matplotlib.pyplot as plt

def main(): 
	print("OK");
	try: 
		# img = Image.open("./compare-image/F_NEW/BL/BL_229_rowno_12_20190523-19-32-44.png")
		# img = img.rotate(180)
		# img.save("rotated_picture.png")
		img = Image.open("./apple.png")
		ia = np.asarray(img)

		plt.imshow(ia)
		print(ia)
		plt.show()
	except IOError as e: 
		print("Err: ",e)

if __name__ == "__main__": 
	main()