import cv2
import pytesseract
import numpy as np
import argparse    
from PIL import Image
from os import path
from typing import TypeVar, Callable, Sequence
from functools import reduce
import itertools as it
import jiwer
from scipy.ndimage import interpolation as inter
import mediapipe as mp


def parse():
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--image", required=True,
        help="path to input receipt image")
    ap.add_argument("-d", "--debug", default=False, action='store_true',
        help="whether or not we are visualizing each step of the pipeline")
    ap.add_argument("-o", "--output", default=False, action='store_true',
        help="whether or not results are exported to a txt file")
    args = vars(ap.parse_args())

    return args['image'], args['debug'], args['output']



T = TypeVar('T')
def pipeline(value: T,
            function_pipeline: Sequence[Callable[[T], T]],) -> T:    
    return reduce(lambda v, f: f(v), function_pipeline, value)



def show(image,window="Image",stop = True):
    cv2.imshow(window, image)
    if stop: cv2.waitKey(0)
    


#Normalizes image color
def normalize(image):
    norm = np.zeros((image.shape[0], image.shape[1]))
    final = cv2.normalize(image, norm, 0, 255, cv2.NORM_MINMAX)

    if debug: show(final,'Normalized')
    return final


def remove_shadows(image):
    rgb_planes = cv2.split(image)

    result_planes = []
    result_norm_planes = []
    for plane in rgb_planes:
        dilated_img = cv2.dilate(plane, np.ones((7,7), np.uint8))
        bg_img = cv2.medianBlur(dilated_img, 21)
        diff_img = 255 - cv2.absdiff(plane, bg_img)
        norm_img = cv2.normalize(diff_img,None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8UC1)
        result_planes.append(diff_img)
        result_norm_planes.append(norm_img)

    result = cv2.merge(result_planes)
    return result


def deskew(image,delta=1, limit=5):
    def determine_score(arr, angle):
        data = inter.rotate(arr, angle, reshape=False, order=0)
        histogram = np.sum(data, axis=1)
        score = np.sum((histogram[1:] - histogram[:-1]) ** 2)
        return histogram, score

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1] 

    scores = []
    angles = np.arange(-limit, limit + delta, delta)
    for angle in angles:
        histogram, score = determine_score(thresh, angle)
        scores.append(score)

    best_angle = angles[scores.index(max(scores))]

    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, best_angle, 1.0)

    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, \
              borderMode=cv2.BORDER_REPLICATE)

    
    if debug: show(rotated,'Deskewd')
    return rotated
    



#Scales the image so it has at least 300 dpi
def scaling(image):
    color_converted = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    im = Image.fromarray(color_converted)

    length_x, width_y = im.size
    factor = min(1, float(1024.0 / length_x))
    size = int(factor * length_x), int(factor * width_y)

    resized = np.array(im.resize(size, Image.Resampling.LANCZOS))
    final = cv2.cvtColor(resized, cv2.COLOR_RGB2BGR) 
    if debug: show(final,'scaling')
    return final



#Eliminates noise of a colored image
def remove_noise_colored(image):
    final = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 15)
    if debug: show(final,'noise_colored')
    return final
    


#Eliminates noise of a grayscale image
def remove_noise(image):
    final = cv2.fastNlMeansDenoising(image, None, 3, 7, 21)
    if debug: show(final,'noise')
    return final



def binaryAdaptative(image):
    image = remove_noise(image)
    image = grayscale(image)
    final = cv2.adaptiveThreshold(image,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)
    if debug: show(final,'binaryAdpt')
    return final



def gaussianBlur(image):
    final = cv2.GaussianBlur(image,(5,5),0)
    if debug: show(final,'Gaussian')
    return final



#Turns each pixel into 0 or 1 depending on a threshold using otsus binarization
def binaryOtsuGauss(image):
    _,final = cv2.threshold(image,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    if debug: show(final,'binary')
    return final



#Turns the image to grayscale
def grayscale(image):
    final = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    if debug: show(final,'grayscale')
    return final



# Automatic brightness and contrast optimization with optional histogram clipping
def brightness_contrast(image, clip_hist_percent=1):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Calculate grayscale histogram
    hist = cv2.calcHist([gray],[0],None,[256],[0,256])
    hist_size = len(hist)
    
    # Calculate cumulative distribution from the histogram
    accumulator = []
    accumulator.append(float(hist[0]))
    for index in range(1, hist_size):
        accumulator.append(accumulator[index -1] + float(hist[index]))
    
    # Locate points to clip
    maximum = accumulator[-1]
    clip_hist_percent *= (maximum/100.0)
    clip_hist_percent /= 2.0
    
    # Locate left cut
    minimum_gray = 0
    while accumulator[minimum_gray] < clip_hist_percent:
        minimum_gray += 1
    
    # Locate right cut
    maximum_gray = hist_size -1
    while accumulator[maximum_gray] >= (maximum - clip_hist_percent):
        maximum_gray -= 1
    
    # Calculate alpha and beta values
    alpha = 255 / (maximum_gray - minimum_gray)
    beta = -minimum_gray * alpha

    final = cv2.convertScaleAbs(image, alpha=alpha, beta=beta)
    if debug: show(final,'b&c')
    return final



#Removes background of an image
def remove_bg(image):
    change_background_mp = mp.solutions.selfie_segmentation
    change_bg_segment = change_background_mp.SelfieSegmentation(1)

    rgb_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    result = change_bg_segment.process(rgb_img)

    binary_mask = result.segmentation_mask

    cv2.imshow("mask", binary_mask)
    cv2.imshow("image", image)
    cv2.waitKey()

    binary_mask_3 = np.dstack((binary_mask,binary_mask,binary_mask))

    image = np.where(binary_mask_3, image, 255)    
 
    if debug: show(image) 
    return image



def gen_name(name):
    file = f'_{name}.txt'
    i = 1
    if path.exists(f'_{name}.txt'):
        while(True):
            file = f'_{name}{i}.txt'
            if not path.exists(file): 
                break
            i += 1
    return file
    


def generate_text(name,image,out = False):
    text = pytesseract.image_to_string(image)
    if out:
        with open(gen_name(name.replace('>', '')), "w") as f:
            f.write(text)
            f.close()
    return text



def score(out,file):
    with open(file, "r") as f:
        real = f.read()
        f.close()
    cer = jiwer.cer(real, out)*100
    wer = jiwer.wer(real, out)*100
    cers = "{:.2f}".format(cer)
    wers = "{:.2f}".format(wer)
    print(f'Character error: {cers}%\nWord error: {wers}%\n')
    return cer,wer
    


if __name__ == "__main__":
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

    filename,debug,output = parse()

    orig = cv2.imread(filename)
    if debug: show(orig,'Original')
    image = orig.copy()

    #availableProcesses = [normalize,remove_noise,deskew,remove_shadows]
    availableProcesses = [remove_bg]
    #availableProcesses = [binaryAdaptative,normalize,grayscale,gaussianBlur,remove_noise,scaling,brightness_contrast]

    arr = [availableProcesses]
    for L in range(len(availableProcesses) + 1):
        for subset in it.combinations(availableProcesses, L):
            arr.append(subset)
    #arr = [[],[normalize],[normalize, binaryAdaptative],[normalize,binaryOtsuGauss]]

    results = {}
    #pl = (normalize,scaling,remove_noise_colored,brightness_contrast)
    iter = 1
    for i in arr: 
        name = ''
        fst = True
        for f in i:
            if not fst:
                name += '->'
            fst = False
            name += f.__name__ 
        if name == '':
            name = 'NoPreprocessing'
        print(f"Trying {name}\n({iter}/{len(arr)})")
        iter += 1
        #try:
        cer,wer = score(generate_text(name,pipeline(image,i),output),'truerec1.txt')
        results[name] = [cer,wer]
        #except:
            #print(f"Error in {name}\n")
            #continue


    print("Done!")
    a = sorted(results.items(), key=lambda x: x[1][0])  

    for ii in a:
        print(ii[0] + '\ncer: ' + "{:.2f}".format(ii[1][0]) + '\n' + 'wer: ' + "{:.2f}".format(ii[1][1]) + '\n\n')  



'''remove_noise
cer: 10.94
wer: 48.28

remove_noise->scaling
cer: 10.94
wer: 48.28

normalize->remove_noise
cer: 11.04
wer: 45.69

normalize->remove_noise->scaling
cer: 11.04
wer: 45.69

normalize->remove_noise->brightness_contrast
cer: 11.35
wer: 48.28

normalize->remove_noise->scaling->brightness_contrast
cer: 11.35
wer: 48.28

normalize
cer: 11.45
wer: 46.55

normalize->scaling
cer: 11.45
wer: 46.55

normalize->brightness_contrast
cer: 11.45
wer: 45.69

normalize->scaling->brightness_contrast
cer: 11.45
wer: 45.69

No Preprocessing
cer: 11.65
wer: 46.55

scaling
cer: 11.65
wer: 46.55

brightness_contrast
cer: 11.96
wer: 50.00

scaling->brightness_contrast
cer: 11.96
wer: 50.00

normalize->gaussianBlur->remove_noise->brightness_contrast
cer: 13.07
wer: 56.03'''